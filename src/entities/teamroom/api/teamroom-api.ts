import type {
  TeamRoom,
  CreateTeamRoomRequest,
  CreateTeamRoomResponse,
} from '../model/types';

/** mock 저장소 — 나중에 실제 API로 교체 */
let mockTeamRoom: TeamRoom | null = null;

/** 본인 (팀 생성자) mock 데이터 */
const mockCreator = {
  id: 1,
  name: '나',
  role: '방장', // 팀장 선출 후 선정된 인원의 role을 '팀장'으로 변경
  avatar: '/assets/character/char-1.png',
};

/** 팀룸 생성 */
export async function createTeamRoom(
  data: CreateTeamRoomRequest,
): Promise<CreateTeamRoomResponse> {
  const id = `team-${Date.now()}`;

  mockTeamRoom = {
    id,
    ...data,
    members: [mockCreator],
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
