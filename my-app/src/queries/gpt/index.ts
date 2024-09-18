import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'constant';
import {
  changeStoryWithGpt,
  createTemplate,
  getAppendContent,
  getBestGptStories,
  getGptStories,
  getMyStories,
  getMyStory,
  getRandomGptStories,
  postgptChat,
} from 'api/gpt';
import { GetGptStoriesResponse, GptMyStoriesParams, GptPromptResponse } from 'types/gptTypes';
import { GptStoriesParams } from 'api/gpt';
import { patchDisclosure } from 'api/gpt';
import { AxiosError } from 'axios';
import { useGptStore } from 'store/usegptStore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

//mypage는 내가 좋아한 책, 내가 쓴 리뷰, 내가 쓴 스토리, 내가 좋아한 스토리, 내정보로 나눌 예정
//일반 gpt 챗봇을 통해 응답을 받아오는 쿼리
export const usePostGptChat = () => {
  return useMutation({
    mutationKey: [QueryKeys.USER, 'gptchat'],
    mutationFn: postgptChat,
  });
};
export const useMakeTemplate = () => {
  const navigate = useNavigate();
  const { setStoryId } = useGptStore();
  return useMutation({
    mutationFn: createTemplate,
    mutationKey: [QueryKeys.USER, 'template'],
    onSuccess: (data) => {
      navigate(`/gptpage/prompt/${data.id}`); // 원하는 URL로 변경하세요
      setStoryId(data.id);
    },
    onError: (error: AxiosError) => {
      alert(`스토리 생성 중 에러가 발생했습니다: ${error.message}`);
    },
  });
};
//gpt에 기존 데이터베이스 컨텐츠를 활용해 스토리를 변경한 응답을 받아오는 쿼리
export const useChangeStoryWithGpt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.USER, 'change-story'],
    mutationFn: changeStoryWithGpt,
    onSuccess: (data: GptPromptResponse) => {
      queryClient.invalidateQueries([QueryKeys.USER, 'change-story']);
      alert('스토리가 변경되었습니다.');
      return data;
    },
    onError: (error: AxiosError) => {
      alert(`스토리 변경 중 에러가 발생했습니다: ${error.message}`);
    },
  });
};
//gpt에 기존 데이터베이스 컨텐츠를 활용해 스토리를 추가한 응답을 받아오는 쿼리
export const useAppendStoryContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.USER, 'append-story'],
    mutationFn: getAppendContent,
    onSuccess: () => {
      // 특정 쿼리를 무효화하여 최신 데이터를 가져오도록 합니다.
      alert('스토리가 추가되었습니다.');
      queryClient.invalidateQueries([QueryKeys.USER, 'append-story']);
    },
  });
};
//story데이터베이스에서 데이터를 10개씩 가져오는 쿼리
export const useStoriesInfinityScroll = (
  order: 'DESC' | 'ASC' | 'CLICKS',
  searchTitle?: string | null,
  searchAuthorName?: string | null,
  category?: string | null,
) => {
  return useInfiniteQuery<GetGptStoriesResponse>({
    queryKey: [QueryKeys.USER, 'gpt', 'infinity', order, searchTitle, searchAuthorName, category],
    queryFn: ({ pageParam = 1 }) => {
      const queryParameters: GptStoriesParams = {
        page: pageParam,
        take: 10,
      };
      if (searchTitle) {
        queryParameters.search__title = searchTitle;
      }
      if (searchAuthorName) {
        queryParameters.search__authorname = searchAuthorName;
      }
      if (category) {
        queryParameters.category = category;
      }
      if (order) {
        queryParameters.ordertype = order;
      }
      return getGptStories(queryParameters);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage) {
        return undefined;
      }
      if (pages.length < lastPage.total / 10) {
        return pages.length + 1;
      } else return undefined;
    },
  });
};
export const useGetMyStories = (queries: GptMyStoriesParams, userId: string, ismypage: boolean) => {
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'mystories', queries.page.toString(), userId];

  return useQuery({
    queryKey: key,
    queryFn: () => getMyStories(queries, userId, ismypage),
    enabled: isLogin && !!userId,
  });
};
export const useGetMyStory = (id: string) => {
  const { isLogin } = useUserStore.getState();

  const key = [QueryKeys.USER, 'mystory', id];

  return useQuery({
    queryKey: key,
    queryFn: () => getMyStory(id),
    enabled: isLogin,
  });
};

export const useGetBestStories = () => {
  return useQuery({
    queryKey: [QueryKeys.USER, 'beststories'],
    queryFn: getBestGptStories,
  });
};
export const useGetRandomStories = () => {
  return useQuery({
    queryKey: [QueryKeys.USER, 'randomstories'],
    queryFn: getRandomGptStories,
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 3,
  });
};

export const usePatchDisclosure = (currentPage: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchDisclosure,
    mutationKey: [QueryKeys.USER, 'patch-disclosure'],
    onSuccess: (data) => {
      queryClient.invalidateQueries([QueryKeys.USER, 'mystories', currentPage]);
      alert(data.message);
    },
    onError: (error: AxiosError) => {
      alert(`공개 여부 변경 중 에러가 발생했습니다: ${error.message}`);
    },
  });
};
