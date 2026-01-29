import type {
  TeamRoom,
  CreateTeamRoomRequest,
  CreateTeamRoomResponse,
} from '../model/types';
import { getMockTeamMembers } from '@/shared/constants/mock-team-members';

/** mock 저장소 — 나중에 실제 API로 교체 */
let mockTeamRoom: TeamRoom | null = null;

/** 팀룸 생성 */
export async function createTeamRoom(
  data: CreateTeamRoomRequest,
): Promise<CreateTeamRoomResponse> {
  const id = `team-${Date.now()}`;

  mockTeamRoom = {
    id,
    ...data,
    members: getMockTeamMembers(1),
  };

  return {
    teamRoomId: id,
    inviteLink: `${window.location.origin}/teamroom/${id}/main`,
  };
}

/** 팀룸 조회 */
export async function getTeamRoom(_id: string): Promise<TeamRoom | null> {
  return mockTeamRoom;
}
