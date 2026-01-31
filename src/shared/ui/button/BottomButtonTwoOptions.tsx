import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  leftText: string;
  rightText: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}

export default function BottomButtonTwoOptions({
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
}: Props) {
  const buttonClass = 'h-[55px] text-body-1 rounded-lg';

  return (
    <div className="grid w-full grid-cols-2 gap-3">
      <button
        className={cn(buttonClass, 'bg-bt-disabled text-tx-default_3')}
        onClick={onLeftClick}
      >
        {leftText}
      </button>
      <button
        className={cn(buttonClass, 'bg-bg-primary text-tx-default')}
        onClick={onRightClick}
      >
        {rightText}
      </button>
    </div>
  );
}
