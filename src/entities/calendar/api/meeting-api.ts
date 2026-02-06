import { authClient } from '@/shared/api/auth/client';

import type {
  CreateMeetingRequest,
  CreateMeetingResponse,
  MeetingDetailResponse,
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

/** 회의 상세 조회 */
export async function getMeeting(
  meetingId: number,
): Promise<MeetingDetailResponse> {
  return authClient.get<MeetingDetailResponse>(`/meetings/${meetingId}`);
}
