import { authClient } from '@/shared/api/auth/client';

import type {
  SubmitAvailabilityRequest,
  SubmitPreferredBlockRequest,
  TimeSelectResponse,
} from './timeselect-dto';

/** 타임셀렉트 조회 */
export async function getTimeSelect(
  teamRoomId: number,
): Promise<TimeSelectResponse> {
  return authClient.get<TimeSelectResponse>(
    `/team-rooms/${teamRoomId}/timepick`,
  );
}

/** 가용시간 제출 */
export async function submitAvailability(
  teamRoomId: number,
  data: SubmitAvailabilityRequest,
): Promise<void> {
  return authClient.post(
    `/team-rooms/${teamRoomId}/timepick/availability`,
    data,
  );
}

/** 선호시간대 제출 */
export async function submitPreferredBlock(
  teamRoomId: number,
  data: SubmitPreferredBlockRequest,
): Promise<void> {
  return authClient.post(
    `/team-rooms/${teamRoomId}/timepick/preferred-block`,
    data,
  );
}
