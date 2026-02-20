import { onBoardingContents } from '../../lib/onBoardingContents';
import { useOnboardingCarousel } from '../../model/useOnboardingCarousel';
import OnboardingContent from './OnboardingContent';

export default function OnboardingCarousel() {
  const {
    activeIndex,
    goTo,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  } = useOnboardingCarousel();

  return (
    <div className="relative w-full overflow-hidden">
      {/* 슬라이드들을 가로로 나열하는 트랙 영역
          - flex 로 슬라이드들을 한 줄에 배치
       */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
        // 모바일 터치 이벤트
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        // 데스크톱 마우스 드래그 이벤트
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {onBoardingContents.map((content, index) => (
          // flex-shrink-0: flex 아이템이 공간 부족으로 축소되지 않도록 방지
          // 너비를 100%로 설정하여 각 슬라이드가 트랙이 차지하는 공간을 동일하게 함
          <div key={index} className="w-full flex-shrink-0">
            <OnboardingContent
              imgSrc={`/assets/onboarding/onboarding-${index + 1}.png`}
              mainText={content.mainText}
              subText={content.subText}
              imgHeight={content.imgHeight}
            />
          </div>
        ))}
      </div>

      {/* 하단 인디케이터
          - 인디케이터란: 현재 위치를 시각적으로 알려주는 UI 요소
          - 클릭 시 해당 인덱스로 이동
       */}
      <div className="mt-[clamp(20px,5vh,48px)] flex justify-center gap-[7px]">
        {onBoardingContents.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition ${
              index === activeIndex
                ? 'w-[22px] bg-bg-primary'
                : 'w-2 bg-bd-textfiled_line'
            }`}
            aria-label={`온보딩 ${index + 1}번으로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
