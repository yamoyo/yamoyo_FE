import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  changeLeader,
  createInviteLink,
  createTeamRoom,
  deleteTeamRoom,
  getTeamRoomDetail,
  getTeamRoomInfoByInviteToken,
  getTeamRoomList,
  joinTeamRoom,
  kickMember,
  leaveTeamRoom,
} from '@/entities/teamroom/api/teamroom-api';
import type {
  CreateTeamRoomRequest,
  TeamRoomLifecycle,
} from '@/entities/teamroom/api/teamroom-dto';
import { YamoyoError } from '@/shared/api/base/http-error';

/** 팀룸 목록 조회 */
export function useTeamRoomList(lifecycle: TeamRoomLifecycle = 'ACTIVE') {
  return useQuery({
    queryKey: ['teamrooms', lifecycle],
    queryFn: () => getTeamRoomList(lifecycle),
  });
}

/** 팀룸 생성 */
export function useCreateTeamRoom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTeamRoomRequest) => createTeamRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
    },
  });
}

/** 팀룸 상세 조회 */
export function useTeamRoomDetail(teamRoomId: number) {
  return useQuery({
    queryKey: ['teamroom', teamRoomId],
    queryFn: () => getTeamRoomDetail(teamRoomId),
    enabled: !!teamRoomId,
  });
}

/** 팀룸 나가기 */
export function useLeaveTeamRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamRoomId: number) => leaveTeamRoom(teamRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      navigate('/home', { replace: true });
    },
  });
}

/** 팀룸 삭제 */
export function useDeleteTeamRoom(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamRoomId: number) => deleteTeamRoom(teamRoomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      onSuccess?.();
    },
  });
}

/** 초대 링크 생성 */
export function useCreateInviteLink() {
  return useMutation({
    mutationFn: async (teamRoomId: number) => {
      const data = await createInviteLink(teamRoomId);
      return data.token;
    },
  });
}

/** 팀룸 참여 (초대 링크로) */
export function useJoinTeamRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (token: string) => joinTeamRoom({ inviteToken: token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      navigate(`/teamroom/${data.teamRoomId}`, { replace: true });
    },
    onError: (error) => {
      if (error instanceof YamoyoError) {
        if (
          error.code === 401 &&
          error.message === '서버 응답이 JSON이 아닙니다.'
        ) {
          navigate('/');
          return;
        }
      }
      alert('팀룸 입장에 입장할 수 없습니다.');
      navigate('/', { replace: true });
    },
  });
}

/** 팀룸 정보 조회 (초대 링크로) */
export function useInviteTeamRoomInfo(token: string) {
  return useQuery({
    queryKey: ['teamroom', 'invite', token],
    queryFn: () => getTeamRoomInfoByInviteToken(token),
    enabled: !!token,
  });
}

/** 팀장 위임 */
export function useChangeLeader(teamRoomId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLeaderMemberId: number) =>
      changeLeader(teamRoomId, { newLeaderMemberId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamroom', teamRoomId] });
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      navigate(`/teamroom/${teamRoomId}`, { replace: true });
    },
  });
}

/** 팀원 방출 */
export function useKickMember(teamRoomId: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) => kickMember(teamRoomId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamroom', teamRoomId] });
      queryClient.invalidateQueries({ queryKey: ['teamrooms'] });
      navigate(`/teamroom/${teamRoomId}`, { replace: true });
    },
  });
}
