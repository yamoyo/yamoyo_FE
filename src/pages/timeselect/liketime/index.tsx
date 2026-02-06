import { useState } from 'react';

import type { PreferredBlock } from '@/entities/timeselect/api/timeselect-dto';
import { useSubmitPreferredBlock } from '@/entities/timeselect/hooks/useSubmitPreferredBlock';
import TimeIcon from '@/shared/assets/icons/time.svg?react';
import BottomButton from '@/shared/ui/button/BottomButton';
import TopBar from '@/shared/ui/header/TopBar';

const TIME_OPTIONS: { label: string; value: PreferredBlock }[] = [
  { label: '08:00 - 12:00', value: 'BLOCK_08_12' },
  { label: '12:00 - 16:00', value: 'BLOCK_12_16' },
  { label: '16:00 - 20:00', value: 'BLOCK_16_20' },
  { label: '20:00 - 24:00', value: 'BLOCK_20_24' },
];

export default function LikeTimePage() {
  const [selectedBlock, setSelectedBlock] = useState<PreferredBlock | null>(
    null,
  );
  const { mutate: submitPreferredBlock, isPending } = useSubmitPreferredBlock();

  return (
    <>
      <TopBar title="선호 시간대 설정" showBackButton={false} />
      <div className="mt-5 flex flex-col items-start gap-[30px] px-6">
        <p className="text-title-2 text-tx-default">
          본인의 선호 시간대를 설정해주세요.
        </p>
        <div className="flex w-full flex-col items-start gap-4">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`flex h-[59px] w-full items-center gap-[25px] rounded-xl border border-bd-textfiled_line px-[18px] py-[17px] text-body-2 text-tx-default transition-colors ${
                selectedBlock === option.value
                  ? 'bg-bg-secondary_2 text-tx-default_black'
                  : 'bg-bg-card'
              }`}
              onClick={() => setSelectedBlock(option.value)}
            >
              <TimeIcon
                className={
                  selectedBlock === option.value
                    ? 'text-tx-default_black'
                    : 'text-tx-default_4'
                }
              />
              {option.label}
            </button>
          ))}
        </div>
        <div className="mb-4 mt-[274px] w-full">
          <BottomButton
            text={isPending ? '제출 중...' : '선호 시간대 설정'}
            onClick={() => selectedBlock && submitPreferredBlock(selectedBlock)}
            disabled={!selectedBlock || isPending}
          />
        </div>
      </div>
    </>
  );
}
