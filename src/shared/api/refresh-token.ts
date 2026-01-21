import { useAuthStore } from '@/shared/store/auth-store';
import { TokenResponse } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// 동시에 여러 401이 발생했을 때 refresh 중복 호출 방지용
let refreshPromise: Promise<boolean> | null = null;

/**
 * /api/auth/refresh 호출해서 accessToken 재발급
 * - 쿠키에 담긴 refreshToken이 자동 전송됨 (credentials: 'include')
 * - 성공 시 전역 store에 accessToken 저장
 * - 실패 시 store 초기화 후 false 반환
 */
export async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // refreshToken 쿠키 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // ExceptionResponse 컨벤션 미정 → 우선 토큰 초기화만
      useAuthStore.getState().clear();
      return false;
    }

    const data: TokenResponse = await res.json();

    if (!data.accessToken) {
      useAuthStore.getState().clear();
      return false;
    }

    useAuthStore.getState().setAccessToken(data.accessToken);
    useAuthStore.getState().setIsAuthenticated(true);

    return true;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}
