import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import {
  getNotifications,
  readAllNotifications,
  readNotification,
} from '@/entities/notification/api/notification-api';
import { GetNotificationsResponse } from '@/entities/notification/api/notification-dto';
import { useNotificationStore } from '@/entities/notification/model/notification-store';

/** 알림 조회 쿼리 */
export function useNotifications(disable = false) {
  const setRestNotificationCount = useNotificationStore(
    (s) => s.setRestNotificationCount,
  );

  const query = useQuery<GetNotificationsResponse[]>({
    queryKey: ['notification'],
    queryFn: getNotifications,
    staleTime: 10000,
    enabled: !disable,
  });

  useEffect(() => {
    if (!query.data) return;

    const isAllRead = query.data.every((n) => n.isRead);
    if (!isAllRead)
      setRestNotificationCount(query.data.filter((n) => !n.isRead).length);
  }, [query.data, setRestNotificationCount]);

  return query;
}

/** 단일 알림 읽음 처리 mutation */
export function useReadNotification() {
  const qc = useQueryClient();
  const setRestNotificationCount = useNotificationStore(
    (s) => s.setRestNotificationCount,
  );

  return useMutation({
    mutationFn: (notificationId: string | number) =>
      readNotification(notificationId),
    onMutate: async (notificationId) => {
      const prev = qc.getQueryData<GetNotificationsResponse[]>([
        'notification',
      ]);

      qc.setQueryData<GetNotificationsResponse[]>(['notification'], (old) => {
        if (!old) return old;
        const newNotifications = old.map((n) =>
          n.notificationId === notificationId ? { ...n, isRead: true } : n,
        );
        const isAllRead = newNotifications.every((n) => n.isRead);
        if (!isAllRead)
          setRestNotificationCount(
            newNotifications.filter((n) => !n.isRead).length,
          );
        return newNotifications;
      });

      return { prev };
    },
  });
}

/** 모든 알림 읽음 처리 mutation */
export function useAllReadNotifications() {
  const setRestNotificationCount = useNotificationStore(
    (s) => s.setRestNotificationCount,
  );
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => readAllNotifications(),
    onMutate: async () => {
      const prev = qc.getQueryData<GetNotificationsResponse[]>([
        'notification',
      ]);

      qc.setQueryData<GetNotificationsResponse[]>(['notification'], (old) => {
        if (!old) return old;
        return old.map((n) => (n.isRead ? n : { ...n, isRead: true }));
      });

      setRestNotificationCount(0);
      return { prev };
    },
  });
}
