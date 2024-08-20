import { Fragment, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import useAdminManage from 'hooks/useAdminManage';
import * as S from 'styles/AdminStyledTemp';
import { useDeleteCommentByRole, useGetComments } from 'queries/comment';
import styled from 'styled-components';
import { Loader } from 'components/shared';
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io';
import { getDateStr } from 'utils';
import { CommentsType } from 'types/commentTypes';
import AdminManageBannedWords from 'components/admin/AdminManageBannedWords';
import { useUserStore } from 'store/useUserStore';
const take = 10;

const AdminManageReviews = () => {
  const { currentPage, handleNextPage } = useAdminManage();
  const { user } = useUserStore();
  const userId = user?.id || '';
  const { data, status, isLoading } = useGetComments(currentPage, take);
  const { mutate: deleteCommentByRole } = useDeleteCommentByRole(userId);

  const handleDelete = (commentId: string) => {
    if (userId) {
      deleteCommentByRole(commentId);
    }
  };
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const comments = data?.data;
  const totalComments = data?.total;

  const toggleDetail = (id: string) => {
    if (selectedReviewId === id) {
      setSelectedReviewId(null);
    } else {
      setSelectedReviewId(id);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlexAlign>
      <AdminManageBannedWords />
      <S.Layout>
        <S.Container>
          <S.ContainerHeader>
            <S.ContainerTitle>댓글 목록</S.ContainerTitle>
          </S.ContainerHeader>
          <S.Table>
            <S.Theader>
              <S.Trow>
                <S.Tcolumn>No.</S.Tcolumn>
                <S.Tcolumn>책이름</S.Tcolumn>
                <S.Tcolumn>댓글수</S.Tcolumn>
                <S.Tcolumn>상세보기</S.Tcolumn>
              </S.Trow>
            </S.Theader>
            <S.Tbody>
              {status === 'success' &&
                comments?.map((comment: CommentsType, index: number) => (
                  <Fragment key={comment.commentId}>
                    <S.Trow>
                      <S.Tcell width={30}>{index + 1}</S.Tcell>
                      <S.Tcell>{comment.bookTitle}</S.Tcell>
                      <S.Tcell>{comment.commentArray.length}</S.Tcell>
                      <S.Tcell>
                        {selectedReviewId === comment.commentId ? (
                          <IoIosArrowDropupCircle
                            size={24}
                            onClick={() => toggleDetail(comment.commentId)}
                          />
                        ) : (
                          <IoIosArrowDropdownCircle
                            size={24}
                            onClick={() => toggleDetail(comment.commentId)}
                          />
                        )}
                      </S.Tcell>
                    </S.Trow>
                    {selectedReviewId === comment.commentId && (
                      <S.Trow>
                        <S.Tcell colSpan={5}>
                          {comment.commentArray.map((data) => (
                            <Wrapper key={data.id}>
                              <p>ID: {data.id}</p>
                              <p>내용: {data.content}</p>
                              <p>작성일: {getDateStr(data.createdAt)}</p>
                              <S.Button onClick={() => handleDelete(data.id)}>Delete</S.Button>
                            </Wrapper>
                          ))}
                        </S.Tcell>
                      </S.Trow>
                    )}
                  </Fragment>
                ))}
            </S.Tbody>
          </S.Table>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            {totalComments ? (
              <S.Pagination>
                <S.PaginationButton disabled={currentPage === 1}>
                  <FaAngleLeft onClick={() => handleNextPage(currentPage - 1)} />
                </S.PaginationButton>
                <div>
                  {Array.from({ length: Math.ceil(totalComments / take) }, (_, index) => (
                    <S.PaginationNumber
                      key={index}
                      onClick={() => handleNextPage(index + 1)}
                      $isCurrentPage={currentPage === index + 1}
                    >
                      {index + 1}
                    </S.PaginationNumber>
                  ))}
                </div>
                <S.PaginationButton disabled={currentPage >= Math.ceil(totalComments / take)}>
                  <FaAngleRight onClick={() => handleNextPage(currentPage + 1)} />
                </S.PaginationButton>
              </S.Pagination>
            ) : (
              <>
                <div>댓글이 없습니다.</div>
              </>
            )}
          </div>
        </S.Container>
      </S.Layout>
    </FlexAlign>
  );
};

export default AdminManageReviews;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e9e9e9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
`;
const FlexAlign = styled.div`
  display: flex;
  gap: 10px;
`;
