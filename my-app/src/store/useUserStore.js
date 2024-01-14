import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),
}));
