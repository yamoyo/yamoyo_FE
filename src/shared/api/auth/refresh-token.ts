import { logout } from '@/entities/user/api/user-api';
import {
  notifyAuthExpired,
  resetAuthExpired,
} from '@/shared/api/auth/event-bus';
import { YamoyoError } from '@/shared/api/base/http-error';
import { baseRequest } from '@/shared/api/base/request';

import { useAuthStore } from './store';
import { TokenResponse } from './types';

// 동시에 여러 401이 발생했을 때 refresh 중복 호출 방지용
let refreshPromise: Promise<boolean> | null = null;
let refreshFailCount = 0;
const MAX_REFRESH_FAILS = 2;

export const requestAccessToken = async (): Promise<boolean> => {
  try {
    const res: TokenResponse = await baseRequest('/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.accessToken) throw new Error('No access token in response');

    useAuthStore.getState().setAccessToken(res.accessToken);
    useAuthStore.getState().setIsAuthenticated(true);

    resetAuthExpired();
    return true;
  } catch (e) {
    const isInvalidRefresh =
      e instanceof YamoyoError &&
      (e.code === 401 || e.code === 403) &&
      typeof e.message === 'string' &&
      e.message.includes('Refresh Token');

    if (isInvalidRefresh) {
      try {
        await logout();
      } catch (logoutErr) {
        console.warn('logout failed', logoutErr);
      } finally {
        useAuthStore.getState().clear();
        notifyAuthExpired();
      }
      return false;
    }

    // 나머지 에러(네트워크 오류/서버 오류 등)도 boolean 반환
    console.error(e);
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
  if (refreshFailCount >= MAX_REFRESH_FAILS) {
    useAuthStore.getState().clear();
    return false;
  }

  if (!refreshPromise) {
    refreshPromise = (async () => {
      const ok = await requestAccessToken().catch(() => false);
      if (ok) refreshFailCount = 0;
      else refreshFailCount += 1;
      return ok;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  const ok = await refreshPromise;
  if (!ok) useAuthStore.getState().clear();
  return ok;
}
