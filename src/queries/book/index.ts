import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getBooks, postBooks, patchBook, deleteBook, getBook } from 'api/book';
import { AxiosError } from 'axios';
import { QueryKeys } from 'constant';
import { BookTakelistRes, BooklistParams } from 'types/bookTypes';
export const useInfinityScroll = (
  order: 'DESC' | 'ASC' | 'CLICKS',
  searchTitle?: string,
  searchAuthorName?: string,
  genre?: string | null,
) => {
  return useInfiniteQuery<BookTakelistRes>({
    queryKey: [QueryKeys.USER, 'books', 'infinity', order, searchTitle, searchAuthorName, genre],
    queryFn: ({ pageParam = 1 }) => {
      const queryParameters: BooklistParams = {
        page: pageParam,
        take: 10,
      };
      if (searchTitle) {
        queryParameters.where__title__i_like = searchTitle;
      }
      if (searchAuthorName) {
        queryParameters.where__author__i_like = searchAuthorName;
      }
      if (genre) {
        queryParameters.where__category = genre;
      }
      // Set order parameters based on the order value
      if (order === 'CLICKS') {
        queryParameters.order__clicks = 'DESC';
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

export const useGetBooks = (queries?: BooklistParams) => {
  const key = [QueryKeys.USER, 'books'];
  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });
};

export const useGetBooksAdmin = (queries: BooklistParams) => {
  const key = [QueryKeys.ADMIN, 'books'];

  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
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
