/**
 * rule 관련 queryKey
 * - 팀룸(teamRoomId) 단위로 규칙이 묶이므로 teamRoomId를 항상 포함
 *
 */
export const teamRuleKeys = {
  // 모든 rule 관련 key
  all: ['teamRule'] as const,

  /** 특정 팀룸의 rule 하위 키 */
  byTeamRoom: (teamRoomId: string | number) =>
    [...teamRuleKeys.all, teamRoomId] as const,

  /** 확정된 규칙 목록 조회 */
  list: (teamRoomId: string | number) =>
    [...teamRuleKeys.byTeamRoom(teamRoomId), 'list'] as const,

  /** 투표 참여 현황 조회 */
  voteParticipation: (teamRoomId: string | number) =>
    [...teamRuleKeys.byTeamRoom(teamRoomId), 'voteParticipation'] as const,
} as const;
