import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  createInviteLink,
  createTeamRoom,
  deleteTeamRoom,
  getTeamRoomDetail,
  getTeamRoomList,
  joinTeamRoom,
  leaveTeamRoom,
} from '@/entities/teamroom/api/teamroom-api';
import type {
  CreateTeamRoomRequest,
  TeamRoomLifecycle,
} from '@/entities/teamroom/api/teamroom-dto';

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
    mutationFn: (teamRoomId: number) => createInviteLink(teamRoomId),
    onSuccess: async (data) => {
      const inviteUrl = `${window.location.origin}/invite?token=${data.token}`;
      await navigator.clipboard.writeText(inviteUrl);
      alert('초대 링크가 복사되었습니다.');
    },
    onError: () => {
      alert('초대 링크 생성에 실패했습니다.');
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
  });
}
