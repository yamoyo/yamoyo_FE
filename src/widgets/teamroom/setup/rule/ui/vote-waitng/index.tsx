import VoteStatus from '@/widgets/vote/ui/VoteStatus';
import { DUMMY_UNVOTED, DUMMY_VOTED } from '@/widgets/vote/model/vote-dummy';

/** 투표 후 다른 팀원이 투표하길 대기하는 화면
 *
 * - 추후에 로딩 스크린 추가 예정
 */
export default function RuleVoteWaitingScreen() {
  const handleVoteComplete = () => {
    // TODO: 투표 완료 후 처리 로직 추가
  };

  return (
    <VoteStatus
      isHiddenCancelButton
      votedUsers={DUMMY_VOTED}
      unVotedUsers={DUMMY_UNVOTED}
      isCompleted={false}
      handleVoteComplete={handleVoteComplete}
    />
  );
}
