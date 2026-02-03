import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import {
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
