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
      // TODO: 제출 완료 후 이동할 페이지 (로딩/대기 화면 또는 팀룸 메인)
      navigate(`/teamroom/${id}`, { replace: true });
    },
  });
}
