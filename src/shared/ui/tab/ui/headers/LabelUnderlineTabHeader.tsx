import { cn } from '@/shared/config/tailwind/cn';

import type { TabsConfig } from '../../model/types';

interface Props {
  tabs: TabsConfig[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function LabelUnderlineTabHeader({
  tabs,
  activeId,
  onChange,
  className,
}: Props) {
  return (
    <div className={cn('flex justify-between px-4', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative max-w-[60px] flex-1 pb-2 text-body-2 transition',
              isActive
                ? 'text-body-1 text-textfiled-line_focus'
                : 'text-body-2 text-tx-default_4',
            )}
          >
            {tab.label}
            {isActive && (
              <div className="absolute bottom-[-3px] z-10 h-[3px] w-full rounded-full bg-textfiled-line_focus" />
            )}
          </button>
        );
      })}
    </div>
  );
}
