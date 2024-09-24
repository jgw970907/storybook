import { likeQueries } from 'queries';
import { useState } from 'react';
import { Book } from 'components/user';
import CustomModal from 'components/modal/CustomModal';
import AdminPagination from 'components/admin/AdminPagination';
import { PaginationWrapper } from 'styles/AdminStyledTemp';
import * as S from 'styles/mypage/mypageStyled';
import { LoaderWrapper } from 'styles/LoaderWrapper';
import { Loader } from 'components/shared';
const ReviewLike = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { useGetBookLikes } = likeQueries;
  const {
    data: LikesBooks,
    status: getbookStatus,
    isSuccess,
  } = useGetBookLikes({ take: 10, page: currentPage });

  const handleClick = (id: string) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장
  };

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const findSelectedBook = () => {
    return LikesBooks?.books.flatMap((data) => data).find((data) => data?.id === selectedBookId);
  };
  const selectedBook = findSelectedBook();
  return (
    <S.Section>
      <div className="likesbook">
        {/* 내가 좋아한 책같은 경우 한줄로 배치할 것이기 때문에 flex 사용 */}
        <h1>내가 좋아한 책</h1>
        {getbookStatus === 'loading' ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : LikesBooks && LikesBooks.books.length > 0 ? (
          <>
            <S.Layout>
              <S.BookWrapper $isSuccess={isSuccess}>
                {getbookStatus === 'success' && (
                  <>
                    {LikesBooks.books.map((data) => {
                      const { id, title, images, ...spread } = data;
                      return (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          key={id}
                        >
                          <Book
                            key={id}
                            id={id}
                            images={images}
                            title={title}
                            {...spread}
                            onClick={() => handleClick(id)}
                          />
                          {modalOpen && (
                            <CustomModal
                              bookId={selectedBookId}
                              book={selectedBook}
                              setModalOpen={setModalOpen}
                              showScroll={showScroll}
                            ></CustomModal>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </S.BookWrapper>
            </S.Layout>
            <PaginationWrapper>
              <AdminPagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={Number(LikesBooks.totalPages * 10)}
                handleNextPage={(pageNum: number) => {
                  if (LikesBooks.totalPages * 10 > currentPage * 10) {
                    setCurrentPage(pageNum + 1);
                  }
                }}
                handlePrevPage={(pageNum: number) => {
                  if (currentPage > 1) {
                    setCurrentPage(pageNum - 1);
                  }
                }}
              />
            </PaginationWrapper>
          </>
        ) : (
          <p>내가 좋아요한 책이 없습니다</p>
        )}
      </div>
    </S.Section>
  );
};

export default ReviewLike;
