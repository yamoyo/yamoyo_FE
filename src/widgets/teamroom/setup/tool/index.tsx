import { useState } from 'react';

import VotingTool from './ui/vote-tool';
import ToolVoteWaiting from './ui/vote-waiting';

type ToolPhase = 'VOTING_TOOL' | 'TOOL_VOTE_WAITING';

export function ToolSetupPage() {
  const [phase, setPhase] = useState<ToolPhase>('VOTING_TOOL');

  if (phase === 'VOTING_TOOL') {
    return <VotingTool onFinish={() => setPhase('TOOL_VOTE_WAITING')} />;
  }

  if (phase === 'TOOL_VOTE_WAITING') {
    return <ToolVoteWaiting />;
  }
}
