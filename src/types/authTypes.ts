import { UserType } from './userTypes';

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userInfo: UserType;
};

export type SignUpReq = {
  nickname: string;
  name: string;
  password: string;
  email: string;
};

export type SignUpRes = {
  accessToken: string;
  refreshToken: string;
  userInfo: UserType;
};
