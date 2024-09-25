import * as S from 'styles/ModalStyled';
import { IoIosClose } from 'react-icons/io';
import { CommentButtonContainer } from 'styles/CommentStyled';
import { Button } from 'components/shared';
import { DeleteComment, PatchComment } from 'queries/comment';
import { useState } from 'react';
const ReviewModal = ({
  setModalOpen,
  showScroll,
  bookId,
  commentId,
  content,
}: {
  setModalOpen: (value: boolean) => void;
  showScroll: () => void;
  content: string;
  commentId: string;
  bookId: string;
}) => {
  const [newReview, setNewReview] = useState(content);
  const { mutate: deleteComment, status: deleteStatus } = DeleteComment(bookId);
  const { mutate: patchComment, status: patchStatus } = PatchComment(bookId);
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      showScroll();
    }
  };
  const handleChangeClick = (commentId: string, newReview: string) => {
    const newComment = prompt('댓글을 수정하세요', newReview);
    if (!newComment || newComment === newReview) return;

    patchComment(
      { bookId, commentId, comment: newComment },
      {
        onSuccess: () => {
          setNewReview(newComment);
        },
      },
    );
  };
  const handleDeleteClick = (commentId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteComment(commentId, {
        onSuccess: () => {
          setModalOpen(false);
          showScroll();
        },
      });
    } else {
      return;
    }
  };
  return (
    <S.Presentation>
      <S.WrapperModal onClick={handleOutsideClick}>
        <S.Modal>
          <S.ModalClose
            onClick={() => {
              setModalOpen(false);
              showScroll();
            }}
          >
            <IoIosClose />
          </S.ModalClose>
          <S.ModalPosterContainer>
            <S.ModalContent>
              <S.ModalTitle>리뷰 내용</S.ModalTitle>
              <S.ModalIntroduce>{newReview}</S.ModalIntroduce>
            </S.ModalContent>
            <S.CommentContainer>
              <CommentButtonContainer>
                <Button
                  onClick={() => handleChangeClick(commentId, content)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleDeleteClick(commentId)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  삭제
                </Button>
              </CommentButtonContainer>
            </S.CommentContainer>
          </S.ModalPosterContainer>
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};

export default ReviewModal;
