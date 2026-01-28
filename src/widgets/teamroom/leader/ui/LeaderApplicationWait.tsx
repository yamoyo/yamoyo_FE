import TopBar from '@/shared/ui/header/TopBar';
import SectionDividerTitle from '@/shared/ui/SectionDividerTitle';
import { CharacterSlider } from '@/shared/ui/character/CharacterSlider';
import { VoteCharacter } from '../model/type';
import CharacterCard from '@/shared/ui/character/CharacterCard';
import { useEffect } from 'react';
import { useModalStore } from '@/shared/ui/modal/model/modal-store';

const DUMMY_VOTED: VoteCharacter[] = [
  { id: 1, name: '김민혁', imgId: 1 },
  { id: 2, name: '김준열', imgId: 2 },
  { id: 3, name: '박서영', imgId: 3 },
  { id: 4, name: '정종현', imgId: 4 },
  { id: 5, name: '송우진', imgId: 5 },
];

const DUMMY_UNVOTED: VoteCharacter[] = [
  { id: 6, name: '한상엽', imgId: 6 },
  { id: 7, name: '김재형', imgId: 7 },
  { id: 8, name: '유지우', imgId: 8 },
  { id: 9, name: '김우인', imgId: 9 },
  { id: 10, name: '장환민', imgId: 10 },
  { id: 11, name: '김효태', imgId: 11 },
];

export default function LeaderApplicationWait() {
  const { openCharacterModal, closeModal } = useModalStore();

  useEffect(() => {
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
    // openCharacterModal({
    //   title: '용기있는 지원자가 2명 이상입니다.',
    //   subTitle: '야모요의 힘을 빌려 팀장을 선정합니다.',
    //   type: 'PINK_CHARACTER',
    // });
    // 이후 5초 뒤에 모달 닫기
    // const timer = setTimeout(() => {
    //   closeModal();
    // }, 5000);
    // return () => clearTimeout(timer);
  }, [openCharacterModal, closeModal]);

  return (
    <>
      <TopBar title="투표 현황" backIcon="cancel" />
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
      <CharacterSlider characters={DUMMY_VOTED} />
      <div className="mt-11 gap-4 flex-col-center">
        <SectionDividerTitle title="미참여자" />
        <div className="grid grid-cols-3 gap-2">
          {DUMMY_UNVOTED.map((c) => (
            <CharacterCard characterId={c.imgId} name={c.name} key={c.id} />
          ))}
        </div>
      </div>
    </>
  );
}
