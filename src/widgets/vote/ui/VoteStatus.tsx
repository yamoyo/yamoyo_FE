import TopBar from '@/shared/ui/header/TopBar';
import SectionDividerTitle from '@/shared/ui/SectionDividerTitle';
import { CharacterSlider } from '@/shared/ui/character/CharacterSlider';
import { VoteCharacter } from '../model/types';
import CharacterCard from '@/shared/ui/character/CharacterCard';
import { useEffect } from 'react';

interface Props {
  votedUsers: VoteCharacter[];
  unVotedUsers: VoteCharacter[];
  isCompleted: boolean;
  handleVoteComplete: () => void;
  isHiddenBackButton?: boolean;
}

export default function VoteStatus({
  votedUsers,
  unVotedUsers,
  isCompleted,
  handleVoteComplete,
  isHiddenBackButton,
}: Props) {
  useEffect(() => {
    if (!isCompleted) return;

    handleVoteComplete();
  }, [isCompleted, handleVoteComplete]);

  return (
    <>
      <TopBar
        title="투표 현황"
        backIcon="cancel"
        showBackButton={!isHiddenBackButton}
      />
      <div className="mt-[30px] px-6">
        <p className="mb-1 text-title-2 text-white">
          우리 팀의 현재 투표 현황입니다.
        </p>
        <p className="text-body-5 text-tx-default_3">
          잠시 후 결과가 공개됩니다.
        </p>
        <div className="mb-4 mt-12 gap-4 flex-col-center">
          <SectionDividerTitle title="투표 완료" />
        </div>
      </div>
      <CharacterSlider characters={votedUsers} />
      <div className="mt-11 gap-4 flex-col-center">
        <SectionDividerTitle title="미참여자" />
        <div className="grid grid-cols-3 gap-2">
          {unVotedUsers.map((c) => (
            <CharacterCard characterId={c.imgId} name={c.name} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
}
