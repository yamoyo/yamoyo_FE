import { useState } from 'react';

import { cn } from '@/shared/config/tailwind/cn';

interface Props<T> {
  selected: boolean;
  onSelect: (value: T) => void;
  value: T;
  title: string;
  subTitle: string;
  imgSrcSelected: string;
  imgSrcUnselected: string;
}

export default function LeaderApplicationButton<T>({
  selected,
  onSelect,
  value,
  title,
  subTitle,
  imgSrcSelected,
  imgSrcUnselected,
}: Props<T>) {
  // hover 상태
  const [isHovered, setIsHovered] = useState(false);

  // 선택되었거나 hover 중이면 "활성 상태"로 취급
  const isActive = selected || isHovered;

  const imgSrc = isActive ? imgSrcSelected : imgSrcUnselected;

  return (
    <button
      className={cn(
        'h-[218px] w-[162px] rounded-xl bg-bg-card px-3 pt-6 transition-colors',
        isActive && 'border border-bd-card_line bg-bg-secondary_2',
      )}
      onClick={() => onSelect(value)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        className={cn(
          'body-g2-5 mb-1 text-start text-title-3 text-white transition-colors',
          isActive && 'text-tx-default_black',
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          'body-g5 mb-5 text-start text-title-3 text-tx-default_4 transition-colors',
          isActive && 'text-tx-default_black',
        )}
      >
        {subTitle}
      </p>
      <div className="flex justify-end">
        <img src={imgSrc} alt={title} className="h-[126px]" />
      </div>
    </button>
  );
}
