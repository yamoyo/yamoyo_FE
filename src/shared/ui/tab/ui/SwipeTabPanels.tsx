import { TabsConfig } from '../model/types';

export function SwipeTabPanels({
  tabs,
  activeIndex,
  bind,
  className,
}: {
  tabs: TabsConfig[];
  activeIndex: number;
  bind: React.HTMLAttributes<HTMLElement>;
  className?: string;
}) {
  return (
    <div
      {...bind}
      className={['relative flex-1 overflow-hidden', className].join(' ')}
    >
      <div
        className="flex h-full select-none transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {tabs.map((tab) => (
          <div key={tab.id} className="w-full flex-shrink-0">
            {tab.render()}
          </div>
        ))}
      </div>
    </div>
  );
}
