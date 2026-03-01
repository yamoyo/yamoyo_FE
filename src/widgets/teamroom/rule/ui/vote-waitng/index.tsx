import { useNavigate, useParams } from 'react-router-dom';

import { GetRuleVoteParticipationResponse } from '@/entities/rule/api/rule-dto';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

interface Props {
  ruleVoteParticipationData: GetRuleVoteParticipationResponse;
}

/** 규칙 투표 후 다른 팀원이 투표하길 대기하는 화면 */
export default function RuleVoteWaitingScreen({
  ruleVoteParticipationData,
}: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const votedUsers = ruleVoteParticipationData.voted.map((v) => ({
    ...v,
    name: v.name,
  }));
  const unVotedUsers = ruleVoteParticipationData.notVoted.map((uv) => ({
    ...uv,
    name: uv.name,
  }));

  const handleOnClose = () => navigate(`/teamroom/${id}`);

  return (
    <VoteStatus
      votedUsers={votedUsers}
      unVotedUsers={unVotedUsers}
      onClose={handleOnClose}
    />
  );
}
