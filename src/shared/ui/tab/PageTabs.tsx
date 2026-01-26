import { useMemo, useRef, useState } from 'react';

export interface TabsConfig {
  id: string;
  label: string; // 탭 제목
  render: () => React.ReactNode; // 해당 탭 콘텐츠
}

interface Props {
  tabs: TabsConfig[];
  initialTabId?: string; // 초기 선택 탭, 없으면 첫 번째 탭 선택
}

const THRESHOLD = 50; // 스와이프 인식 최소 거리

/** 페이지 전체를 차지하는 탭 컴포넌트
 *
 * - 슬라이드/탭 클릭을 통해 화면 전환
 */
export default function PageTabs({ tabs, initialTabId }: Props) {
  const [activeId, setActiveId] = useState(initialTabId ?? tabs[0]?.id);

  const activeIndex = useMemo(
    // useMemo -> tabs 또는 activeId가 변할 때만 다시 계산
    () => tabs.findIndex((t) => t.id === activeId),
    [tabs, activeId],
  );

  /** 터치 시작 X 좌표 */
  const touchStartX = useRef<number | null>(null);
  /** 터치 이동 X 좌표 변화량 */
  const touchDeltaX = useRef(0);

  /** 마우스 클릭 시작 X 좌표 */
  const mouseStartX = useRef<number | null>(null);
  /** 마우스 이동 X 좌표 변화량 */
  const mouseDeltaX = useRef(0);
  /** 마우스 드래그 중인지 여부 */
  const isMouseDragging = useRef(false);

  const handleTabChange = (id: string) => {
    setActiveId(id);
  };

  /** 인덱스를 기반으로 탭 이동
   *
   * - 예: moveToIndex(2) → 세 번째 탭으로 이동
   */
  const moveToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= tabs.length) return;
    handleTabChange(tabs[nextIndex].id);
  };

  const handleClickStart: React.MouseEventHandler<HTMLDivElement> = (e) => {
    mouseStartX.current = e.clientX;
    mouseDeltaX.current = 0;
    isMouseDragging.current = true;
  };

  const handleClickMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (mouseStartX.current == null || !isMouseDragging.current) return;
    mouseDeltaX.current = e.clientX - mouseStartX.current;
  };

  const handleClickEnd: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!isMouseDragging.current) return;

    if (Math.abs(mouseDeltaX.current) > THRESHOLD) {
      if (mouseDeltaX.current < 0) moveToIndex(activeIndex + 1);
      else moveToIndex(activeIndex - 1);
    }
    isMouseDragging.current = false;
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (Math.abs(touchDeltaX.current) > THRESHOLD) {
      if (touchDeltaX.current < 0) moveToIndex(activeIndex + 1);
      else moveToIndex(activeIndex - 1);
    }

    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div className="flex h-full flex-grow flex-col">
      {/* 탭 헤더 */}
      <div className="relative flex border-b-[5px] border-bd-default">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className="relative flex-1 py-3 text-center text-sm font-semibold"
            >
              <span className={isActive ? 'text-violet-300' : 'text-slate-300'}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-[-5px] left-0 h-[5px] w-full rounded-full bg-textfiled-line_focus" />
              )}
            </button>
          );
        })}
      </div>

      {/* ===== 콘텐츠 영역 ===== */}
      <div
        className="relative flex-1 overflow-hidden"
        onMouseDown={handleClickStart}
        onMouseMove={handleClickMove}
        onMouseUp={handleClickEnd}
        onMouseLeave={handleClickEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full select-none transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {tabs.map((tab) => (
            // flex-shrink-0: 각 탭 콘텐츠가 가로로 나란히 배치될 때 각 콘텐츠의 너비를(width 100%)를 유지하도록 하기 위해
            <div key={tab.id} className="w-full flex-shrink-0">
              {tab.render()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
