import { create } from 'zustand';

interface NotificationStore {
  // 남은 알림 수
  restNotificationCount: number | null;
  setRestNotificationCount: (count: number) => void;
  addRestNotificationCount: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  restNotificationCount: null,
  setRestNotificationCount: (count) => set({ restNotificationCount: count }),
  addRestNotificationCount: () =>
    set((s) => ({
      restNotificationCount: (s.restNotificationCount ?? 0) + 1,
    })),
}));
