import Character from '@/shared/assets/character/main-char.svg?react';
import { CHARACTER_COLORS } from '../model/constants';
import { cn } from '@/shared/config/tailwind/cn';

interface Props {
  index: number;
  title: string;
  description: string;
  isRead: boolean;
  onClick: () => void;
}

export default function NotificationItem({
  index,
  title,
  description,
  isRead,
  onClick,
}: Props) {
  // 캐릭터 컬러가 돌아가면서 쓰임
  const characterColor = CHARACTER_COLORS[index % CHARACTER_COLORS.length];

  return (
    <button
      className={cn(
        'flex min-h-[95px] select-none gap-3 px-6 pb-[14px] pt-3',
        !isRead && 'bg-bd-default',
      )}
      disabled={isRead}
      onClick={onClick}
    >
      <Character style={{ color: characterColor }} />
      <div className="space-y-1 text-start">
        <p className="text-body-1 text-tx-default">{title}</p>
        <p className="text-body-6 text-tx-default_4">{description}</p>
      </div>
    </button>
  );
}
