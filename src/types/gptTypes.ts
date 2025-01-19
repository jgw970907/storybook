import { ImagesType } from './imageTypes';
import { UserType } from './userTypes';

export interface GptPromptResponse {
  content: string;
}
export interface GptCreateTemplateResponse {
  id: string;
}
export interface GptPromptRequest {
  prompt: string;
}
export interface GptStory {
  userId: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  category: string;
  images: ImagesType[];
  isSecret: boolean;
  likeCount: number;
  authorName: string;
}
export interface GptStoryRes {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  category: string;
  images: ImagesType[];
  authorName: string;
  user: UserType;
}
export type storyArrayForInfi = Array<{
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  clicks: number;
  category: string;
  userId: string;
  images: ImagesType[];
  authorName: string;
  likeCount: number;
}>;

export interface GetGptStoriesResponse {
  data: storyArrayForInfi;
  total: number;
}
export interface GptGetLists {
  data: { stories: storyArrayForInfi };
}
export interface GetMyGptStoriesResponse {
  data: {
    stories: [
      {
        id: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        clicks: number;
        category: string;
        images: ImagesType[];
        authorName: string;
        isSecret: boolean;
        userId: string;
      },
    ];
  };
  total: number;
}

export interface GptUpdateReq {
  storyId: string;
  authorName: string;
  title: string;
  content: string;
  category: string;
  imageIds: string[];
  isSecret: boolean;
}
export interface GptMyStoriesParams {
  take: number;
  page: number;
}
export interface StoryisLikeRes {
  isLike: boolean;
  likeCount: number;
}
export interface StoryChangeLikeRes {
  isLike: boolean;
  likeCount: number;
}
export type MyFavorites = {
  books: GptStory[];
  totalPages: number;
  currentPage: number;
};
