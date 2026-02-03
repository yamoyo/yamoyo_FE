import { baseRequest } from '@/shared/api/base/request';

import { useAuthStore } from './store';
import { TokenResponse } from './types';

// 동시에 여러 401이 발생했을 때 refresh 중복 호출 방지용
let refreshPromise: Promise<boolean> | null = null;

export const requestAccessToken = async () => {
  try {
    const res: TokenResponse = await baseRequest('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.accessToken) throw new Error('No access token in response');

    useAuthStore.getState().setAccessToken(res.accessToken);
    useAuthStore.getState().setIsAuthenticated(true);

    return true;
  } catch (e) {
    console.error(e);
    useAuthStore.getState().clear();

    alert(
      '로그인 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    );
    return false;
  }
};

/**
 * /api/auth/refresh 호출해서 accessToken 재발급
 * - 쿠키에 담긴 refreshToken이 자동 전송됨 (credentials: 'include')
 * - 성공 시 전역 store에 accessToken 저장
 * - 실패 시 store 초기화 후 false 반환
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      await requestAccessToken();
      return true;
    } catch (_) {
      return false;
    }
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}
