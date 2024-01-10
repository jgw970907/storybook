import { LoginRes, RegisterReq } from "../types/AuthType/AuthRes";

import Axios from "./axios";

// 클라이언트 유저 로그인
export const postLogin = async (
  id: string,
  password: string
): Promise<LoginRes> => {
  const auth = btoa(`${id}:${password}`);

  const res = await Axios("/auth/login/email").post(
    {},
    { headers: { Authorization: `Basic ${auth}` } }
  );

  return res;
};

// 회원가입
export const postRegister = async (params: RegisterReq) => {
  const res = await Axios("/auth/register/email").post({ ...params });
  console.log(res);
  return res;
};
