import { ImagesType } from './imageTypes';
import { UserType } from './userTypes';

export type BookInfoType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  isSecret: boolean;
  images: ImagesType[];
  user: UserType;
  authorName: string;
  category: string;
};

export type BooklistRes = {
  data: BookInfoType[];
  cursor: {
    after: number;
  };
  count: number;
  next: string;
  total: number;
};

export type BookTakelistRes = {
  data: BookInfoType[];
  total: number;
};

export type BookPatchReq = {
  title: string;
  content: string;
  images: string[];
  category: string;
  authorName: string;
};

export type BookReq = {
  title: string;
  content: string;
  images: File[];
  authorName: string;
  category: string;
};

export type BookPost = {
  title: string;
  content: string;
  authorName: string;
  category: string;
};

export type BookRes = {
  id: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  isSecret: boolean;
  user: UserType;
  images: Array<{
    id: string;
    updatedAt: string;
    createdAt: string;
    order: number;
    type: number;
    path: string;
    fbPath: string;
  }>;
  category: string;
  authorName: string;
};

export type BooklistParams = {
  take?: number;
  page?: number;
  order__createdAt?: 'DESC' | 'ASC';
  where__title__i_like?: string;
  where__author__i_like?: string;
  order__clicks?: 'DESC';
  order__likeCount?: 'DESC';
  where__category?: string; // 장르 필터링을 위한 필드 추가
};

export type SelectedBookState = {
  selectedBook: SelectedBook;
  setSelectedBook: (newBookInfo: SelectedBook) => void;
};

export type SelectedBook = {
  title: string;
  content: string;
  images?: ImagesType[];
  authorName: string;
  category: string;
};
