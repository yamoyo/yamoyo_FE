import { useCallback, useMemo, useRef } from 'react';

/** 가로 드래그 스크롤 훅
 *
 * - 사용 예시
 * ```tsx
 * const { bind } = useHorizontalDragScroll();
 *
 * return (
 *  <div {...bind} className="overflow-x-auto">
 *    // 콘텐츠
 *  </div>
 * );
 * ```
 */
export function useHorizontalDragScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);

  const stopDragging = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onMouseDown = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!scrollRef.current) return;
      isDragging.current = true;
      startX.current = e.clientX;
      scrollStartLeft.current = scrollRef.current.scrollLeft;
    },
    [],
  );

  const onMouseMove = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!isDragging.current || !scrollRef.current) return;
      const diff = e.clientX - startX.current;
      scrollRef.current.scrollLeft = scrollStartLeft.current - diff;
    },
    [],
  );

  const onTouchStart = useCallback<React.TouchEventHandler<HTMLDivElement>>(
    (e) => {
      if (!scrollRef.current) return;
      isDragging.current = true;
      startX.current = e.touches[0].clientX;
      scrollStartLeft.current = scrollRef.current.scrollLeft;
    },
    [],
  );

  const onTouchMove = useCallback<React.TouchEventHandler<HTMLDivElement>>(
    (e) => {
      if (!isDragging.current || !scrollRef.current) return;
      const diff = e.touches[0].clientX - startX.current;
      scrollRef.current.scrollLeft = scrollStartLeft.current - diff;
    },
    [],
  );

  // 바깥에서 스프레드로 바로 붙이기 좋게 props 형태로 반환
  const bind = useMemo(
    () => ({
      ref: scrollRef,
      onMouseDown,
      onMouseMove,
      onMouseUp: stopDragging,
      onMouseLeave: stopDragging,
      onTouchStart,
      onTouchMove,
      onTouchEnd: stopDragging,
      onTouchCancel: stopDragging,
    }),
    [onMouseDown, onMouseMove, stopDragging, onTouchStart, onTouchMove], // ref는 stable, 핸들러도 이 훅 스코프에서 안정적
  );

  return { scrollRef, bind, stopDragging };
}
