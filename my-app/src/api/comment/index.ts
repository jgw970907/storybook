import { getAxiosInstance as Axios } from "../axios/index";
import { CommentGetRes, CommentPostRes, PatchCommentReq } from "types";

const getComments = async (bookId: number) => {
  const res = await Axios(`/api2s/${bookId}/reply2s`).get<CommentGetRes>();
  return res;
};
const postComment = async (bookId: number, comment: string) => {
  const res = await Axios(`/api2s/${bookId}/reply2s`).post<CommentPostRes>({
    reply2: comment,
  });
  return res;
};
const patchComment = async (params: PatchCommentReq) => {
  const { bookId, comment, commentId } = params;
  const res = await Axios(`/api2s/${bookId}/reply2s/${commentId}`).patch({
    reply2: comment,
  });
  return res;
};
const deleteComment = async (bookId: number, commentId: number) => {
  const res = await Axios(`/api2s/${bookId}/reply2s/${commentId}`).remove();
  return res;
};
export { getComments, postComment, patchComment, deleteComment };
