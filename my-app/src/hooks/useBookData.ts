import { bookQueries } from 'queries';

export const useBookData = (order: 'DESC' | 'ASC' | 'CLICKS', search: string) => {
  const { useInfinityScroll } = bookQueries;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinityScroll(
    order,
    search,
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
