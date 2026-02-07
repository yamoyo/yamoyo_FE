import type { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { authClient } from '@/shared/api/auth/client';

/** 팀장 정하기 게임 시작 */
export async function startLeaderGame(teamRoomId: string | number) {
  return authClient.post(`/leader-games/rooms/${teamRoomId}/start-volunteer`);
}

/** 팀장 정하기 게임을 위한 팀룸 멤버 온라인 상태 조회 */
export async function getOnlineStatus(teamRoomId: string | number) {
  return authClient.get<TeamMember[]>(
    `/leader-games/rooms/${teamRoomId}/members`,
  );
}
