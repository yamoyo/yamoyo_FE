import { authClient } from '@/shared/api/auth/client';

import type {
  ChangeLeaderRequest,
  CreateTeamRoomRequest,
  CreateTeamRoomResponse,
  InviteLinkResponse,
  JoinTeamRoomRequest,
  JoinTeamRoomResponse,
  TeamRoomDetail,
  TeamRoomLifecycle,
  TeamRoomListItem,
  UpdateTeamRoomRequest,
} from './teamroom-dto';

// ========== 팀룸 CRUD ==========

/** 팀룸 생성 */
export async function createTeamRoom(
  data: CreateTeamRoomRequest,
): Promise<CreateTeamRoomResponse> {
  return authClient.post<CreateTeamRoomResponse>('/team-rooms', data);
}

/** 팀룸 목록 조회 */
export async function getTeamRoomList(
  lifecycle: TeamRoomLifecycle = 'ACTIVE',
): Promise<TeamRoomListItem[]> {
  return authClient.get<TeamRoomListItem[]>(
    `/team-rooms?lifecycle=${lifecycle}`,
  );
}

/** 팀룸 상세 조회 */
export async function getTeamRoomDetail(
  teamRoomId: number,
): Promise<TeamRoomDetail> {
  return authClient.get<TeamRoomDetail>(`/team-rooms/${teamRoomId}`);
}

/** 팀룸 수정 */
export async function updateTeamRoom(
  teamRoomId: number,
  data: UpdateTeamRoomRequest,
): Promise<void> {
  return authClient.put<void>(`/team-rooms/${teamRoomId}`, data);
}

/** 팀룸 삭제 */
export async function deleteTeamRoom(teamRoomId: number): Promise<void> {
  return authClient.delete<void>(`/team-rooms/${teamRoomId}`);
}

// ========== 초대 및 입장 ==========

/** 초대링크 생성 */
export async function createInviteLink(
  teamRoomId: number,
): Promise<InviteLinkResponse> {
  return authClient.post<InviteLinkResponse>(
    `/team-rooms/${teamRoomId}/invite-link`,
  );
}

/** 팀룸 입장 (초대링크로) */
export async function joinTeamRoom(
  data: JoinTeamRoomRequest,
): Promise<JoinTeamRoomResponse> {
  return authClient.post<JoinTeamRoomResponse>('/team-rooms/join', data);
}

// ========== 팀원 관리 ==========

/** 팀룸 나가기 */
export async function leaveTeamRoom(teamRoomId: number): Promise<void> {
  return authClient.delete<void>(`/team-rooms/${teamRoomId}/members/me`);
}

/** 팀원 강퇴 */
export async function kickMember(
  teamRoomId: number,
  memberId: number,
): Promise<void> {
  return authClient.delete<void>(
    `/team-rooms/${teamRoomId}/members/${memberId}`,
  );
}

/** 팀장 변경 */
export async function changeLeader(
  teamRoomId: number,
  data: ChangeLeaderRequest,
): Promise<void> {
  return authClient.put<void>(`/team-rooms/${teamRoomId}/leader`, data);
}
