import { MyFavoritesParams } from 'types/likeTypes';
import { getAxiosInstance as Axios } from '../axios/index';

import { StoryisLikeRes, StoryChangeLikeRes, MyFavorites } from 'types/gptTypes';

export const getStoryLike = async ({ storyId, userId }: { storyId: string; userId: string }) => {
  const res = await Axios(`/gptlike/${storyId}/${userId}`).get<StoryisLikeRes>();
  return res;
};

export const addLike = async ({ storyId, userId }: { storyId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/gptlike/add/${storyId}/${userId}`).patch<StoryChangeLikeRes>();
  return res;
};
export const removeLike = async ({ storyId, userId }: { storyId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/gptlike/remove/${storyId}/${userId}`).patch<StoryChangeLikeRes>();
  return res;
};
export const getMyFavoriteStories = async (params: MyFavoritesParams) => {
  const { take, page } = params;
  const res = await Axios(
    `/myfavorites/stories?take=${take}&page=${page}&order__createdAt=DESC`,
  ).get<MyFavorites>();
  return res;
};
