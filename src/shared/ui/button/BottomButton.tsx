import { cn } from '@/shared/config/tailwind/cn';

type Props = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

export default function BottomButton({
  onClick,
  text,
  disabled,
  isLoading = false,
  loadingText,
  type = 'button',
  className,
}: Props) {
  const isDisabled = disabled || isLoading;
  const label = isLoading ? (loadingText ?? text) : text;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        'h-[55px] rounded-xl text-body-1 transition',
        isDisabled
          ? 'bg-bt-disabled text-bg-bt-disabled'
          : 'bg-bg-primary text-tx-default',
        className,
      )}
    >
      {label}
    </button>
  );
}
