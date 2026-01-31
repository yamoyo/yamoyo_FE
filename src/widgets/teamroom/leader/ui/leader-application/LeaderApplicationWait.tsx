import { DUMMY_UNVOTED, DUMMY_VOTED } from '@/widgets/vote/model/vote-dummy';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

export default function LeaderApplicationWait({
  onNext,
}: {
  onNext: () => void;
}) {
  const { openCharacterModal, closeModal } = useModalStore();

  const handleVoteComplete = () => {
    // 투표가 완료되면 모달 열기
    // 1. 모두 팀장 미지원
    // openCharacterModal({
    //   title: '아무도 팀장을 선택하지 않았습니다.',
    //   subTitle: '모두가 신중한 것 같네요. 야모요의 힘을 빌려보세요!',
    //   type: 'PINK_CHARACTER',
    // });
    // 2. 1명만 지원
    // openCharacterModal({
    //   title: '[박서영]님! 팀장으로 선택되었습니다!',
    //   subTitle: '축하합니다. 팀 빌딩을 이어가주세요.',
    //   type: 'CROWN',
    //   characterId: 4,
    // });
    // 3. 2명 이상 지원
    openCharacterModal({
      title: '용기있는 지원자가 2명 이상입니다.',
      subTitle: '야모요의 힘을 빌려 팀장을 선정합니다.',
      type: 'PINK_CHARACTER',
    });
    // 이후 5초 뒤에 모달 닫기
    const timer = setTimeout(() => {
      closeModal();
      onNext();
    }, 5000);
    return () => clearTimeout(timer);
  };

  return (
    <VoteStatus
      votedUsers={DUMMY_VOTED}
      unVotedUsers={DUMMY_UNVOTED}
      isCompleted={true}
      handleVoteComplete={handleVoteComplete}
    />
  );
}
