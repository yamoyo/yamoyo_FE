import { useCallback, useEffect } from 'react';

import { VoteUpdatedPayload } from '@/entities/leader-game/api/ws-types';
import { TeamMember } from '@/entities/teamroom/api/teamroom-dto';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';
import VoteStatus from '@/widgets/vote/ui/VoteStatus';

interface Props {
  members: TeamMember[];
  voteUpdatedPayload: VoteUpdatedPayload;
}

export default function LeaderApplicationWait({
  members,
  voteUpdatedPayload,
}: Props) {
  const { openCharacterModal, closeModal } = useModalStore();

  const votedUsers: TeamMember[] = members.filter((m) =>
    voteUpdatedPayload.votedUserIds.includes(m.userId),
  );
  const unVotedUsers: TeamMember[] = members.filter(
    (m) => !voteUpdatedPayload.votedUserIds.includes(m.userId),
  );

  const handleVoteComplete = useCallback(() => {
    const { volunteerIds } = voteUpdatedPayload;

    if (volunteerIds.length === 0) {
      // 1. 모두 팀장 미지원
      openCharacterModal({
        title: '아무도 팀장을 선택하지 않았습니다.',
        subTitle: '모두가 신중한 것 같네요. 야모요의 힘을 빌려보세요!',
        type: 'PINK_CHARACTER',
      });
    } else if (volunteerIds.length === 1) {
      // 2. 1명 지원
      return;
    } else {
      // 3. 2명 이상 지원
      openCharacterModal({
        title: '용기있는 지원자가 2명 이상입니다.',
        subTitle: '야모요의 힘을 빌려 팀장을 선정합니다.',
        type: 'PINK_CHARACTER',
      });
    }

    // 5초 뒤에 모달 닫기
    const timer = setTimeout(() => {
      closeModal();
    }, 5000);
    return () => clearTimeout(timer);
  }, [voteUpdatedPayload, closeModal, openCharacterModal]);

  useEffect(() => {
    const { totalCount, votedCount } = voteUpdatedPayload;

    if (totalCount !== votedCount) return;
    handleVoteComplete();
  }, [handleVoteComplete, voteUpdatedPayload]);

  return <VoteStatus votedUsers={votedUsers} unVotedUsers={unVotedUsers} />;
}
