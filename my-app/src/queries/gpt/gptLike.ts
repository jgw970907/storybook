import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import { getStoryLike, addLike, removeLike } from 'api/gpt/gptlike';
import { StoryisLikeRes, MyFavorites } from 'types/gptTypes';

import { useUserStore } from 'store/useUserStore';
import { getMyFavoriteStories } from 'api/gpt/gptlike';
import { MyFavoritesParams } from 'types/likeTypes';

export const useGetStoryIsLike = (storyId: string, userId: string) => {
  const key = [QueryKeys.USER, 'gptlikes', storyId];
  const { isLogin } = useUserStore.getState();
  const isUserIdValid = userId !== null && userId !== '';

  return useQuery({
    queryKey: key,
    enabled: isUserIdValid && isLogin,
    queryFn: () => getStoryLike({ storyId, userId }),
    select: (res) => res,
  });
};

export const useAddLike = ({ storyId }: { storyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'gptlikes', storyId],
    mutationFn: addLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'gptlikes', storyId]);
      const previousLikes = queryClient.getQueryData<StoryisLikeRes>([
        QueryKeys.USER,
        'likes',
        storyId,
      ]);

      queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], (old?: StoryisLikeRes) => {
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
      queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], (old?: StoryisLikeRes) => {
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
        queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'gptlikes', storyId]);
    },
  });
};
export const useRemoveLike = ({ storyId }: { storyId: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'gptlikes', storyId],
    mutationFn: removeLike,
    onMutate: async () => {
      await queryClient.cancelQueries([QueryKeys.USER, 'gptlikes', storyId]);
      const previousLikes = queryClient.getQueryData<StoryisLikeRes>([
        QueryKeys.USER,
        'gptlikes',
        storyId,
      ]);

      queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], (old?: StoryisLikeRes) => {
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
      queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], (old?: StoryisLikeRes) => {
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
        queryClient.setQueryData([QueryKeys.USER, 'gptlikes', storyId], context.previousLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([QueryKeys.USER, 'gptlikes', storyId]);
    },
  });
};

export const useGetStoryLikes = (queries: MyFavoritesParams) => {
  const queryClient = useQueryClient();
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'gptlikes', queries.page.toString()];

  return useQuery({
    queryKey: key,
    queryFn: () => getMyFavoriteStories(queries),
    enabled: isLogin,
    onSuccess: async (res: MyFavorites) => {
      if (res.totalPages * queries.take <= queries.take * queries.page) return;

      await queryClient.prefetchQuery({
        queryKey: [QueryKeys.USER, 'gptlikes', (queries.page + 1).toString()],
        queryFn: () => getMyFavoriteStories({ ...queries, page: queries.page + 1 }),
      });
    },
  });
};
