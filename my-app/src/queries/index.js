import { useQuery, useMutation, useQueryClient } from "react-query";
import queryKeys from "queries/queryKeys";
import {
  getBoard,
  getBoards,
  createBoard,
  patchBoard,
  deleteBoard,
} from "../api/boardApi";
import { getBoardComments, createBoardComment } from "../api/replyApi";
export const useGetBoard = (id) => {
  const { data, error, isLoading } = useQuery({
    queryKey: [queryKeys.ADMIN, "board", `${id}`],
    queryFn: () => getBoard(id),
    select: (res) => res.data,
  });
  return { data, error, isLoading };
};

export const useGetBoards = ({ take, page, order, search }) => {
  return useQuery({
    queryKey: [queryKeys.ADMIN, "boards"],
    queryFn: () => getBoards(take, page, order, search),
    select: (res) => res.data,
  });
};

export const useCreateBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, "board"],
    mutationFn: createBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, "boards"]);
      await queryClient.invalidateQueries([
        queryKeys.ADMIN,
        "board",
        `${data?.id}`,
      ]);
    },
  });
};

export const usePatchBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, "board"],
    mutationFn: (id, board) => patchBoard(id, board),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, "boards"]);
      await queryClient.invalidateQueries([
        queryKeys.ADMIN,
        "board",
        `${data?.id}`,
      ]);
    },
  });
};

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.ADMIN, "boards"],
    mutationFn: deleteBoard,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([queryKeys.ADMIN, "boards"]);
      await queryClient.invalidateQueries([
        queryKeys.ADMIN,
        "board",
        `${data?.id}`,
      ]);
    },
  });
};

export const useGetBoardComments = (boardId) => {
  return useQuery({
    queryKey: [queryKeys.USER, "BoardComments", `${boardId}`],
    queryFn: () => getBoardComments(boardId),
    select: (res) => res.data,
  });
};

export const useCreateBoardComment = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.USER, "BoardComments", `${boardId}`],
    mutationFn: (commentData) =>
      createBoardComment(commentData.boardId, commentData.comment),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        queryKeys.USER,
        "BoardComments",
        `${boardId}`,
      ]);
    },
  });
};
