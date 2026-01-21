import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  authReady: boolean; // 토큰이 발급 되었는지 확인

  setAccessToken: (token: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setAuthReady: (ready: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  // persist: zustand 스토어를 저장소(localStorage 같은 곳)에 자동 저장 + 복원해주는 미들웨어
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      authReady: false,

      setAccessToken: (accessToken) => set({ accessToken }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setAuthReady: (ready) => set({ authReady: ready }),
      clear: () =>
        set({ accessToken: null, isAuthenticated: false, authReady: false }),
    }),
    {
      name: 'yamoyo-auth',
      storage: createJSONStorage(() => localStorage),
      // localStorage에는 isAuthenticated만 저장 (토큰은 저장 X)
      // partialize: 전체 state 중에서 어떤 필드만 저장소에 넣을지 골라내는 함수
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
