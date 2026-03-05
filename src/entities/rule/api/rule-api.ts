import type {
  AddOrUpdateTeamRuleRequest,
  GetRuleVoteParticipationResponse,
  GetTeamRulesResponse,
  SubmitRuleVoteRequest,
} from '@/entities/rule/api/rule-dto';
import { authClient } from '@/shared/api/auth/client';

/** 확정된 규칙 조회 */
export async function getTeamRules(teamRoomId: string | number) {
  return authClient.get<GetTeamRulesResponse>(
    `/team-rooms/${teamRoomId}/rules`,
  );
}

/** 규칙 추가 (팀장만) */
export async function addTeamRule(
  teamRoomId: string | number,
  body: AddOrUpdateTeamRuleRequest,
) {
  return authClient.post(`/team-rooms/${teamRoomId}/rules`, body);
}

/** 규칙 수정 (팀장만) */
export async function updateTeamRule(
  teamRoomId: string | number,
  teamRuleId: string | number,
  body: AddOrUpdateTeamRuleRequest,
) {
  return authClient.put(`/team-rooms/${teamRoomId}/rules/${teamRuleId}`, body);
}

/** 규칙 삭제 (팀장만) */
export async function deleteTeamRule(
  teamRoomId: string | number,
  teamRuleId: string | number,
) {
  return authClient.delete(`/team-rooms/${teamRoomId}/rules/${teamRuleId}`);
}

/** 규칙 투표 */
export async function submitRuleVote(
  teamRoomId: string | number,
  body: SubmitRuleVoteRequest,
) {
  return authClient.post(`/team-rooms/${teamRoomId}/rules/vote`, body);
}

/** 규칙 투표 참여 현황 조회 */
export async function getRuleVoteParticipation(teamRoomId: string | number) {
  return authClient.get<GetRuleVoteParticipationResponse>(
    `/team-rooms/${teamRoomId}/rules/votes/participation`,
  );
}
