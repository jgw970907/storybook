export interface LoginRes extends UserRes {
  accessToken: string;
  refreshToken: string;
}

export interface UserRes {
  userInfo: {
    email: string;
    followeeCount: number;
    followerCount: number;
    id: number;
    name: string;
    nickname: string;
  };
}

export type RegisterReq = {
  nickname: string;
  email: string;
  password: string;
  name: string;
};

export type CookieName = "accessToken" | "refreshToken";
