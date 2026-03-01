export interface GetNotificationsResponse {
  notificationId: number;
  teamRoomId: number;
  targetId: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
