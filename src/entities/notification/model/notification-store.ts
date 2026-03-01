import { create } from 'zustand';

interface NotificationStore {
  isReadAllNotification: boolean;
  setAllNotificationsReadState: (isReadAll: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  isReadAllNotification: true,

  setAllNotificationsReadState: (isAllRead) =>
    set({ isReadAllNotification: isAllRead }),
}));
