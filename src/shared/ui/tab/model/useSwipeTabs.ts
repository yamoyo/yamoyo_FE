import { useCallback, useMemo, useRef, useState } from 'react';
import { UseSwipeTabsOptions } from './types';

export function useSwipeTabs({
  tabs,
  initialTabId,
  threshold = 50,
}: UseSwipeTabsOptions) {
  const [activeId, setActiveId] = useState(initialTabId ?? tabs[0]?.id);

  const activeIndex = useMemo(
    () => tabs.findIndex((t) => t.id === activeId),
    [tabs, activeId],
  );

  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);
  const isDragging = useRef(false);

  const moveToIndex = useCallback(
    (nextIndex: number) => {
      if (nextIndex < 0 || nextIndex >= tabs.length) return;
      setActiveId(tabs[nextIndex].id);
    },
    [tabs],
  );

  const onPointerDown: React.PointerEventHandler<HTMLElement> = (e) => {
    startX.current = e.clientX;
    deltaX.current = 0;
    isDragging.current = true;
  };

  const onPointerMove: React.PointerEventHandler<HTMLElement> = (e) => {
    if (!isDragging.current || startX.current == null) return;
    deltaX.current = e.clientX - startX.current;
  };

  const finish = useCallback(() => {
    if (!isDragging.current) return;

    if (Math.abs(deltaX.current) > threshold) {
      if (deltaX.current < 0) moveToIndex(activeIndex + 1);
      else moveToIndex(activeIndex - 1);
    }

    startX.current = null;
    deltaX.current = 0;
    isDragging.current = false;
  }, [activeIndex, moveToIndex, threshold]);

  const bind = useMemo(
    () => ({
      onPointerDown,
      onPointerMove,
      onPointerUp: finish,
      onPointerCancel: finish,
      onPointerLeave: finish,
    }),
    [finish],
  );

  return { activeId, setActiveId, activeIndex, bind };
}
