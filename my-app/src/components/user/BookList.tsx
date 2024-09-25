import { useState, useMemo } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { incrementClicks } from 'api/book';
import { CustomModal } from 'components/modal/CustomModal';
import Book from 'components/user/Book';
import { Layout, TotheTop } from 'styles/user/MainPageStyled';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { BookTakelistRes } from 'types/bookTypes';

interface BookListProps {
  data: UseInfiniteQueryResult<BookTakelistRes, unknown>['data'];
  fetchNextPage: () => Promise<UseInfiniteQueryResult<BookTakelistRes, unknown>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}
const BookList = ({ data, fetchNextPage, hasNextPage, isFetchingNextPage }: BookListProps) => {
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const selectedBook = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data).find((book) => book?.id === selectedBookId);
  }, [data, selectedBookId]);

  const handleClick = (id: string) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id);

    if (id) {
      incrementClicks(id);
    } else {
      alert('책이 삭제되었거나 잘못된 경로입니다.');
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <Layout>
      <TotheTop onClick={scrollToTop}>Top</TotheTop>

      {data?.pages.map((page) =>
        page?.data.map((book, index) => {
          const isLastItem = page.data.length - 1 === index;
          return (
            <Book
              key={book.id}
              ref={isLastItem ? targetRef : null}
              {...book}
              onClick={() => handleClick(book.id)}
            />
          );
        }),
      )}

      {modalOpen && selectedBook && (
        <CustomModal
          bookId={selectedBookId}
          book={selectedBook}
          setModalOpen={setModalOpen}
          showScroll={showScroll}
        />
      )}
    </Layout>
  );
};
export default BookList;
