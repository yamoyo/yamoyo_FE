import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  deleteTeamTool,
  getConfirmedTools,
  getToolVoteParticipation,
  getVoteCountByCategory,
  submitAllToolVotes,
} from '@/entities/setup/tool/api/tool-api';
import type {
  DeleteTeamTool,
  GetConfirmedTools,
  GetToolVoteParticipation,
  GetVoteCountByCategory,
  SubmitAllToolVotes,
  SubmitAllToolVotesRequest,
} from '@/entities/setup/tool/api/tool-dto';
import { teamToolKeys } from '@/entities/setup/tool/api/tool-keys';

/** 확정된 협업툴 조회 query */
export function useConfirmedTools(teamRoomId: string | number) {
  return useQuery<GetConfirmedTools>({
    queryKey: teamToolKeys.confirmed(teamRoomId),
    queryFn: () => getConfirmedTools(teamRoomId),
    staleTime: (query) => {
      if (!query.state.data) return 0;
      return query.state.data.confirmedTools.length > 0 ? Infinity : 0;
    },
  });
}

/** 협업툴 투표 참여 현황 조회 query */
export function useToolVoteParticipation(
  teamRoomId?: string | number,
  isRefresh10Sec?: boolean,
) {
  return useQuery<GetToolVoteParticipation>({
    queryKey: teamToolKeys.voteParticipation(teamRoomId!),
    queryFn: () => getToolVoteParticipation(teamRoomId!),
    enabled: !!teamRoomId,

    // 폴링: 10초 간격 자동 refetch 설정
    refetchInterval: (query) => {
      const data = query.state.data;
      // 모두 투표했으면 폴링 중지
      const isDone = !!data && data.votedMembers >= data.totalMembers;
      if (isDone) return false;
      return isRefresh10Sec ? 10000 : false;
    },

    // 완료되면 신선도 무한대로 설정
    staleTime: (query) => {
      const data = query.state.data;
      const isDone = !!data && data.votedMembers >= data.totalMembers;
      return isDone ? Infinity : 0;
    },

    // 완료 상태면 포커스/리커넥트 refetch도 끄기
    refetchOnWindowFocus: (query) => {
      const data = query.state.data;
      return !(data && data.votedMembers >= data.totalMembers);
    },
    refetchOnReconnect: (query) => {
      const data = query.state.data;
      return !(data && data.votedMembers >= data.totalMembers);
    },

    refetchIntervalInBackground: false,
  });
}

/** 카테고리별 득표 현황 query */
export function useVoteCountByCategory(
  teamRoomId?: string | number,
  categoryId?: string | number,
) {
  return useQuery<GetVoteCountByCategory>({
    queryKey: teamToolKeys.voteCountByCategory(teamRoomId!, categoryId!),
    queryFn: () => getVoteCountByCategory(teamRoomId!, categoryId!),
    staleTime: 10000,
    enabled: !!teamRoomId && !!categoryId,

    // 10초마다 자동 refetch
    refetchInterval: 10000,
    // 백그라운드 진입 시에는 refetch하지 않음
    refetchIntervalInBackground: false,
  });
}

/** 협업툴 투표 일괄 제출 mutation */
export function useSubmitAllToolVotes(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation<SubmitAllToolVotes, unknown, SubmitAllToolVotesRequest>({
    mutationFn: (body) => submitAllToolVotes(teamRoomId, body),
    onSuccess: () => {
      // 투표 결과/참여현황/확정툴이 모두 변경될 수 있음
      qc.invalidateQueries({
        queryKey: teamToolKeys.voteParticipation(teamRoomId),
      });
      qc.invalidateQueries({ queryKey: teamToolKeys.confirmed(teamRoomId) });

      // 카테고리별 득표 현황은 categoryId를 몰라서 teamRoom 하위 전체 무효화
      qc.invalidateQueries({ queryKey: teamToolKeys.byTeamRoom(teamRoomId) });
    },
  });
}

/** 협업툴 삭제 mutation */
export function useDeleteTeamTool(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation<DeleteTeamTool, unknown, string | number>({
    mutationFn: (teamToolId) => deleteTeamTool(teamRoomId, teamToolId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teamToolKeys.byTeamRoom(teamRoomId) });
    },
  });
}
