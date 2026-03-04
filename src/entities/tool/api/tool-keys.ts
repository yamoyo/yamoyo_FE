/**
 * tool 관련 queryKey
 * - 팀룸(teamRoomId) 단위로 협업툴이 묶이므로 teamRoomId를 항상 포함
 */
export const teamToolKeys = {
  /** 모든 tool 관련 key */
  all: ['teamTool'] as const,

  /** 특정 팀룸의 tool 하위 키 */
  byTeamRoom: (teamRoomId: number) =>
    [...teamToolKeys.all, teamRoomId] as const,

  /** 확정된 협업툴 목록 조회 */
  confirmed: (teamRoomId: number) =>
    [...teamToolKeys.byTeamRoom(teamRoomId), 'confirmed'] as const,

  /** 투표 참여 현황 조회 */
  voteParticipation: (teamRoomId: number) =>
    [...teamToolKeys.byTeamRoom(teamRoomId), 'voteParticipation'] as const,

  /** 카테고리별 득표 현황 */
  voteCountByCategory: (teamRoomId: number, categoryId: number) =>
    [
      ...teamToolKeys.byTeamRoom(teamRoomId),
      'voteCountByCategory',
      categoryId,
    ] as const,

  /** 협업툴 제안 상세 조회 */
  proposalDetail: (teamRoomId: number, proposalId: number) =>
    [
      ...teamToolKeys.byTeamRoom(teamRoomId),
      'proposalDetail',
      proposalId,
    ] as const,
} as const;
