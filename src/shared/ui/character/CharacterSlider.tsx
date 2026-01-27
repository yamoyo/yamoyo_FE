import { useRef } from 'react';
import { VoteCharacter } from '@/widgets/teamroom/leader/model/type';

interface Props {
  characters: VoteCharacter[];
}

/** 캐릭터 목록을 가로로 스크롤 가능한 슬라이더 형태로 표시
 *
 * 팀장 투표 현황 화면에서 사용
 */
export function CharacterSlider({ characters }: Props) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!scrollRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDragging.current || !scrollRef.current) return;
    const diff = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStartLeft.current - diff;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full select-none">
      {/* 슬라이더 영역 */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex w-full cursor-grab gap-2 overflow-x-auto py-4 pl-[34px] pr-7 active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {characters.map((character) => (
          <div
            key={character.id}
            className="h-[102px] w-[102px] flex-shrink-0 gap-2 rounded-2xl bg-bg-secondary_2 py-4 flex-col-center"
          >
            {/* 캐릭터 이미지 영역 */}
            <img
              src={`/assets/character/char-${character.imgId}.png`}
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
