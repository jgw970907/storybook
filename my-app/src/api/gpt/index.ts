import {
  GptPromptResponse,
  GetGptStoriesResponse,
  GptStory,
  GptCreateTemplateResponse,
  GptUpdateReq,
  GptMyStoriesParams,
  GetMyGptStoriesResponse,
  GptGetLists,
} from 'types/gptTypes';
import { getAxiosInstance as Axios } from '../axios/index';
import { UserType } from 'types/userTypes';
import Cookies from 'js-cookie';

export interface GptStoriesParams {
  take?: number;
  page?: number;
  ordertype?: 'DESC' | 'ASC' | 'CLICKS';
  search__title?: string;
  search__authorname?: string;
  category?: string;
}
export const getGptStory = async (id: string) => {
  const res = await Axios(`/gpt/${id}`).get<GptStory & { user: UserType }>();
  return res;
};
export const getGptStories = async (queries?: GptStoriesParams) => {
  let res;
  if (queries) {
    res = await Axios('/gpt').get<GetGptStoriesResponse>(queries);
  } else {
    res = await Axios('/gpt').get<GetGptStoriesResponse>();
  }

  return res;
};

export const postgptChat = async ({ prompt }: { prompt: string }) => {
  const res = await Axios('/gpt/gptchat').post<GptPromptResponse>({ prompt });
  return res;
};
export const getAppendContent = async ({
  storyId,
  userRequest,
}: {
  storyId: string;
  userRequest: string;
}) => {
  const res = await Axios(`/gpt/${storyId}/appendcontent`).post<GptPromptResponse>({
    userRequest,
  });
  return res;
};
export const getMyStories = async (queries: GptMyStoriesParams, userId: string) => {
  const { take, page } = queries;
  const res = await Axios(
    `/mystories/${userId}?take=${take}&page=${page}&order__createdAt=DESC`,
  ).get<GetMyGptStoriesResponse>({
    userId,
  });
  return res;
};
export const getMyStory = async (id: string) => {
  const res = await Axios(`/mystories/mystory/${id}`).get<GptStory>();
  return res;
};
export const changeStoryWithGpt = async ({
  userRequest,
  userText,
  storyId,
}: {
  userRequest: string;
  userText: string;
  storyId: string;
}) => {
  const res = await Axios('/gpt/changestory').post<GptPromptResponse>({
    userRequest,
    userText,
    storyId,
  });
  return res;
};
export const createTemplate = async () => {
  const res = await Axios('/gpt/template').post<GptCreateTemplateResponse>();
  return res;
};

export const patchStoryContent = async (storyId: string, content: string) => {
  const res = await Axios(`/gpt/${storyId}/patchcontent`).patch<GptPromptResponse>({
    content,
  });
  return res;
};

export const updateStory = async ({
  storyId,
  title,
  content,
  category,
  imageIds,
  authorName,
  isSecret,
}: GptUpdateReq) => {
  const res = await Axios(`/gpt/${storyId}/updateStory`).patch<GptPromptResponse>({
    title,
    authorName,
    content,
    category,
    imageIds,
    isSecret,
  });
  return res;
};

export const deleteGptStory = async (id: string) => {
  const res = await Axios(`/gpt/${id}`).remove<GptStory>();
  return res;
};

export const getBestGptStories = async () => {
  const res = await Axios('/storylists/best').get<GptGetLists>();
  return res;
};

export const getRandomGptStories = async () => {
  const res = await Axios('/storylists/random').get<GptGetLists>();
  return res;
};

export const patchDisclosure = async (storyId: string) => {
  const res = await Axios(`/mystories/secret/${storyId}`).patch<{ message: string }>();
  return res;
};

export const incrementClicks = async (storyId: string) => {
  try {
    const res = await Axios(`/gpt/increment-clicks/${storyId}`).patchWithoutToken<{
      clicks: number;
      cookieName: string;
    }>({ cookieName: `book_${storyId}_clicked` });
    const clicks = res?.clicks;
    const cookieName = res?.cookieName;
    if (clicks && cookieName) {
      const clicked = Cookies.get(cookieName);
      if (!clicked) {
        Cookies.set(cookieName, 'true', { expires: 1 });
      }
      return clicks;
    }
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    throw error;
  }
};
