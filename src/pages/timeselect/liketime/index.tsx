import { useState } from 'react';
import TopBar from '@/shared/ui/header/TopBar';
import BottomButton from '@/shared/ui/button/BottomButton';
import TimeIcon from '@/shared/assets/icons/time.svg?react';

const TIEMS = [
  '08:00 - 12:00am',
  '12:00 - 16:00pm',
  '16:00 - 20:00pm',
  '20:00 - 24:00pm',
] as const;

export default function LikeTimePage() {
  const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

  return (
    <>
      <TopBar title="선호 시간대 설정" showBackButton={false} />
      <div className="mt-5 flex flex-col items-start gap-[30px] px-6">
        <p className="text-title-2 text-tx-default">
          본인의 선호 시간대를 설정해주세요.
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          {TIEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={`flex h-[59px] w-full items-center gap-[25px] rounded-xl border border-bd-textfiled_line px-[18px] py-[17px] text-body-2 text-tx-default transition-colors ${
                selectedIndex === item
                  ? 'bg-bg-secondary_2 text-tx-default_black'
                  : 'bg-bg-card'
              }`}
              onClick={() => setSelectedIndex(item)}
            >
              <TimeIcon
                className={
                  selectedIndex === item
                    ? 'text-tx-default_black'
                    : 'text-tx-default_4'
                }
              />
              {item}
            </button>
          ))}
        </div>
        <div className="mb-4 mt-[274px] w-full">
          <BottomButton text="선호 시간대 설정" onClick={() => {}} />
        </div>
      </div>
    </>
  );
}
