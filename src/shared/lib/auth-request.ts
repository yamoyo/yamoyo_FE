'use client';

import { useTokenStore } from '@/shared/store/token-store';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

// 액세스 토큰이 내려오는 응답 헤더 키 정의
// 백엔드에서 다른 이름으로 해뒀을 수도 있음
// Todo - 백엔드가 설정한 header 보고 변경
const ACCESS_HEADER = 'authorization';

/**
 * 응답 헤더에서 액세스 토큰 추출 함수
 *
 * @param headers fetch 응답의 headers 객체, Headers는 브라우저/웹 표준 내장 타입
 */
function readAccessTokenFromHeaders(headers: Headers): string | null {
  const token = headers.get(ACCESS_HEADER);
  return token?.trim() || null;
}

/**
 * 동시에 여러 API 요청이 401을 받으면 refresh 요청이 여러 번 날아갈 수 있음
 * 이를 막기 위해 '이미 refresh 중인지'를 저장해두는 변수
 * refresh가 진행 중이면 같은 Promise를 재사용하고, 끝나면 다시 null을 할당
 */
let refreshPromise: Promise<boolean> | null = null;

/** 액세스 토큰 재발급 처리 함수 */
async function refreshAccessToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  // 리프레시 요청
  refreshPromise = (async () => {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      // Todo - api 명세서 보고 url 수정
      method: 'POST',
      credentials: 'include', // refresh 쿠키 자동 포함
    });

    // 실패 시 상태 관리 초기화
    if (!res.ok) {
      useTokenStore.getState().clear();
      return false;
    }

    const newToken = readAccessTokenFromHeaders(res.headers);
    if (!newToken) {
      // 서버가 refresh 응답에서 토큰을 헤더로 안 내려주면 실패 처리
      useTokenStore.getState().clear();
      return false;
    }

    // 신규 accessToken을 스토어에 저장
    useTokenStore.getState().setAccessToken(newToken);
    return true;
  })().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * 로그인 유저 전용 API 호출 로직
 * - accessToken이 있으면 Authorization 헤더를 붙여 요청함
 * - 401이면 refresh 후 원 요청을 1회 재시도함
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

  // 401 처리: refresh로 새 토큰을 받았을 때만 1회 재시도
  if (res.status === 401 && !retry) {
    retry = true;

    // accessToken 재발급
    const newToken = await refreshAccessToken();
    if (!newToken) {
      throw new Error('Unauthorized (refresh failed)');
    }

    // 재시도
    res = await doFetch();
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return (await res.json()) as T;
}
