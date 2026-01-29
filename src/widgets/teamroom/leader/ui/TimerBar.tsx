import '@/shared/styles/timer.css';
import { cn } from '@/shared/config/tailwind/cn';
import { useMemo } from 'react';

interface Props {
  startedAt: string; // 타이머 시작 시간 (서버에서 시작 시간을 줄 것이라 예상)
  totalMs?: number; // 타이머 전체 진행 시간 (기본값: 10000ms = 10초)
  hideClock?: boolean;
  containerClassName?: string;
}

export function TimerBar({
  startedAt,
  totalMs = 10000,
  hideClock = false,
  containerClassName,
}: Props) {
  /**
   * elapsedSec
   *
   * - 컴포넌트가 처음 렌더될 때, 얼마나 시간이 지났는지만 기록
   * - 이후에 모달이 뜨거나 다른 state가 바뀌어도 다시 계산되지 않도록 startedAt와 totalMs가 바뀔 때만 갱신
   */
  const elapsedSec = useMemo(() => {
    const startedAtMs = new Date(startedAt).getTime();
    const now = Date.now();

    // 아직 시작 전이면 0초로 간주
    const elapsedMs = Math.max(0, now - startedAtMs);

    // 이미 끝난 타이머라면 totalMs까지만 보여주기
    const clampedElapsedMs = Math.min(elapsedMs, totalMs);

    return clampedElapsedMs / 1000; // ms -> sec
  }, [startedAt, totalMs]);

  return (
    <div
      className={cn(
        'flex h-6 items-center overflow-x-hidden',
        containerClassName,
      )}
    >
      {/* 
        타이머 전체 바(흰색 → 에러 컬러로 변하는 부분)
        - timer-bg-animate: 배경색을 시간에 따라 변경하는 CSS 애니메이션
        */}
      <div
        className={cn(
          'relative h-[9px] w-full rounded-r-full bg-white',
          !hideClock ? 'timer-bg-animate bg-white' : 'bg-bg-card',
        )}
        style={{
          /**
           * animationDuration
           * - bar-bg-to-error 애니메이션이 진행되는 전체 시간
           * - TOTAL_MS(10000ms)를 초 단위로 변환
           */
          animationDuration: `${totalMs / 1000}s`,
          /**
           * animationDelay (음수 값)
           * - 이미 시간이 얼마나 지났는지에 맞춰 애니메이션을 중간 지점에서 시작하기 위함
           * - ex) 2초가 이미 지났다면 animationDelay: '-2s'
           *   → 처음부터 재생하지 않고, 2초가 지난 상태부터 보여줌
           */
          animationDelay: `${-elapsedSec}s`,
        }}
      >
        {/* 
          실제로 오른쪽에서 왼쪽으로 채워지는 남색 레이어
          - width가 커지면서 시간이 줄어드는 느낌을 표현
          - inset-y-0: absolute 요소가 위에서 0, 아래에서 0으로 붙어서 부모 요소의 높이를 그대로 따라감
        */}
        <div
          className="animate-fill-from-right absolute inset-y-0 right-0 bg-bg-card"
          style={{
            /** 스타일 설명은 위 요소 참고 */
            animationDuration: `${totalMs / 1000}s`,
            animationDelay: `${-elapsedSec}s`,
          }}
        >
          {!hideClock && (
            <img
              className="absolute left-0 top-1/2 -translate-x-[calc(50%-4px)] -translate-y-1/2"
              style={{
                boxShadow: '-4px 0px 8px 0px #20254080',
              }}
              src="/assets/icons/clock.svg"
              alt="Clock Icon"
              height={24}
              width={24}
            />
          )}
        </div>
      </div>
    </div>
  );
}
