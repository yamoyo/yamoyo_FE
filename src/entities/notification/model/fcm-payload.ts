import { NotificationType } from '@/entities/notification/api/notification-dto';

export type FcmDataPayload = {
  type: NotificationType;
  teamRoomId: string;
  targetId?: string;
};

export type FcmPayload = {
  notification: {
    title: string;
    body: string;
  };
  data: FcmDataPayload;
  messageId: string;
};
