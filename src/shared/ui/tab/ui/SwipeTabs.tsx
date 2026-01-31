import { cn } from '@/shared/config/tailwind/cn';
import { TabsConfig } from '../model/types';
import { useSwipeTabs } from '../model/useSwipeTabs';
import { SwipeTabPanels } from './SwipeTabPanels';

interface Props {
  tabs: TabsConfig[];
  initialTabId?: string;
  Header: (props: {
    tabs: TabsConfig[];
    activeId: string;
    onChange: (id: string) => void;
  }) => React.ReactNode;
  className?: string;
}

/** 스와이프 가능한 탭 컴포넌트
 *
 * @example
 * ```tsx
 * import {
 *   SwipeTabs,
 *   FullWidthUnderlineTabHeader,
 *   LabelUnderlineTabHeader,
 *   type TabsConfig,
 * } from '@/shared/ui/tabs';
 *
 * const tabs: TabsConfig[] = [
 *   { id: 'a', label: 'A', render: () => <div /> },
 *   { id: 'b', label: 'B', render: () => <div /> },
 * ];
 *
 * export default function Example() {
 *   return (
 *     <>
 *       <SwipeTabs tabs={tabs} Header={(p) => <FullWidthUnderlineTabHeader {...p} />} />
 *       <SwipeTabs tabs={tabs} Header={(p) => <LabelUnderlineTabHeader {...p} />} />
 *     </>
 *   );
 * }
 * ```
 *
 */
export default function SwipeTabs({
  tabs,
  initialTabId,
  Header,
  className,
}: Props) {
  const { activeId, setActiveId, activeIndex, bind } = useSwipeTabs({
    tabs,
    initialTabId,
  });

  return (
    <div className={cn('flex h-full flex-grow flex-col', className)}>
      {Header({ tabs, activeId, onChange: setActiveId })}
      <SwipeTabPanels tabs={tabs} activeIndex={activeIndex} bind={bind} />
    </div>
  );
}
