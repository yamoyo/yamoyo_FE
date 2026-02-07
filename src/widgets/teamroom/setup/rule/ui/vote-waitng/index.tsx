import { GetRuleVoteParticipationResponse } from '@/entities/setup/rule/api/rule-dto';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

interface Props {
  ruleVoteParticipationData: GetRuleVoteParticipationResponse;
}

/** 규칙 투표 후 다른 팀원이 투표하길 대기하는 화면 */
export default function RuleVoteWaitingScreen({
  ruleVoteParticipationData,
}: Props) {
  const votedUsers = ruleVoteParticipationData.voted.map((v) => ({
    ...v,
    name: v.userName,
  }));
  const unVotedUsers = ruleVoteParticipationData.notVoted.map((uv) => ({
    ...uv,
    name: uv.userName,
  }));

  return (
    <VoteStatus
      isHiddenCancelButton
      votedUsers={votedUsers}
      unVotedUsers={unVotedUsers}
    />
  );
}
