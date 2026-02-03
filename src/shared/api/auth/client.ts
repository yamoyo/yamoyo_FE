import { YamoyoError } from '../base/http-error';
import { baseRequest } from '../base/request';
import { HttpRequestOptions } from '../base/types';
import { notifyAuthExpired } from './event-bus';
import { refreshAccessToken } from './refresh-token';
import { useAuthStore } from './store';

/** 토큰 부착 + 401 → refresh + 1회 재시도 */
async function authAwareRequest<T>(
  path: string,
  options: HttpRequestOptions,
): Promise<T> {
  const { authMode, credentials, ...rest } = options;

  let retry = false;

  const doRequest = async () => {
    const { accessToken } = useAuthStore.getState();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (authMode === 'required' && accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return baseRequest<T>(path, {
      ...rest,
      headers,
      credentials,
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
        notifyAuthExpired();
        throw e;
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
  get<T>(path: string, options?: { credentials?: RequestCredentials }) {
    return authAwareRequest<T>(path, {
      method: 'GET',
      authMode: 'none',
      ...options,
    });
  },
  post<T>(
    path: string,
    body?: unknown,
    options?: { credentials?: RequestCredentials },
  ) {
    return authAwareRequest<T>(path, {
      method: 'POST',
      body,
      authMode: 'none',
      ...options,
    });
  },
  // 필요하면 put/patch/delete도 추가
};

/** 로그인 이후, 토큰이 필요한 API용 */
export const authClient = {
  get<T>(path: string, options?: { credentials?: RequestCredentials }) {
    return authAwareRequest<T>(path, {
      method: 'GET',
      authMode: 'required',
      ...options,
    });
  },
  post<T>(
    path: string,
    body?: unknown,
    options?: { credentials?: RequestCredentials },
  ) {
    return authAwareRequest<T>(path, {
      method: 'POST',
      body,
      authMode: 'required',
      ...options,
    });
  },
  put<T>(
    path: string,
    body?: unknown,
    options?: { credentials?: RequestCredentials },
  ) {
    return authAwareRequest<T>(path, {
      method: 'PUT',
      body,
      authMode: 'required',
      ...options,
    });
  },
  patch<T>(
    path: string,
    body?: unknown,
    options?: { credentials?: RequestCredentials },
  ) {
    return authAwareRequest<T>(path, {
      method: 'PATCH',
      body,
      authMode: 'required',
      ...options,
    });
  },
  delete<T>(path: string, options?: { credentials?: RequestCredentials }) {
    return authAwareRequest<T>(path, {
      method: 'DELETE',
      authMode: 'required',
      ...options,
    });
  },
};
