import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { getBooks, postBooks, patchBook, deleteBook, getBook } from 'api/book';
import { AxiosError } from 'axios';
import { QueryKeys } from 'constant';
import { BookTakelistRes, BooklistParams } from 'types/bookTypes';

export const useInfinityScroll = (order: 'DESC' | 'ASC' | 'CLICKS', search: string) => {
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

export const GetBooks = (queries?: BooklistParams) => {
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

export const GetBooksAdmin = (queries: BooklistParams) => {
  const key = [QueryKeys.ADMIN, 'books'];

  if (queries?.page) key.push(queries.page.toString());

  return useQuery({
    queryKey: key,
    queryFn: () => getBooks(queries),
    staleTime: 1000 * 60 * 3,
    cacheTime: 1000 * 60 * 5,
  });
};

export const GetBook = (id: string) => {
  const key = [QueryKeys.ADMIN, 'books', id];

  return useQuery({
    queryKey: key,
    queryFn: () => getBook(id),
    select: (res) => res,
  });
};

export const PostBook = () => {
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

export const PatchBook = () => {
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
export const DeleteBook = (page?: number) => {
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
