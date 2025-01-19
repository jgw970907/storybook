import { bookQueries } from 'queries';

export const useBookData = (
  order: 'DESC' | 'ASC' | 'CLICKS',
  searchTitle?: string | undefined,
  searchAuthorName?: string | undefined,
  genre?: string | null,
) => {
  const { useInfinityScroll } = bookQueries;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinityScroll(
    order,
    searchTitle,
    searchAuthorName,
    genre,
  );

  const hasBooks = data?.pages.some((page) => (page?.data ?? []).length > 0);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    hasBooks,
  };
};
