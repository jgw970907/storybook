import { Fragment, useState } from 'react';
import useAdminPagination from 'hooks/useAdminPagination';
import * as S from 'styles/AdminStyledTemp';
import { DeleteCommentByRole, GetComments } from 'queries/comment';
import styled from 'styled-components';
import { Loader } from 'components/shared';
import { MdOutlineSearch } from 'react-icons/md';
import { useUserStore } from 'store/useUserStore';
import AdminPagination from 'components/admin/AdminPagination';
import AdminLayout from 'components/admin/AdminLayout';
import AdminTable from 'components/admin/AdminTable';
import AdminManageBannedWords from 'components/admin/AdminManageBannedWords';

const take = 10;

const AdminManageReviews = () => {
  const { currentPage, setCurrentPage, handleNextPage, handlePrevPage } = useAdminPagination();
  const { user } = useUserStore();
  const userId = user?.id || '';
  const { data, isLoading } = GetComments(currentPage, take);
  const { mutate: deleteCommentByRole } = DeleteCommentByRole(userId);

  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const comments = data?.data;
  const totalComments = data?.total;

  const handleDelete = (commentId: string) => {
    if (userId) {
      deleteCommentByRole(commentId);
    }
  };

  const toggleDetail = (id: string) => {
    setSelectedReviewId((prevId) => (prevId === id ? null : id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <FlexAlign>
      <AdminManageBannedWords />
      <AdminLayout title="리뷰 관리">
        <AdminTable headers={['No', '책이름', '댓글수', '상세보기']}>
          {comments?.map((comment, index) => (
            <Fragment key={comment.commentId}>
              <S.Trow>
                <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                <S.Tcell width={100}>{comment.bookTitle}</S.Tcell>
                <S.Tcell width={100}>{comment.total}</S.Tcell>
                <S.Tcell width={100}>
                  {comment.total > 0 && (
                    <MdOutlineSearch onClick={() => toggleDetail(comment.commentId)} />
                  )}
                </S.Tcell>
              </S.Trow>
            </Fragment>
          ))}
        </AdminTable>

        <S.PaginationWrapper>
          {totalComments ? (
            <AdminPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              total={totalComments}
              handleNextPage={handleNextPage}
              handlePrevPage={handlePrevPage}
            />
          ) : (
            <NoCommentsMessage>댓글이 없습니다.</NoCommentsMessage>
          )}
        </S.PaginationWrapper>
      </AdminLayout>

      {selectedReviewId && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={() => setSelectedReviewId(null)}>&times;</CloseButton>
            {comments
              ?.find((comment) => comment.commentId === selectedReviewId)
              ?.commentArray.map((comment) => (
                <CommentCard key={comment.id}>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentInfo>
                    <InfoItem>
                      <Label>작성일:</Label> {new Date(comment.createdAt).toLocaleString()}
                    </InfoItem>
                    <InfoItem>
                      <Label>수정일:</Label> {new Date(comment.updatedAt).toLocaleString()}
                    </InfoItem>
                  </CommentInfo>
                  <DeleteButton onClick={() => handleDelete(comment.id)}>삭제</DeleteButton>
                </CommentCard>
              ))}
          </ModalContent>
        </Modal>
      )}
    </FlexAlign>
  );
};

export default AdminManageReviews;

const FlexAlign = styled.div`
  display: flex;
  gap: 20px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  float: right;
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
`;

const CommentCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  width: 100%;
`;

const CommentContent = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  line-height: 1.5;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  font-size: 14px;
  color: #666;
`;

const InfoItem = styled.span`
  display: flex;
  align-items: center;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;

  &:hover {
    background-color: #ff7875;
  }
`;

const NoCommentsMessage = styled.div`
  text-align: center;
  color: #666;
`;
