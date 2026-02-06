import type { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { authClient } from '@/shared/api/auth/client';

export const leaderGameApi = {
  /** 팀장 정하기 게임 시작 */
  startLeaderGame: async (teamRoomId: string | number) =>
    authClient.post(`/leader-games/rooms/${teamRoomId}/start-volunteer`),

  /** 팀장 정하기 게임을 위한 팀룸 멤버 온라인 상태 조회  */
  getOnlineStatus: async (teamRoomId: string | number) =>
    authClient.get<Promise<TeamMember[]>>(
      `/leader-games/rooms/${teamRoomId}/members`,
    ),
};
