import { authClient } from '@/shared/api/auth/client';

import type {
  ParseEverytimeRequest,
  ParseEverytimeResponse,
} from './everytime-dto';

/** 에브리타임 시간표 파싱 */
export async function parseEverytime(
  data: ParseEverytimeRequest,
): Promise<ParseEverytimeResponse> {
  return authClient.post<ParseEverytimeResponse>('/everytime/parse', data);
}
