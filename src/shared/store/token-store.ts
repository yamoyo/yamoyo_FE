import { create } from 'zustand';

interface TokenState {
  accessToken: string | null;
  accessTokenExpiration: number | null;
  setToken: (token: string, expiration: number | null) => void;
  clear: () => void;
}

export const useTokenStore = create<TokenState>((set) => ({
  accessToken: null,
  accessTokenExpiration: null,
  setToken: (accessToken, expiration) =>
    set({ accessToken, accessTokenExpiration: expiration }),
  clear: () => set({ accessToken: null, accessTokenExpiration: null }),
}));
