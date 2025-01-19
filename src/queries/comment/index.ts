import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { QueryKeys } from 'constant';
import {
  getCommentsForBook,
  getComments,
  patchComment,
  postComment,
  deleteCommentByRole,
  deleteComment,
  getMyComments,
} from 'api/comment';
import { AxiosError } from 'axios';
import { CommentGetRes } from 'types/commentTypes';
import { UserType } from 'types/userTypes';

export const GetCommentsForBook = (bookId: string, params: { page: number; take: number }) => {
  const key = [QueryKeys.USER, 'comments', bookId, params.page];
  const isBookIdValid = bookId !== null && bookId !== '';
  return useQuery({
    queryKey: key,
    queryFn: () => getCommentsForBook(bookId, params),
    select: (res) => res,
    enabled: isBookIdValid,
  });
};
//admin페이지 댓글 불러오기
export const GetComments = (page: number, take = 10) => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'commentAdMin', page, take],
    queryFn: () => getComments({ page, take }), // API 함수에 페이지와 take 파라미터를 전달
    select: (res) => res,
    keepPreviousData: true, // 페이지네이션 시 이전 데이터를 유지
  });
};

export const PatchComment = (bookId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId],
    mutationFn: ({
      bookId,
      commentId,
      comment,
    }: {
      bookId: string;
      commentId: string;
      comment: string;
    }) => patchComment({ bookId, commentId, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId]);
      queryClient.invalidateQueries([QueryKeys.USER, 'mycomments']);
      alert('댓글 수정 성공!');
    },
    onError: (error: AxiosError) => {
      alert(`${error.message}`);
    },
  });
};
export const PostComment = (bookId: string, user: UserType | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId],
    mutationFn: (comment: string) => {
      return postComment(bookId, comment);
    },
    onMutate: async (comment: string) => {
      await queryClient.cancelQueries([QueryKeys.USER, 'comments', bookId]);

      const previousComments = queryClient.getQueryData<CommentGetRes>([
        QueryKeys.USER,
        'comments',
        bookId,
      ]);
      queryClient.setQueryData([QueryKeys.USER, 'comments', bookId], (old?: CommentGetRes) => {
        if (!user) return;
        if (!old) {
          // 데이터가 없는 경우, 새 구조를 생성
          return {
            data: [
              {
                // 새 댓글 객체의 구조를 정의합니다. 예시에서는 임시 ID와 기타 필요한 필드를 설정합니다.
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                content: comment,
                user: { ...user },
              },
            ],
            total: 1,
          };
        } else {
          // 기존 데이터에 새 댓글을 추가
          return {
            ...old,
            data: [
              ...old.data,
              {
                id: uuidv4(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                content: comment,
                user: {
                  ...user,
                },
              },
            ],
            total: old.total + 1,
          };
        }
      });
      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId]);
      queryClient.invalidateQueries([QueryKeys.USER, 'mycomments']);
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response.status === 400) {
        alert('댓글에 부적절한 내용이 포함되어 있습니다.');
      } else {
        alert('댓글을 작성하는 도중 에러가 발생했습니다.');
      }
    },
  });
};
export const DeleteCommentByRole = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'comments'],
    mutationFn: (commentId: string) => deleteCommentByRole(commentId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'comments']);
      alert('댓글이 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError) => {
      alert(`댓글 삭제 중 오류가 발생했습니다: ${error.message}`);
    },
  });
};
export const DeleteComment = (bookId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'comments', bookId],
    mutationFn: (commentId: string) => deleteComment(bookId, commentId),
    onMutate: async (commentId: string) => {
      await queryClient.cancelQueries([QueryKeys.USER, 'comments', bookId]);
      const previousComments = queryClient.getQueryData<CommentGetRes>([
        QueryKeys.USER,
        'comments',
        bookId,
      ]);

      queryClient.setQueryData([QueryKeys.USER, 'comments', bookId], (old?: CommentGetRes) => {
        if (!old) return;
        return {
          ...old,
          data: old.data.filter((comment) => comment.id !== commentId),
          total: old.total - 1,
        };
      });
      return { previousComments };
    },
    onSuccess: () => {
      alert('삭제 성공!');
    },
    onError: (error: AxiosError, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData([QueryKeys.USER, 'comments', bookId], context.previousComments);
      }
      alert(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'comments', bookId]);
      queryClient.invalidateQueries([QueryKeys.USER, 'mycomments']);
    },
  });
};
export const GetMyComments = (userId: string) => {
  return useQuery({
    queryKey: [QueryKeys.USER, 'mycomments'],
    queryFn: () => getMyComments({ userId }),
    keepPreviousData: true,
  });
};
