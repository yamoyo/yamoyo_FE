import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useToolVoteParticipation } from '@/entities/setup/tool/hooks/useTool';
import { useAuthStore } from '@/shared/api/auth/store';
import VotingTool from '@/widgets/teamroom/setup/tool/ui/vote-tool';
import ToolVoteWaiting from '@/widgets/teamroom/setup/tool/ui/vote-waiting';

type ToolPhase = 'VOTING_TOOL' | 'TOOL_VOTE_WAITING';

export function ToolSetupPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const accessToken = useAuthStore((s) => s.accessToken);
  const myUserId = accessToken
    ? jwtDecode<{ sub: string }>(accessToken).sub
    : null;

  const [phase, setPhase] = useState<ToolPhase | null>(null);

  const {
    data: participation,
    isLoading,
    isError,
  } = useToolVoteParticipation(id, true);

  useEffect(() => {
    if (!participation || !myUserId) return;

    const allVoted = participation.votedMembers >= participation.totalMembers;
    if (allVoted) {
      navigate(`/teamroom/${id}`);
      return;
    }

    const isVoted = participation.voted.some(
      (v) => v.userId === Number(myUserId),
    );

    setPhase(isVoted ? 'TOOL_VOTE_WAITING' : 'VOTING_TOOL');
  }, [accessToken, participation, myUserId, navigate, id]);

  if (phase === 'VOTING_TOOL') {
    return <VotingTool onFinish={() => setPhase('TOOL_VOTE_WAITING')} />;
  }

  if (phase === 'TOOL_VOTE_WAITING' && participation) {
    return <ToolVoteWaiting participation={participation} />;
  }

  if (isLoading) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  if (isError) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다. 다시 접속해 주세요.</p>;
  }

  return null;
}
