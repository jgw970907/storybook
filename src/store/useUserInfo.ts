import { create } from 'zustand';
interface UserStore {
  userId: string;
  setUserId: (userId: string) => void;
}

export const useUserInfo = create<UserStore>((set) => ({
  userId: '',
  setUserId: (userId: string) => set({ userId }),
}));
