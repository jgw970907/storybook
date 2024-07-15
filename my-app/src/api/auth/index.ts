import { StorageKeys } from 'constant';
import Axios from '../axios';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { LoginResponse, SignUpRes, SignUpReq, LoginParams, UserType } from 'types';

export const login = async (user: LoginParams) => {
  const auth = btoa(`${user.email}:${user.password}`);

  const res = await Axios('/api/auth/login').post<LoginResponse>(
    { ...user },
    { headers: { Authorization: `Basic ${auth}` } },
  );
  return res;
};

export const signUp = async (params: SignUpReq) => {
  const res = await Axios('/api/auth/signup').post<SignUpRes>({
    ...params,
  });

  return res;
};

export const logout = () => {
  const { getState } = useUserStore;
  secureLocalStorage.removeItem('refreshToken');
  secureLocalStorage.removeItem('accessToken');
  getState().setIsLogin(false);
  getState().setUser(null);
  window.location.replace('/');
};

export const getUser = async () => {
  const res = await Axios('/api/auth/me').get<UserType>();
  return res;
};

export const getAccessWithApi = async () => {
  const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
  const res = await Axios('/api/auth/token').post<{ accessToken: string }>(
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } },
  );
  return res?.accessToken;
};
