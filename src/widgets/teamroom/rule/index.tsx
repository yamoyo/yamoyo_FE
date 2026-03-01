import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRuleVoteParticipation } from '@/entities/rule/hooks/useRule';
import { useAuthStore } from '@/shared/api/auth/store';

import RuleVoteWaitingScreen from './ui/vote-waitng';
import RuleVotingScreen from './ui/voting-rule';

type RulePhase = 'VOTING_RULE' | 'RULE_VOTE_WAITING';

export function RuleSetupPage() {
  const { id } = useParams<{ id: string }>();
  const accessToken = useAuthStore((s) => s.accessToken);
  const myUserId = accessToken
    ? jwtDecode<{ sub: string }>(accessToken).sub
    : null;

  const [phase, setPhase] = useState<RulePhase | null>(null);

  const {
    data: participation,
    isLoading,
    isError,
  } = useRuleVoteParticipation(id, true);

  useEffect(() => {
    if (!participation || !myUserId) return;

    const isVoted = participation.voted.some(
      (v) => v.userId === Number(myUserId),
    );

    setPhase(isVoted ? 'RULE_VOTE_WAITING' : 'VOTING_RULE');
  }, [participation, myUserId]);

  if (!id) {
    return <p>팀룸 ID가 없습니다.</p>;
  }

  if (phase === 'VOTING_RULE') {
    return <RuleVotingScreen onFinish={() => setPhase('RULE_VOTE_WAITING')} />;
  }

  if (phase === 'RULE_VOTE_WAITING' && participation) {
    return <RuleVoteWaitingScreen ruleVoteParticipationData={participation} />;
  }

  if (isLoading) {
    return <p>데이터를 불러오고 있습니다.</p>;
  }

  if (isError) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다. 다시 접속해 주세요.</p>;
  }

  return null;
}
