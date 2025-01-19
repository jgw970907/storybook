import { create } from 'zustand';
import { UserType } from 'types/userTypes';
interface UserStore {
  isLogin: boolean;
  isInit: boolean;
  user: UserType | null;
  setIsLogin: (state: boolean) => void;
  setIsInit: (state: boolean) => void;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  isLogin: false,
  isInit: true,
  user: null,
  setIsLogin: (state) => {
    set({ isLogin: state });
  },
  setIsInit: (state) => {
    set({ isInit: state });
  },
  setUser: (user) => set({ user }),
  logout: () => {
    set({ isLogin: false, user: null });
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('REFRESH_TOKEN');
  },
}));
