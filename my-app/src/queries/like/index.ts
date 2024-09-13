import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { getBookLike, addLike, removeLike } from 'api/like';
import { BookisLikeRes, MyFavorites, MyFavoritesParams } from 'types/likeTypes';
import { useUserStore } from 'store/useUserStore';
import { getMyFavorites } from 'api/like';

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

export const useGetBookLikes = (queries: MyFavoritesParams) => {
  const queryClient = useQueryClient();
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'likes', queries.page.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getMyFavorites(queries),
    enabled: isLogin,
    onSuccess: async (res: MyFavorites) => {
      if (res.totalPages * queries.take <= queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [QueryKeys.USER, 'likes', (queries.page + 1).toString()],
        queryFn: () => getMyFavorites({ ...queries, page: queries.page + 1 }),
      });
    },
  });
};
