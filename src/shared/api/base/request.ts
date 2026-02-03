import { YamoyoError } from './http-error';
import { ApiResponse, HttpMethod } from './types';

interface BaseRequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  credentials?: RequestCredentials;
}

export const BASE_URL: string = import.meta.env?.VITE_BASE_URL;

/**
 * 네트워크 요청이 성공적으로 도착했는지 확인
 * - try: fetch 요청 시도 후 Response 반환
 * - catch: 네트워크 오류 발생 시 YamoyoError 던짐
 */
async function fetchWithNetworkSafety(
  url: string,
  init: RequestInit,
): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (e) {
    console.error(e);
    throw new YamoyoError({
      message: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
      code: 0,
    });
  }
}

/**
 * API 응답을 ApiResponse<T> 형태로 변환
 *
 * 204 No Content: 성공으로 간주
 * 빈 JSON -> 성공으로 간주
 * JSON이 아닐 경우 -> 필요 시 텍스트로 처리 후 에러
 *
 */
async function parseApiResponse(
  response: Response,
): Promise<ApiResponse<unknown>> {
  const contentType = response.headers.get('content-type') ?? '';

  // 204 No Content -> body가 없으니 성공 형태로 반환 (로그아웃 등)
  if (response.status === 204) {
    return { success: true, message: '', code: 0, data: null };
  }

  // JSON이 아니면 text로 읽어 예외/성공 처리
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    // 성공 응답이면서 내용이 없거나 'ok' 텍스트라면 성공 처리
    if (response.ok && (text === '' || text.toLowerCase() === 'ok')) {
      return { success: true, message: '', code: 0, data: null };
    }

    throw new YamoyoError({
      message: '서버 응답이 JSON이 아닙니다.',
      code: response.status,
      data: { contentType, text },
    });
  }

  // JSON이어도 빈 body면 파싱 에러가 나므로 text로 안전하게 파싱
  const raw = await response.text();
  if (!raw) {
    // 200인데 body가 비어있는 케이스는 성공으로 처리
    return { success: true, message: '', code: 0, data: null };
  }

  try {
    return JSON.parse(raw) as ApiResponse<unknown>;
  } catch {
    throw new YamoyoError({
      message: '서버 JSON 파싱에 실패했습니다.',
      code: response.status,
      data: { raw },
    });
  }
}

/**
 * 공통 HTTP 요청 함수
 * - fetch 실행
 * - 응답 파싱
 * - 실패 시 YamoyoError 발생
 */
export async function baseRequest<T>(
  path: string,
  options: BaseRequestOptions,
): Promise<T> {
  const { method, body, headers = {}, credentials } = options;
  const url = `${BASE_URL}/api${path}`;

  try {
    const res = await fetchWithNetworkSafety(url, {
      method,
      headers,
      credentials,

      // body는 문자열/바이너리만 허용됨 → 객체는 JSON.stringify 처리
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
    const json = await parseApiResponse(res);

    if (!json.success) {
      // 백엔드에서 success가 false이면 에러 던지기
      throw new YamoyoError({
        message: json.message,
        code: json.code,
        data: json.data,
      });
    }

    // 성공인 경우 data만 반환
    return json.data as T;
  } catch (error) {
    console.error('baseRequest error:', error);
    throw error;
  }
}
