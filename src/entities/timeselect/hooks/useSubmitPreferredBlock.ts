import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { submitPreferredBlock } from '@/entities/timeselect/api/timeselect-api';
import type { PreferredBlock } from '@/entities/timeselect/api/timeselect-dto';

export function useSubmitPreferredBlock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const teamRoomId = Number(id);

  return useMutation({
    mutationFn: (preferredBlock: PreferredBlock) =>
      submitPreferredBlock(teamRoomId, { preferredBlock }),
    onSuccess: () => {
      navigate(`/teamroom/${id}/timeselect/loading`, { replace: true });
    },
  });
}
