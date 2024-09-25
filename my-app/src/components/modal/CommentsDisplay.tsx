import { CommentGetRes, CommentType } from 'types/commentTypes';
import * as S from 'styles/CommentStyled';
import * as P from 'styles/ProfileStyled';
import { DeleteComment, PatchComment } from 'queries/comment';
import { Button } from 'components/shared';
import { getDateStr } from 'utils';
import { useUserStore } from 'store/useUserStore';

interface CommentToggleProps {
  comments: CommentGetRes | undefined;
  bookId: string;
  page: number;
  take: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CommentToggle = ({ comments, bookId, page, take, setPage }: CommentToggleProps) => {
  const { user } = useUserStore();
  const { mutate: deleteComment, status: deleteStatus } = DeleteComment(bookId);
  const { mutate: patchComment, status: patchStatus } = PatchComment(bookId);
  const totalPages = Math.ceil((comments?.total || 0) / take);
  const handleChangeClick = (commentId: string, oldComment: string) => {
    const newComment = prompt('댓글을 수정하세요', oldComment);
    if (!newComment || newComment === oldComment) return;
    patchComment({ bookId, commentId, comment: newComment });
  };
  const handleDeleteClick = (commentId: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteComment(commentId);
    } else {
      return;
    }
  };
  const handleNextPage = () => {
    if (page < Math.ceil((comments?.total || 0) / take)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };
  return (
    <S.CommentContainer>
      {comments?.data?.map((comment: CommentType, index: number) => {
        return (
          <S.CommentItemContainer key={comment.id} $index={index}>
            <div>
              <S.CommentInfo>
                <P.ProfileWrap>
                  <P.ProfileImgWrap>
                    <P.profileImg
                      src={comment.user.profileImg[0] || '/img/default.png'}
                      alt={'프로필이미지'}
                    />
                  </P.ProfileImgWrap>
                  <span>{comment.user.name}</span>
                </P.ProfileWrap>
                <span>{getDateStr(comment.createdAt)}</span>
              </S.CommentInfo>

              <S.Hr />
              <span>
                <div style={{ marginTop: '6px' }}>{comment.content}</div>
              </span>
            </div>

            {user?.id === comment?.user.id && (
              <S.CommentButtonContainer>
                <Button
                  onClick={() => handleChangeClick(comment.id, comment.content)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  수정
                </Button>
                <Button
                  onClick={() => handleDeleteClick(comment.id)}
                  disabled={patchStatus === 'loading' || deleteStatus === 'loading'}
                >
                  삭제
                </Button>
              </S.CommentButtonContainer>
            )}
          </S.CommentItemContainer>
        );
      })}

      <S.Pagination>
        <S.PaginationButton onClick={handlePrevPage} disabled={page === 1}>
          이전
        </S.PaginationButton>
        {[...Array(totalPages)].map((_, index) => {
          return (
            <S.PaginationButton
              key={index}
              onClick={() => handlePageClick(index + 1)}
              disabled={page === index + 1}
            >
              {index + 1}
            </S.PaginationButton>
          );
        })}
        <S.PaginationButton
          onClick={handleNextPage}
          disabled={page >= Math.ceil((comments?.total || 0) / take)}
        >
          다음
        </S.PaginationButton>
      </S.Pagination>
    </S.CommentContainer>
  );
};

export default CommentToggle;
