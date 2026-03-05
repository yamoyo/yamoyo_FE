import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNotifications } from '@/entities/notification/hooks/useNotification';
import { useNotificationStore } from '@/entities/notification/model/notification-store';

export default function NotificationIcon() {
  const notificationCount = useNotificationStore(
    (s) => s.restNotificationCount,
  );

  const { data: notifications } = useNotifications(notificationCount !== null);

  useEffect(() => {
    if (notificationCount !== null || !notifications) return;

    const count = notifications.filter((n) => !n.isRead).length;
    if (count !== notificationCount) {
      useNotificationStore.setState({ restNotificationCount: count });
    }
  }, [notifications, notificationCount]);

  return (
    <Link to="/notification" draggable="false" className="relative">
      {notificationCount && (
        <span className="absolute right-[-8px] top-[-8px] inline-flex items-center justify-center rounded-full border border-bg-default bg-bg-primary p-1 text-[8px] leading-none text-white">
          {notificationCount}
        </span>
      )}
      <img
        src="/assets/icons/notification.svg"
        width={24}
        height={24}
        alt="알림"
        className="select-none"
        draggable="false"
      />
    </Link>
  );
}
