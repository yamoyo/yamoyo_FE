import { useHorizontalDragScroll } from '@/shared/hooks/useHorizontalDragScroll';
import { VotedUser } from '@/widgets/vote/model/types';

interface Props {
  characters: VotedUser[];
}

/** 캐릭터 목록을 가로로 스크롤 가능한 슬라이더 형태로 표시
 *
 * 팀장 투표 현황 화면에서 사용
 */
export function CharacterSlider({ characters }: Props) {
  const { bind } = useHorizontalDragScroll<HTMLDivElement>();

  return (
    <div className="w-full select-none">
      {/* 슬라이더 영역 */}
      <div
        {...bind}
        className="no-scrollbar flex w-full cursor-grab gap-2 overflow-x-auto py-4 pl-[34px] pr-7 active:cursor-grabbing"
      >
        {characters.map((character) => (
          <div
            key={character.userId}
            className="h-[102px] w-[102px] flex-shrink-0 gap-2 rounded-2xl bg-bg-secondary_2 py-4 flex-col-center"
          >
            {/* 캐릭터 이미지 영역 */}
            <img
              src={`/assets/character/char-${character.profileImageId}.png`}
              alt={character.name}
              className="h-[46px]"
              draggable={false}
            />

            <p className="text-body-8 text-tx-default_black">
              {character.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
