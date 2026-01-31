import type { TabsConfig } from '../../model/types';

interface Props {
  tabs: TabsConfig[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function FullWidthUnderlineTabHeader({
  tabs,
  activeId,
  onChange,
}: Props) {
  return (
    <div className="relative flex border-b-[5px] border-bd-default">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className="relative flex-1 pb-[15px] text-center text-body-4"
          >
            <span
              className={
                isActive ? 'text-textfiled-line_focus' : 'text-tx-default'
              }
            >
              {tab.label}
            </span>

            {isActive && (
              <span className="absolute bottom-[-5px] left-0 h-[5px] w-full rounded-full bg-textfiled-line_focus" />
            )}
          </button>
        );
      })}
    </div>
  );
}
