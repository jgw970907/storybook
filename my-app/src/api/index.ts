import { getAxiosInstance as Axios } from "./axios/index";

import {
  BookisLikeRes,
  LikesBooklistParams,
  MyFavorites,
  UserPatchReq,
  Countlist,
  RepliesList,
} from "types";

export const patchUser = async (params: UserPatchReq) => {
  const res = await Axios("users/update").patch(params);

  return res;
};
export const getBooksLike = async (params: LikesBooklistParams) => {
  const { authorId, take, page } = params;

  const res = await Axios(
    `/users/${authorId}/like2s?take=${take}&page=${page}&order__updatedAt=DESC`
  ).get<MyFavorites>();
  return res;
};

export const getBookIsLike = async ({
  bookId,
  userId,
}: {
  bookId: number;
  userId: number;
}) => {
  const res = await Axios(
    `/api2s/${bookId}/${userId}/is-like`
  ).get<BookisLikeRes>();
  return res;
};

export const postBookLike = async (bookId: number) => {
  const res = await Axios(`/api2s/${bookId}/like2s`).post();
  return res;
};

export const deleteBookLike = async ({
  bookId,
  likeId,
}: {
  bookId: number;
  likeId: number | undefined;
}) => {
  if (!likeId) return;
  const res = await Axios(`/api2s/${bookId}/like2s/${likeId}`).remove();
  return res;
};

export const getCount = async () => {
  const res = await Axios(`/api2s/count`).get<Countlist>();

  return res;
};

export const getReplies = async () => {
  const res = await Axios(`/api2s/replies`).get<RepliesList>();

  return res;
};
