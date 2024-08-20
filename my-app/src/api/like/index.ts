import { getAxiosInstance as Axios } from '../axios/index';

import { BookisLikeRes, BookChangeLikeRes, MyFavorites, MyFavoritesParams } from 'types/likeTypes';

export const getBookLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  const res = await Axios(`/like/${bookId}/${userId}`).get<BookisLikeRes>();
  return res;
};

export const addLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/like/add/${bookId}/${userId}`).patch<BookChangeLikeRes>();
  return res;
};
export const removeLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/like/remove/${bookId}/${userId}`).patch<BookChangeLikeRes>();
  return res;
};
//vercel 참고, like 데이터베이스에서 userId를 이용해 like데이터와 book데이터 묶어서 return
export const getMyFavorites = async (params: MyFavoritesParams) => {
  const { userId, take, page } = params;
  const res = await Axios(
    `/myfavorites/${userId}?take=${take}&page=${page}&order__updatedAt=DESC`,
  ).get<MyFavorites>();
  return res;
};
