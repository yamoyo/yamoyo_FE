import { GetNotificationsResponse } from '@/entities/notification/api/notification-dto';
import { authClient } from '@/shared/api/auth/client';

export async function getNotifications() {
  return authClient.get<GetNotificationsResponse[]>(`/notifications`);
}

export async function readNotification(notificationId: string | number) {
  return authClient.patch(`/notifications/${notificationId}/read`);
}

export async function readAllNotifications() {
  return authClient.patch('/notifications/read-all');
}
