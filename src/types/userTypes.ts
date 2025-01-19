export type UserPatchReq = {
  id?: string;
  nickname?: string;
  password?: string;
  profileImgPath?: string;
};
export type UserType = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  profileImg: Array<string>;
  createdAt: string;
};
