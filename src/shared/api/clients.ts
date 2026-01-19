import { HttpRequestOptions } from './types';
import { useTokenStore } from '../store/token-store';
import { baseRequest } from './base';
import { YamoyoError } from '../lib/http-error';
import { refreshAccessToken } from './refresh-token';
import { useNavigate } from 'react-router-dom';

/** 토큰 부착 + 401 → refresh + 1회 재시도 */
async function authAwareRequest<T>(
  path: string,
  options: HttpRequestOptions,
): Promise<T> {
  const navigate = useNavigate();
  const { authMode, ...rest } = options;

  let retry = false;

  const doRequest = async () => {
    const { accessToken } = useTokenStore.getState();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authMode === 'required' && accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return baseRequest<T>(path, {
      ...rest,
      headers,
    });
  };

  try {
    return await doRequest();
  } catch (e) {
    if (
      e instanceof YamoyoError &&
      e.code === 401 &&
      authMode === 'required' &&
      !retry
    ) {
      retry = true;

      const ok = await refreshAccessToken();
      if (!ok) {
        useTokenStore.getState().clear();
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
        // throw new YamoyoError({
        //   message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
        //   code: 401,
        // });
      }

      return await doRequest();
    }

    throw e;
  }
}

/**
 *
 * HTTP 클라이언트 유틸리티
 *
 * - 사용 예시:
 *  ```ts
 * // GET 요청
 * const data = await authClient.get<MyDataType>('/api/my-endpoint');
 * // POST 요청
 * const newData = { name: 'example' };
 * const created = await authClient.post<MyDataType>('/api/my-endpoint', newData);
 * ```
 *
 * - method 별로 분리한 이유:
 * 1. 가독성 향상: 호출하는 쪽에서 의도가 명확해짐
 * 2. body 파라미터 처리: GET/DELETE는 body가 없고, POST/PUT/PATCH는 body가 필요하므로 타입 안전성 제공
 *
 */

/** 로그인/회원가입 등 토큰 쓰이지 않는 API용 */
export const publicClient = {
  get<T>(path: string) {
    return authAwareRequest<T>(path, {
      method: 'GET',
      authMode: 'none',
    });
  },
  post<T>(path: string, body?: unknown) {
    return authAwareRequest<T>(path, {
      method: 'POST',
      body,
      authMode: 'none',
    });
  },
  // 필요하면 put/patch/delete도 추가
};

/** 로그인 이후, 토큰이 필요한 API용 */
export const authClient = {
  get<T>(path: string) {
    return authAwareRequest<T>(path, {
      method: 'GET',
      authMode: 'required',
    });
  },
  post<T>(path: string, body?: unknown) {
    return authAwareRequest<T>(path, {
      method: 'POST',
      body,
      authMode: 'required',
    });
  },
  put<T>(path: string, body?: unknown) {
    return authAwareRequest<T>(path, {
      method: 'PUT',
      body,
      authMode: 'required',
    });
  },
  patch<T>(path: string, body?: unknown) {
    return authAwareRequest<T>(path, {
      method: 'PATCH',
      body,
      authMode: 'required',
    });
  },
  delete<T>(path: string) {
    return authAwareRequest<T>(path, {
      method: 'DELETE',
      authMode: 'required',
    });
  },
};
