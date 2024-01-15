import { useQuery, useMutation, useQueryClient } from 'react-query';
import queryKeys from 'queries/queryKeys';
import { getBoard, getBoards, createBoard, patchBoard, deleteBoard } from '../api/boardApi';
import { getBoardComments } from '../api/replyApi';
export const useGetBoard = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.ADMIN, 'board'],
    queryFn: () => getBoard(id),
    select: (res) => res.data,
  });
  return { data, error, isLoading };
};

export const useGetBoards = () => {
  return useQuery({
    queryKey: [queryKeys.ADMIN, 'boards'],
    queryFn: getBoards,
    select: (res) => res.data,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, 'boards'],
    mutationFn: createBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, 'boards']);
    },
  });
};

export const usePatchBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, 'boards'],
    mutationFn: patchBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, 'boards']);
      await queryClient.invalidateQueries([queryKeys.ADMIN, 'board', `${data?.id}`]);
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, 'boards'],
    mutationFn: deleteBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, 'boards']);
      await queryClient.invalidateQueries([queryKeys.ADMIN, 'board', `${data?.id}`]);
    },
  });
};

export const useGetBoardComments = (boardId) => {
  return useQuery({
    queryKey: [queryKeys.ADMIN, 'BoardComments', `${boardId}`],
    queryFn: () => getBoardComments(boardId),
    select: (res) => res.data,
  });
};
