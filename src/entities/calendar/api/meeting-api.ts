import { authClient } from '@/shared/api/auth/client';

import type {
  CreateMeetingRequest,
  CreateMeetingResponse,
  MeetingListResponse,
} from './meeting-dto';

/** 팀룸의 회의 목록 조회 (연/월 필터) */
export async function getMeetings(
  teamRoomId: number,
  year: number,
  month: number,
): Promise<MeetingListResponse> {
  return authClient.get<MeetingListResponse>(
    `/team-rooms/${teamRoomId}/meetings?year=${year}&month=${month}`,
  );
}

/** 회의 생성 */
export async function createMeeting(
  teamRoomId: number,
  data: CreateMeetingRequest,
): Promise<CreateMeetingResponse> {
  return authClient.post<CreateMeetingResponse>(
    `/team-rooms/${teamRoomId}/meetings`,
    data,
  );
}
