import { useQuery, useMutation, useQueryClient } from "react-query";
import queryKeys from "queries/queryKeys";
import {
  getBoard,
  getBoards,
  createBoard,
  patchBoard,
  deleteBoard,
} from "../api/boardApi";
import {
  getBoardComments,
  createBoardComment,
  patchBoardComment,
} from "../api/replyApi";
import usePaginationStore from "../store/pagenationStore";
const { setTotalPages, totalPages } = usePaginationStore.getState();
export const useGetBoard = (id) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.ADMIN, "board", `${id}`],
    queryFn: () => getBoard(id),
    select: (res) => res.data,
  });
  return { data, error, isLoading, refetch };
};

export const useGetBoards = ({ take, page, order, search }) => {
  return useQuery({
    queryKey: [queryKeys.ADMIN, "boards", page, order, search],
    queryFn: () => getBoards(take, page, order, search),
    select: (res) => res.data,
    onSuccess: (data) => {
      setTotalPages(Math.ceil(data?.total / take));
      console.log("Total Pages111", totalPages);
      console.log("data", data);
    },
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

export const usePatchBoard = (boardId, board) => {
  const queryClient = useQueryClient();
  console.log("board", board);
  return useMutation({
    queryKey: [queryKeys.ADMIN, "board"],
    mutationFn: () => patchBoard(boardId, board),
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
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: [queryKeys.USER, "BoardComments", `${boardId}`],
    queryFn: () => getBoardComments(boardId),
    select: (res) => res.data,
  });
  return { isLoading, data, error, refetch };
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

export const usePatchBoardComment = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.USER, "BoardComments", `${boardId}`],
    mutationFn: (commentData) =>
      patchBoardComment(
        commentData.boardId,
        commentData.commentId,
        commentData.comment
      ),
    select: (res) => res.data,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        queryKeys.USER,
        "BoardComments",
        `${boardId}`,
      ]);
    },
  });
};

export const useDeleteBoardComment = (boardId) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: [queryKeys.USER, "BoardComments", `${boardId}`],
    mutationFn: (commentData) =>
      patchBoardComment(
        commentData.boardId,
        commentData.commentId,
        commentData.comment
      ),
    slelect: (res) => res.data,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries([
        queryKeys.USER,
        "BoardComments",
        `${boardId}`,
      ]);
    },
  });
};
