import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import {
  getBooks,
  postBooks,
  patchBook,
  deleteBook,
  getBook,
  postComment,
  patchComment,
  deleteComment,
  getCount,
  getCommentsForBook,
  getBookLike,
  getMyFavorites,
  getComments,
  deleteCommentByRole,
  addLike,
  removeLike,
} from 'api';
import {
  BookTakelistRes,
  BookisLikeRes,
  BooklistParams,
  CommentGetRes,
  MyFavoritesParams,
  MyFavorites,
  UserType,
} from 'types';
import { QueryKeys, StorageKeys } from 'constant';
import { getUser, login } from 'api/auth';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { patchUser } from 'api/user';
import { AxiosError } from 'axios';

export const useGetBooks = (queries?: BooklistParams) => {
  const key = [QueryKeys.USER, 'books'];
  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useGetBooksAdmin = (queries: BooklistParams) => {
  const key = [QueryKeys.ADMIN, 'books'];

  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useGetBook = (id: string) => {
  const key = [QueryKeys.ADMIN, 'books', id];

  return useQuery({
    queryKey: key,
    queryFn: () => getBook(id),
    select: (res) => res,
  });
};

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: postBooks,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
      alert('책 등록에 성공했습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

export const usePatchBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: patchBook,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
      alert('데이터 수정에 성공했습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

export const usePatchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'userInfo'],
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER_DATA]);
      alert('유저데이터 수정을 성공했습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

export const useDeleteBook = (page?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.ADMIN, 'books'],
    mutationFn: deleteBook,
    onMutate: async (id) => {
      if (!page) return;
      const key = [QueryKeys.ADMIN, 'books', page.toString()];
      await queryClient.cancelQueries({ queryKey: key });

      const previousBooks = queryClient.getQueryData<BookTakelistRes>(key)?.data;

      if (previousBooks) {
        const updatedBooks = previousBooks.filter((book) => book.id !== id);
        queryClient.setQueryData(key, { data: updatedBooks });
      }
      return { previousBooks };
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.ADMIN, 'books']);
      queryClient.invalidateQueries([QueryKeys.USER, 'books']);
      alert('데이터 삭제 성공했습니다.');
    },
    onError: (err: AxiosError, _, context) => {
      const key = [QueryKeys.ADMIN, 'books', page];
      queryClient.setQueryData(key, context?.previousBooks);
      alert(err.message);
    },
  });
};

export const useLogin = () => {
  const { setIsLogin, setUser } = useUserStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QueryKeys.USER_DATA],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      setUser(data.userInfo);
      secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
      navigate('/user');
    },
  });
};

export const useGetUser = (flag: boolean) => {
  return useQuery({
    queryKey: [QueryKeys.USER_DATA],
    queryFn: getUser,
    enabled: !!flag,
  });
};
export const useGetCommentsForBook = (bookId: string, params: { page: number; take: number }) => {
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
export const useGetComments = (page: number, take = 10) => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'commentAdMin', page, take],
    queryFn: () => getComments({ page, take }), // API 함수에 페이지와 take 파라미터를 전달
    select: (res) => res,
    keepPreviousData: true, // 페이지네이션 시 이전 데이터를 유지
  });
};

export const usePatchComment = (bookId: string) => {
  const queryClient = useQueryClient();
  //주석
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
      alert('댓글 수정 성공!');
    },
    onError: (error: AxiosError) => {
      alert(`${error.message}`);
    },
  });
};
export const usePostComment = (bookId: string, user: UserType | null) => {
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
export const useDeleteCommentByRole = (userId: string) => {
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
export const useDeleteComment = (bookId: string) => {
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
    },
  });
};
export const useInfinityScroll = (
  order: 'DESC' | 'ASC' | 'CLICKS' | 'LIKECOUNT',
  search: string,
) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.USER, 'books', 'infinity', order, search],
    queryFn: ({ pageParam = 1 }) => {
      const queryParameters: BooklistParams = {
        page: pageParam,
        take: 10,
      };
      if (search) {
        queryParameters.where__title__i_like = search;
      }

      // Set order parameters based on the order value
      if (order === 'CLICKS') {
        queryParameters.order__clicks = 'DESC';
      } else if (order === 'LIKECOUNT') {
        queryParameters.order__likeCount = 'DESC';
      } else {
        queryParameters.order__createdAt = order; // Include only for ASC or DESC
      }

      return getBooks(queryParameters);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        return;
      }
      if (pages.length < lastPage.total / 10) {
        return pages.length + 1;
      } else return undefined;
    },
  });
};

export const useGetBookLikes = (queries: MyFavoritesParams) => {
  const queryClient = useQueryClient();
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'likes', queries.page.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getMyFavorites(queries),
    enabled: isLogin && !!queries.userId,
    onSuccess: async (res: MyFavorites) => {
      if (res.totalPages * queries.take <= queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [QueryKeys.USER, 'likes', (queries.page + 1).toString()],
        queryFn: () => getMyFavorites({ ...queries, page: queries.page + 1 }),
        staleTime: 1000 * 60 * 3,
        cacheTime: 1000 * 60 * 5,
      });
    },
  });
};

export const useGetBookIsLike = (bookId: string, userId: string) => {
  const key = [QueryKeys.USER, 'likes', bookId];
  const { isLogin } = useUserStore.getState();
  const isUserIdValid = userId !== null && userId !== '';

  return useQuery({
    queryKey: key,
    enabled: isUserIdValid && isLogin,
    queryFn: () => getBookLike({ bookId, userId }),
    select: (res) => res,
  });
};

export const useAddLike = ({ bookId }: { bookId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes', bookId],
    mutationFn: addLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'likes', bookId]);
      const previousLikes = queryClient.getQueryData<BookisLikeRes>([
        QueryKeys.USER,
        'likes',
        bookId,
      ]);

      queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], (old?: BookisLikeRes) => {
        if (!old) return;
        return {
          ...old,
          isLike: !old.isLike,
          likeCount: old.likeCount + 1,
        };
      });
      return { previousLikes };
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], (old?: BookisLikeRes) => {
        if (!old || !data) return;
        return {
          ...old,
          isLike: data.isLike,
          likeCount: data.likeCount,
        };
      });
    },
    onError: (error, variables, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes', bookId]);
    },
  });
};
export const useRemoveLike = ({ bookId }: { bookId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'likes', bookId],
    mutationFn: removeLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'likes', bookId]);
      const previousLikes = queryClient.getQueryData<BookisLikeRes>([
        QueryKeys.USER,
        'likes',
        bookId,
      ]);

      queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], (old?: BookisLikeRes) => {
        if (!old) return;
        return {
          ...old,
          isLike: false,
          likeCount: old.likeCount - 1,
        };
      });
      return { previousLikes };
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], (old?: BookisLikeRes) => {
        if (!old || !data) return;
        return {
          ...old,
          isLike: data.isLike,
          likeCount: data.likeCount,
        };
      });
    },
    onError: (error, variables, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData([QueryKeys.USER, 'likes', bookId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'likes', bookId]);
    },
  });
};
export const useGetCount = () => {
  return useQuery({
    queryKey: [QueryKeys.ADMIN, 'count'],
    queryFn: getCount,
    placeholderData: () => ({
      totalBooks: '-',
      totalClicks: '-',
      totalUsers: '-',
      totalAdmins: '-',
      totalComments: '-',
    }),
  });
};
