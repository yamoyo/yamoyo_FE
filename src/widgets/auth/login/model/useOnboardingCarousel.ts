import { useState, useRef, useEffect } from 'react';
import { onBoardingContents } from '../lib/onBoardingContents';

const AUTO_SLIDE_MS = 4000; // 자동 슬라이드 간격

// 스와이프 인식 기준 거리(px)
// 이 값보다 많이 드래그한 경우에만 슬라이드 전환
const SWIPE_THRESHOLD = 40;

export function useOnboardingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // 터치 시작 시 X 좌표 기억 (모바일)
  const touchStartXRef = useRef<number | null>(null);
  // 마우스 드래그 시작 시 X 좌표 기억 (데스크톱)
  const mouseStartXRef = useRef<number | null>(null);

  /** 마우스 드래그 여부를 기억
   *
   * - 터치 이벤트는 start/end가 명확해서 별도 상태 불필요
   * - 마우스는 mousedown → mousemove → mouseup 흐름에서 드래그 중인지 상태가 필요하기 때문에 ref로 관리
   *
   */
  const isDraggingRef = useRef(false);

  // 자동 슬라이드 타이머 참조
  // ReturnType<typeof setInterval>: setInterval이 반환하는 타입을 자동으로 가져오는 타입
  // (브라우저 환경에 따라 NodeJS.Timeout 또는 number 타입이 될 수 있기 때문에 해당 방식을 사용)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 슬라이드 개수 (contents 길이)
  const slideCount = onBoardingContents.length;

  /** 특정 인덱스로 이동하는 함수 */
  const goTo = (index: number) => {
    setActiveIndex(() => {
      // 0보다 작아지면 마지막 슬라이드로 이동 (순환)
      if (index < 0) return slideCount - 1;
      // 범위를 넘어가면 처음 슬라이드로 이동 (순환)
      if (index >= slideCount) return 0;
      return index;
    });
  };

  /** 다음 슬라이드로 이동 */
  const goNext = () => goTo(activeIndex + 1);
  /** 이전 슬라이드로 이동 */
  const goPrev = () => goTo(activeIndex - 1);

  /** 자동 슬라이드 설정용 useEffect */
  useEffect(() => {
    // 기존 타이머가 있으면 제거
    if (timerRef.current) clearInterval(timerRef.current);

    /**
     * 일정 주가미다 다음 슬라이드로 이동
     *
     * setInterval:
     * 일정 시간(ms)마다 지정한 콜백 함수를 반복 실행하는 브라우저 타이머 함수
     * clearInterval()을 호출해야 반복이 멈춤
     *
     */
    timerRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, AUTO_SLIDE_MS);

    // 컴포넌트가 언마운트될 때 => React가 DOM에서 해당 컴포넌트를 제거될 때
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slideCount, activeIndex]);

  /** 터치 시작 (모바일)
   *
   * - 사용자가 손가락을 화면에 댔을 때 X 좌표를 기록
   * - TouchEventHandler<HTMLDivElement>: React 터치 이벤트 핸들러 타입
   *
   */
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  /** 터치 종료 (모바일)
   *
   *  - 시작 X 좌표와 끝 X 좌표 차이를 계산해서 이전/다음 슬라이드로 이동
   *
   */
  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const startX = touchStartXRef.current;
    if (startX == null) return;

    const endX = e.changedTouches[0].clientX;

    // 왼쪽으로 스와이프: endX < startX
    // 오른쪽으로 스와이프: endX > startX
    const diff = startX - endX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0)
        goNext(); // 왼쪽으로 스와이프 → 다음 슬라이드
      else goPrev(); // 오른쪽으로 스와이프 → 이전 슬라이드
    }

    // 좌표 초기화
    touchStartXRef.current = null;
  };

  /** 마우스 드래그 시작 (데스크탑)
   *
   * - 클릭 시점의 X 좌표를 기록
   * - DragEventHandler<HTMLDivElement>: React 드래그 이벤트 핸들러 타입
   *
   */
  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    isDraggingRef.current = true;
    mouseStartXRef.current = e.clientX;
  };

  /** 마우스 드래그 종료 (데스크탑)
   *
   *  - 드래그 중이었다면 시작/끝 X 좌표 차이를 계산해서 슬라이드 전환
   *
   */
  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    const startX = mouseStartXRef.current;
    if (startX == null) return;

    const endX = e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }

    // 좌표 초기화
    mouseStartXRef.current = null;
  };

  return {
    activeIndex,
    goTo,
    handleTouchStart,
    handleTouchEnd,
    handleMouseDown,
    handleMouseUp,
  };
}
