import Character from '@/shared/assets/character/main-char.svg?react';
import { cn } from '@/shared/config/tailwind/cn';

import { CHARACTER_COLORS } from '../model/constants';

interface Props {
  notificationId: number;
  title: string;
  message: string;
  isRead: boolean;
  onClick: () => void;
}

export default function NotificationItem({
  notificationId,
  title,
  message,
  isRead,
  onClick,
}: Props) {
  const characterColor =
    CHARACTER_COLORS[notificationId % CHARACTER_COLORS.length];

  return (
    <button
      className={cn(
        'flex min-h-[95px] select-none gap-3 px-6 pb-[14px] pt-3',
        !isRead && 'bg-bd-default',
      )}
      disabled={isRead}
      onClick={onClick}
    >
      <Character style={{ color: characterColor }} className="h-10 min-w-10" />
      <div className="space-y-1 text-start">
        <p className="text-body-1 text-tx-default">{title}</p>
        <p className="text-body-6 text-tx-default_4">{message}</p>
      </div>
    </button>
  );
}
