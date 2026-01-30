import { useState } from 'react';
import RuleVotingScreen from './ui/voting-rule';
import RuleVoteWaitingScreen from './ui/vote-waitng';

type RulePhase = 'VOTING_RULE' | 'RULE_VOTE_WAITING';

export function RuleSetupPage() {
  const [phase, setPhase] = useState<RulePhase>('VOTING_RULE');

  if (phase === 'VOTING_RULE') {
    return <RuleVotingScreen onFinish={() => setPhase('RULE_VOTE_WAITING')} />;
  }

  if (phase === 'RULE_VOTE_WAITING') {
    return <RuleVoteWaitingScreen />;
  }

  return <p>데이터를 불러오고 있습니다.</p>;
}
