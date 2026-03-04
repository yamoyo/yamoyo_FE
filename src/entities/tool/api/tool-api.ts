import type {
  DeleteTeamTool,
  GetConfirmedTools,
  GetProposalToolDetail,
  GetToolVoteParticipation,
  GetVoteCountByCategory,
  ProposalToolsRequest,
  SubmitAllToolVotes,
  SubmitAllToolVotesRequest,
} from '@/entities/tool/api/tool-dto';
import { authClient } from '@/shared/api/auth/client';

/** 확정된 협업툴 조회 */
export async function getConfirmedTools(teamRoomId: string | number) {
  return authClient.get<GetConfirmedTools>(`/team-rooms/${teamRoomId}/tools`);
}

/** 협업툴 투표 참여 현황 */
export async function getToolVoteParticipation(teamRoomId: string | number) {
  return authClient.get<GetToolVoteParticipation>(
    `/team-rooms/${teamRoomId}/tools/votes/participation`,
  );
}

/** 카테고리별 득표 현황 */
export async function getVoteCountByCategory(
  teamRoomId: string | number,
  categoryId: string | number,
) {
  return authClient.get<GetVoteCountByCategory>(
    `/team-rooms/${teamRoomId}/tools/votes/category/${categoryId}`,
  );
}

/** 협업툴 투표 일괄 제출 */
export async function submitAllToolVotes(
  teamRoomId: string | number,
  body: SubmitAllToolVotesRequest,
) {
  return authClient.post<SubmitAllToolVotes>(
    `/team-rooms/${teamRoomId}/tools/votes`,
    body,
  );
}

/** 협업툴 삭제 */
export async function deleteTeamTool(
  teamRoomId: string | number,
  teamToolId: string | number,
) {
  return authClient.delete<DeleteTeamTool>(
    `/team-rooms/${teamRoomId}/tools/${teamToolId}`,
  );
}

/** 협업툴 요청 */
export async function proposalTools(
  teamRoomId: string | number,
  body: ProposalToolsRequest,
) {
  return authClient.post<ProposalToolsRequest>(
    `/team-rooms/${teamRoomId}/tools/proposals`,
    body,
  );
}

/** 협업툴 제안 상세 조회 */
export async function getToolProposalDetail(
  teamRoomId: string | number,
  proposalId: string | number,
) {
  return authClient.get<GetProposalToolDetail>(
    `/team-rooms/${teamRoomId}/tools/proposals/${proposalId}`,
  );
}

/** 협업툴 승인/반려 */
export async function proposalToolDecision(
  teamRoomId: string | number,
  proposalId: string | number,
  isApproved: boolean,
) {
  return authClient.put(
    `/team-rooms/${teamRoomId}/tools/proposals/${proposalId}`,
    { isApproved },
  );
}
