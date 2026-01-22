import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  onClick: () => void;
  text: string;
  disabled?: boolean; // 비활성화 여부
  loading?: {
    isLoading?: boolean;
    text: string;
  };
  type?: 'button' | 'submit';
  className?: string; // 추가 스타일
}

export function BottomButton({
  onClick,
  text,
  disabled,
  loading,
  type = 'button',
  className,
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'h-[55px] rounded-xl text-body-1 transition',
        disabled
          ? 'bg-bt-disabled text-bg-bt-disabled'
          : 'bg-bg-primary text-tx-default',
        className,
      )}
    >
      {loading?.isLoading ? loading.text : text}
    </button>
  );
}

export default BottomButton;
