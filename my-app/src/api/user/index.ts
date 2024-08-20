import { getAxiosInstance as Axios } from 'api/axios';
import { UserPatchReq, UserType } from 'types/userTypes';

type Response = {
  [key: number]: UserType;
  status: number;
};

// 유저 목록
export const getUserlist = async () => {
  const res = await Axios(`/users`).get<Response>();

  return res;
};

export const deleteUser = async (id: string) => {
  const res = await Axios(`/users/delete/${id}`).remove<Response>();

  return res;
};
export const patchUser = async (params: UserPatchReq) => {
  const res = await Axios(`/users/update`).patch(params);

  return res;
};
