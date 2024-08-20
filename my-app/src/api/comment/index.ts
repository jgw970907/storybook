import { getAxiosInstance as Axios } from '../axios/index';
import {
  CommentsGetRes,
  CommentGetRes,
  CommentPostRes,
  PatchCommentReq,
} from '../../types/commentTypes';
export const getCommentsForBook = async (
  bookId: string,
  params: { page: number; take: number },
) => {
  const res = await Axios(
    `/comment/${bookId}?page=${params.page}&take=${params.take}`,
  ).get<CommentGetRes>();
  return res;
};
export const getComments = async (params: { page: number; take: number }) => {
  const res = await Axios(`/comment?page=${params.page}&take=${params.take}`).get<CommentsGetRes>(
    params,
  );

  return res;
};
export const postComment = async (bookId: string, comment: string) => {
  const res = await Axios(`/comment/${bookId}`).post<CommentPostRes>({
    content: comment,
  });
  return res;
};

export const patchComment = async (params: PatchCommentReq) => {
  const { bookId, comment, commentId } = params;
  const res = await Axios(`/comment/${bookId}/${commentId}`).patch({
    content: comment,
  });
  return res;
};
export const deleteCommentByRole = async (commentId: string, userId: string) => {
  const res = await Axios(`/comment/role/${commentId}/${userId}`).remove();
  return res;
};
export const deleteComment = async (bookId: string, commentId: string) => {
  const res = await Axios(`/comment/${bookId}/${commentId}`).remove();
  return res;
};
