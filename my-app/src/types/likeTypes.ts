import { BookInfoType } from './bookTypes';
export type BookisLikeRes = {
  isLike: boolean;
  likeId: string;
  likeCount: number;
};

export type BookChangeLikeRes = {
  isLike: boolean;
  likeId: string;
  likeCount: number;
};
//vercel likes참고해야함
export type MyFavorites = {
  books: BookInfoType[];
  totalPages: number;
  currentPage: number;
};
export type MyFavoritesParams = {
  userId: string;
  take: number;
  page: number;
};
