import { Fragment, useState } from 'react';
import { GetMyComments } from 'queries/comment';
import AdminPagination from 'components/admin/AdminPagination';
import AdminTable from 'components/admin/AdminTable';
import AdminLayout from 'components/admin/AdminLayout';
import useAdminPagination from 'hooks/useAdminPagination';
import Spinner from 'components/shared/Spinner';
import * as S from 'styles/AdminStyledTemp';
import { Align } from 'styles/common/CommonStyled';
import ReviewModal from './ReviewModal';

AdminLayout;
const MyReview = ({ userId }: { userId: string }) => {
  const { data: reviews, status } = GetMyComments(userId);
  const [review, setReview] = useState({ bookId: '', content: '', id: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const { currentPage, setCurrentPage, handleNextPage, handlePrevPage } = useAdminPagination();
  const setModalReview = (bookId: string, content: string, commentId: string) => {
    setReview({ bookId, content, id: commentId });
    setModalOpen(true);
    unshowScroll();
  };
  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };

  return (
    <AdminLayout title="내 리뷰">
      {status === 'loading' && <Spinner />}
      {status === 'error' && <div>리뷰를 불러오는 중 에러가 발생했습니다.</div>}
      {status === 'success' && reviews && reviews.data.length > 0 ? (
        <Align direction={'column'}>
          <AdminTable headers={['No', '책이름', '리뷰내용', '카테고리', '작성일']}>
            {reviews.data.map((review, index) => (
              <Fragment key={review.id}>
                <S.Trow>
                  <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                  <S.Tcell width={100}>{review.book.title}</S.Tcell>
                  <S.Tcell width={100}>
                    <S.ReviewContent
                      onClick={() => setModalReview(review.bookId, review.content, review.id)}
                    >
                      {review.content}
                    </S.ReviewContent>
                  </S.Tcell>
                  <S.Tcell width={100}>{review.book.category}</S.Tcell>
                  <S.Tcell width={100}>{new Date(review.createdAt).toLocaleString()}</S.Tcell>
                </S.Trow>
              </Fragment>
            ))}
          </AdminTable>
          <S.PaginationWrapper>
            <AdminPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
              total={reviews.total}
            />
          </S.PaginationWrapper>
        </Align>
      ) : (
        <div>리뷰가 없습니다.</div>
      )}
      {modalOpen && (
        <ReviewModal
          setModalOpen={setModalOpen}
          showScroll={showScroll}
          bookId={review.bookId}
          content={review.content}
          commentId={review.id}
        />
      )}
    </AdminLayout>
  );
};

export default MyReview;
