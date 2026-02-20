import { create } from 'zustand';

export type ToastItem = {
  id: string;
  message: string;
  isLeaving?: boolean;
};

type ToastState = {
  toasts: ToastItem[];
  max: number;
  push: (toast: Omit<ToastItem, 'isLeaving'>) => string; // push 인자 정리
  beginRemove: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const LEAVE_MS = 180; // Toast가 닫히는 애니메이션 시간 (CSS와 일치시킬 것)
const AUTO_CLOSE_MS = 4500;

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  max: 5,

  push: (toast) => {
    const item: ToastItem = { ...toast, isLeaving: false };

    set((state) => {
      const next = [item, ...state.toasts];
      return { toasts: next.slice(0, state.max) };
    });

    // 자동으로 닫히도록 타이머 설정
    window.setTimeout(() => {
      const exists = get().toasts.some((t) => t.id === toast.id);
      if (exists) get().beginRemove(toast.id);
    }, AUTO_CLOSE_MS);

    return toast.id;
  },

  beginRemove: (id) => {
    // 이미 leaving이면 중복 실행 방지
    const already = get().toasts.find((t) => t.id === id)?.isLeaving;
    if (already) return;

    // 1. leaving 표시
    set((state) => ({
      toasts: state.toasts.map((t) =>
        t.id === id ? { ...t, isLeaving: true } : t,
      ),
    }));

    // 2. 애니메이션 끝난 뒤 실제 삭제
    window.setTimeout(() => {
      get().remove(id);
    }, LEAVE_MS);
  },

  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),

  clear: () => set({ toasts: [] }),
}));
