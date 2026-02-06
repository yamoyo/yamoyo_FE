import { useCallback, useMemo, useRef } from 'react';

type DragScrollBind<T extends HTMLElement> = {
  ref: React.RefObject<T | null>;
  onMouseDown: React.MouseEventHandler<T>;
  onMouseMove: React.MouseEventHandler<T>;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: React.TouchEventHandler<T>;
  onTouchMove: React.TouchEventHandler<T>;
  onTouchEnd: () => void;
  onTouchCancel: () => void;
};

/** 가로 드래그 스크롤 훅
 *
 * - 사용 예시
 * ```tsx
 * // div 태그
 * const { bind } = useHorizontalDragScroll<HTMLDivElement>();
 * // ul 태그
 * const { bind } = useHorizontalDragScroll<HTMLUListElement>();
 *
 * return (
 *  <div {...bind} className="overflow-x-auto">
 *    // 콘텐츠
 *  </div>
 * );
 * ```
 */
export function useHorizontalDragScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStartLeft = useRef(0);

  const stopDragging = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onMouseDown = useCallback<React.MouseEventHandler<T>>((e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const onMouseMove = useCallback<React.MouseEventHandler<T>>((e) => {
    if (!isDragging.current || !scrollRef.current) return;
    const diff = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStartLeft.current - diff;
  }, []);

  const onTouchStart = useCallback<React.TouchEventHandler<T>>((e) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    scrollStartLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const onTouchMove = useCallback<React.TouchEventHandler<T>>((e) => {
    if (!isDragging.current || !scrollRef.current) return;
    const diff = e.touches[0].clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStartLeft.current - diff;
  }, []);

  const bind = useMemo<DragScrollBind<T>>(
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
    [onMouseDown, onMouseMove, onTouchStart, onTouchMove, stopDragging],
  );

  return { scrollRef, bind, stopDragging };
}
