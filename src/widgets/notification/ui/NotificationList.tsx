import { NOTIFICATION_DUMMY_DATA } from '../model/constants';
import { useEffect } from 'react';
import { useState } from 'react';
import NotificationItem from './NotificationItem';
import { Notification } from '../model/types';
import { cn } from '@/shared/config/tailwind/cn';

export default function NotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const allRead = notifications.every((notification) => notification.isRead);
  // 모두읽음 버튼 비활성화 조건
  const allReadBtnDisabled = allRead || notifications.length === 0;

  useEffect(() => {
    // TODO: 알림 목록 불러오기
    setNotifications(NOTIFICATION_DUMMY_DATA);
  }, []);

  /** 알림을 읽음 처리하는 함수 */
  const readNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
  };

  /** 모든 알림을 읽음 처리하는 함수 */
  const allReadNotifications = () => {
    if (allReadBtnDisabled) return;

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  return (
    <div className="flex-grow">
      <div className="flex flex-col">
        <div className="flex w-full justify-end pb-3 pr-5 pt-1.5">
          <button
            className={cn('p-1 text-body-7 text-tx-default', {
              'opacity-50': allReadBtnDisabled,
            })}
            disabled={allReadBtnDisabled}
            onClick={allReadNotifications}
          >
            모두읽음
          </button>
        </div>

        {/* 아래부터 알림 목록 */}
        {notifications.length === 0 ? (
          <p className="mt-[58px] flex justify-center text-body-3.9 text-tx-default_4">
            새 알림이 없습니다.
          </p>
        ) : (
          notifications.map((item, index) => (
            <NotificationItem
              key={item.id}
              {...item}
              index={index}
              onClick={() => readNotification(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
