import { useEffect, useRef, useState } from 'react';

const TARGET_SECONDS = 7.777; // 목표 시간 (초)

export function useTimingGame(
  submitTimingResult: (timeDifference: number) => void,
) {
  // 목표 시간과 정지한 시간의 차이
  const [difference, setDifference] = useState<number | null>(null);

  // 지금까지 흐른 시간(초 단위)
  // 예: 0, 1.234, 3.567 등
  const [elapsed, setElapsed] = useState(0);

  // 스톱워치가 돌아가는 중인지 여부
  const [isRunning, setIsRunning] = useState(false);

  // 언제부터 시간을 재기 시작했는지를 저장하는 ref
  const startTimeRef = useRef<number | null>(null);

  /**
   * rafIdRef
   *
   * - 쉽게 설명하자면 '예약표 번호를 들고 있는 상자' 같은 역할
   * - requestAnimationFrame이 반환하는 id를 저장
   * - cancelAnimationFrame(id)를 호출하여 애니메이션이 멈추도록 예약을 취소
   */
  const rafIdRef = useRef<number | null>(null);

  /** 스톱워치(게임) 시작 */
  const start = () => {
    if (isRunning) return;
    setDifference(null);
    setIsRunning(true);
  };

  /**
   * 스톱워치(게임) 정지
   *
   * - 사용자가 타이밍에 맞춰 멈추기 버튼을 눌렀을 때 호출됨
   */
  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);

    // 목표 시간과의 차이 계산
    const difference = elapsed - TARGET_SECONDS;
    setDifference(difference);

    // 결과 제출
    const absDifference = Math.abs(difference);
    submitTimingResult(absDifference);
  };

  const onClickButton = (isTimeOut?: boolean) => {
    if (isRunning || isTimeOut) {
      stop();
      return;
    }
    start();
  };

  // 차이 텍스트 계산
  const diffText =
    difference === null
      ? ''
      : (() => {
          const abs = Math.abs(difference).toFixed(3); // 차이 절댓값으로 변환
          if (abs === '0.000') return '완벽해요! 딱 맞췄어요 🎯';

          const isLate = difference > 0;
          const dir = isLate ? '늦었어요' : '빨랐어요';
          return `아쉽다! ${abs}초 만큼 ${dir}.`;
        })();

  /**
   * 🚀 useEffect 문을 보기 전에 이해하면 좋은 개념들
   *
   * 1. requestAnimationFrame
   *  - 브라우저가 화면을 다시 그리기 직전에 특정 함수를 호출하도록 예약하는 API
   *  - 주로 애니메이션을 부드럽게 구현할 때 사용됨
   *  - 프레임 단위로 동작 -> 화면이 60fps라면 1초에 최대 60번 이 콜백이 호출될 수 있음
   *
   * 2. cancelAnimationFrame
   *  - requestAnimationFrame으로 예약된 콜백 호출을 취소하는 API
   *  - 더 이상 애니메이션이 필요 없을 때 사용됨
   *
   * 3. DOMHighResTimeStamp
   *  - requestAnimationFrame 콜백에 전달되는 타이머 값
   *  - 페이지가 열린 순간부터 흐른 시간을 밀리초 단위로 나타냄
   *  - 예: 1234.5678 (1초 234밀리초 567마이크로초)
   *
   *
   * 🚀 useEffect 문 간단 설명
   *
   *  - isRunning이 true가 되면, tick 함수를 정의하고 첫 프레임을 예약
   *  - tick 함수는 매 프레임마다 호출되며, 경과 시간을 계산하고 상태를 업데이트
   *
   */
  useEffect(() => {
    // 실행 중이 아니라면, 남아 있는 애니메이션 프레임 예약을 취소
    if (!isRunning) {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    /**
     * tick: 매 프레임마다 호출되는 콜백
     *
     * @param now: DOMHighResTimeStamp
     *
     * 함수 흐름:
     *  1. 처음 호출될 때 `startTimeRef.current`가 비어 있으면
     *     `startTimeRef.current = now` 로 설정하여 시작 시각을 기록
     *      now는 DOMHighResTimeStamp이며, 프레임이 호출된 시점의 시간을 나타냄
     *  2. `diffMs = now - startTimeRef.current` 로 경과 시간을 계산
     *  3. `diffMs / 1000` 을 통해 초 단위로 변환하여 `elapsed` 상태로 저장
     *  4. `requestAnimationFrame(tick)` 을 호출하여 다음 프레임에서도 `tick`이 호출되도록 예약
     */
    const tick = (now: number) => {
      if (startTimeRef.current == null) {
        startTimeRef.current = now; // 시작 시각을 저장
      }

      // 지금 프레임 시간(now) - 시작 시각 = 경과 시간
      const diffMs = now - startTimeRef.current;

      // ms → s 변환 (예: 1234.567ms → 1.234567s)
      setElapsed(diffMs / 1000);

      // 다음 프레임에서도 tick이 호출되도록 예약
      rafIdRef.current = requestAnimationFrame(tick);
    };

    // 첫 프레임 예약
    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [isRunning]);

  return {
    elapsed,
    isRunning,
    difference,
    diffText,
    onClickButton,
  };
}
