import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  checked: boolean;
  className?: string;
}

export function CheckBox({ checked, className }: Props) {
  return (
    <span
      className={cn(
        'h-6 w-6 rounded flex-center',
        checked ? 'bg-[#804FFF]' : 'border-[1.5px] border-[#646983]',
        className, // 바깥에서 넘어온 클래스가 맨 마지막에 머지됨
      )}
    >
      {checked && (
        <img
          src="/assets/icons/check-active.svg"
          width={24}
          height={24}
          alt="checked"
        />
      )}
    </span>
  );
}

export default CheckBox;
