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
export function useNotifications() {
  const setAllNotificationsReadState = useNotificationStore(
    (s) => s.setAllNotificationsReadState,
  );

  const query = useQuery<GetNotificationsResponse[]>({
    queryKey: ['notification'],
    queryFn: getNotifications,
    staleTime: 10000,
  });

  useEffect(() => {
    if (!query.data) return;

    const isAllRead = query.data.every((n) => n.isRead);
    setAllNotificationsReadState(isAllRead);
  }, [query.data, setAllNotificationsReadState]);

  return query;
}

/** 단일 알림 읽음 처리 mutation */
export function useReadNotification() {
  const qc = useQueryClient();
  const setAllNotificationsReadState = useNotificationStore(
    (s) => s.setAllNotificationsReadState,
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
        if (!isAllRead) setAllNotificationsReadState(isAllRead);
        return newNotifications;
      });

      return { prev };
    },
  });
}

/** 모든 알림 읽음 처리 mutation */
export function useAllReadNotifications() {
  const setAllNotificationsReadState = useNotificationStore(
    (s) => s.setAllNotificationsReadState,
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

      setAllNotificationsReadState(true);
      return { prev };
    },
  });
}
