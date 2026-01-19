import { YamoyoError } from '../lib/http-error';
import { ApiResponse } from './types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface BaseRequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
}

const BASE_URL: string = import.meta.env?.VITE_API_URL;

/**
 * 네트워크 요청이 성공적으로 도착했는지 확인
 * - try: fetch 요청 시도
 * - catch: 네트워크 오류 발생 시 YamoyoError 던짐
 */
async function fetchWithNetworkSafety(
  url: string,
  init: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (_e) {
    //   console.error(e);
    throw new YamoyoError({
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      code: 0,
    });
  }
}

/**
 * API 응답을 ApiResponse<T> 타입으로 파싱
 *
 * @param response - fetch 응답 객체
 * @returns ApiResponse<unknown> 객체
 * @throws YamoyoError - 응답이 JSON 형식이 아닐 경우 발생
 *
 *
 */
async function parseApiResponse(
  response: Response,
): Promise<ApiResponse<unknown>> {
  try {
    return (await response.json()) as ApiResponse<unknown>;
  } catch {
    throw new YamoyoError({
      message: '서버 응답 형식이 올바르지 않습니다.',
      code: response.status,
    });
  }
}

/** 🔑 실제 HTTP 요청을 담당하는 공통 함수 */
export async function baseRequest<T>(
  path: string,
  options: BaseRequestOptions,
): Promise<T> {
  const { method, body, headers = {} } = options;
  const url = `${BASE_URL}${path}`;

  const res = await fetchWithNetworkSafety(url, {
    method,
    headers,

    // body는 문자열/바이너리 타입만 허용됨
    // (타입 예: string, Blob, FormData, URLSearchParams 등)
    // 그래서 plain object를 보낼 땐 JSON.stringify를 통해 문자열로 바꿔서 보내야 함
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await parseApiResponse(res);

  // 백엔드에서 success가 false이면 에러 던지기
  if (!json.success) {
    throw new YamoyoError({
      message: json.message,
      code: json.code,
      data: json.data,
    });
  }

  // 성공인 경우 data만 꺼내서 반환
  // data가 없는 경우도 있을 수 있으므로 unknown을 T로 단언
  return json.data as T;
}
