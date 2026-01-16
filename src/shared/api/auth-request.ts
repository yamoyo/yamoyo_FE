import { useTokenStore } from '@/shared/store/token-store';

const API_BASE = import.meta.env.VITE_API_BASE;

interface TokenResponse {
  grantType: string;
  accessToken: string;
  accessTokenExpiration: number;
}

// 동시에 여러 401이 발생했을 때 refresh 중복 호출 방지용
let refreshPromise: Promise<boolean> | null = null;

/**
 * /api/auth/refresh 호출해서 accessToken 재발급
 * - 쿠키에 담긴 refreshToken이 자동 전송됨 (credentials: 'include')
 * - 성공 시 전역 store에 accessToken 저장
 * - 실패 시 store 초기화 후 false 반환
 */
async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const res = await fetch(`${API_BASE}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include', // refreshToken 쿠키 전송
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      // ExceptionResponse 컨벤션 미정 → 우선 토큰 초기화만
      useTokenStore.getState().clear();
      return false;
    }

    const data: TokenResponse = await res.json();

    if (!data.accessToken) {
      useTokenStore.getState().clear();
      return false;
    }

    const now = Date.now();
    const expirationAt = data.accessTokenExpiration
      ? now + data.accessTokenExpiration
      : null;

    useTokenStore.getState().setToken(data.accessToken, expirationAt ?? null);

    return true;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * 로그인 유저 전용 API 호출 헬퍼
 * - store에 있는 accessToken을 Authorization 헤더에 붙여 요청
 * - 401이 나오면 /api/auth/refresh 호출해서 토큰 재발급 후 1회 재시도
 */
export async function authRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  let retry = false;

  const doFetch = async () => {
    const { accessToken } = useTokenStore.getState();

    return fetch(`${API_BASE}${path}`, {
      ...init,
      credentials: 'include',
      headers: {
        ...(init.headers ?? {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  };

  // 1차 요청
  let res = await doFetch();

  // 401이면 refresh 시도 후 1회 재시도
  if (res.status === 401 && !retry) {
    retry = true;

    const ok = await refreshAccessToken();
    if (!ok) {
      // 여기서는 단순 에러 던지고, 실제 로그인 페이지 이동은 사용하는 쪽에서 처리
      throw new Error('Unauthorized (refresh failed)');
    }

    res = await doFetch();
  }

  if (!res.ok) {
    // ExceptionResponse 컨벤션 정해지면 이 부분에서 body 파싱해서 throw 구조 통일
    throw new Error(`API Error: ${res.status}`);
  }

  return (await res.json()) as T;
}

/** 로그인 시 초기 accessToken 발급 */
export async function requestInitialAccessToken(): Promise<boolean> {
  return refreshAccessToken();
}
