import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  addTeamRule,
  deleteTeamRule,
  getRuleVoteParticipation,
  getTeamRules,
  submitRuleVote,
  updateTeamRule,
} from '@/entities/setup/rule/api/rule-api';
import type {
  AddOrUpdateTeamRuleRequest,
  GetRuleVoteParticipationResponse,
  GetTeamRulesResponse,
  SubmitRuleVoteRequest,
} from '@/entities/setup/rule/api/rule-dto';
import { teamRuleKeys } from '@/entities/setup/rule/api/rule-keys';

/** 확정된 규칙 조회 query */
export function useTeamRules(teamRoomId: string | number) {
  return useQuery<GetTeamRulesResponse>({
    queryKey: teamRuleKeys.list(teamRoomId),
    queryFn: () => getTeamRules(teamRoomId),
    staleTime: (data) => {
      if (!data.state.data) return 0;
      return data.state.data.teamRules.length > 0 ? Infinity : 0;
    },
  });
}

/** 규칙 투표 참여 현황 조회 query */
export function useRuleVoteParticipation(
  teamRoomId?: string | number,
  isRefresh10Sec?: boolean,
) {
  return useQuery<GetRuleVoteParticipationResponse>({
    queryKey: teamRuleKeys.voteParticipation(teamRoomId!),
    queryFn: () => getRuleVoteParticipation(teamRoomId!),
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

/** 규칙 추가 mutation (팀장만) */
export function useAddTeamRule(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: AddOrUpdateTeamRuleRequest) =>
      addTeamRule(teamRoomId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teamRuleKeys.list(teamRoomId) });
    },
  });
}

/** 규칙 수정 mutation (팀장만) */
export function useUpdateTeamRule(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      teamRuleId: string | number;
      body: AddOrUpdateTeamRuleRequest;
    }) => updateTeamRule(teamRoomId, params.teamRuleId, params.body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teamRuleKeys.list(teamRoomId) });
    },
  });
}

/** 규칙 삭제 mutation (팀장만) */
export function useDeleteTeamRule(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (teamRuleId: string | number) =>
      deleteTeamRule(teamRoomId, teamRuleId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: teamRuleKeys.list(teamRoomId) });
    },
  });
}

/** 규칙 투표 제출 mutation */
export function useSubmitRuleVote(teamRoomId: string | number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: SubmitRuleVoteRequest) =>
      submitRuleVote(teamRoomId, body),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: teamRuleKeys.voteParticipation(teamRoomId),
      });

      qc.invalidateQueries({ queryKey: teamRuleKeys.list(teamRoomId) });
    },
  });
}
