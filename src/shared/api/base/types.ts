export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpRequestOptions {
  method: HttpMethod;
  authMode: 'none' | 'required';
  body?: unknown;
  credentials?: RequestCredentials;
}

/**
 * 공통 API 응답 타입
 *
 * 백엔드 문서의 응답 포맷:
 * {
 *   "success": true | false,
 *   "code": 200,
 *   "message": "Success",
 *   "data": { ... } // data는 없을 수 있음
 * }
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}
