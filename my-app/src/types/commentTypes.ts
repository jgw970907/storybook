import { UserType } from './userTypes';

export type CommentPostRes = {
  content: string;
  user: UserType;
};
export type CommentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: UserType;
};
export type CommentGetRes = {
  data: Array<CommentType>;
  total: number;
};
export type CommentsType = {
  commentId: string;
  commentArray: Array<CommentType>;
  total: number;
  bookTitle: string;
};
export type CommentsGetRes = {
  data: CommentsType[];
  total: number;
};

export type PatchCommentReq = {
  bookId: string;
  commentId: string;
  comment: string;
};
export type RepliesList = CommentType[];
