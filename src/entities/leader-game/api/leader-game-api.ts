import { authClient } from '@/shared/api/auth/client';

export const leaderGameApi = {
  /** 팀장 정하기 게임 시작 */
  startLeaderGame: (teamRoomId: string | number) =>
    authClient.post(`/leader-games/rooms/${teamRoomId}/start-volunteer`),

  /** 팀장 정하기 게임을 위한 팀룸 멤버 온라인 상태 조회  */
  getLeaderGameMembers: (teamRoomId: string | number) => {
    return authClient.get(`/leader-games/rooms/${teamRoomId}/members`);
  },
};
