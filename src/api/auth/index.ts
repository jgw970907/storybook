import { StorageKeys } from 'constant';
import Axios from '../axios';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { LoginResponse, SignUpRes, SignUpReq, LoginParams } from 'types/authTypes';
import { UserType } from 'types/userTypes';

export const login = async (user: LoginParams) => {
  const auth = btoa(`${user.email}:${user.password}`);

  const res = await Axios('/auth/login').post<LoginResponse>(
    { ...user },
    { headers: { Authorization: `Basic ${auth}` } },
  );
  return res;
};

export const signUp = async (params: SignUpReq) => {
  const res = await Axios('/auth/signup').post<SignUpRes>({
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
  const res = await Axios('/auth/me').get<UserType>();
  return res;
};

export const getAccessWithApi = async () => {
  const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
  const res = await Axios('/auth/token').post<{ accessToken: string }>(
    {},
    { headers: { Authorization: `Bearer ${refreshToken}` } },
  );
  return res?.accessToken;
};
export const sendToEmail = async (email: string) => {
  const res = await Axios('/mail/send-code').post<{ message: string }>({ email });
  return res;
};
export const sendVerificationCode = async (email: string, code: string) => {
  const res = await Axios('/mail/verify-code').post<{ message: string }>({ email, code });
  return res;
};
