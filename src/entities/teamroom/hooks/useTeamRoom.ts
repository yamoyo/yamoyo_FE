import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
  createInviteLink,
  deleteTeamRoom,
  leaveTeamRoom,
} from '@/entities/teamroom/api/teamroom-api';

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
