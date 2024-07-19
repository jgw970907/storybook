import { Fragment, useRef, useState } from 'react';
import * as S from 'styles/ModalStyled';
import * as P from 'styles/ProfileStyled';
import {
  useAddLike,
  useRemoveLike,
  useGetBook,
  useGetBookIsLike,
  useGetCommentsForBook,
} from 'queries';
import { useNavigate } from 'react-router-dom';
import useOnclickOutside from 'hooks/useOnclickOutside';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { BookInfoType } from 'types';
import CommentWrite from 'components/modal/CommentWrite';
import CommentsDisplay from 'components/modal/CommentsDisplay';
import { IoIosClose } from 'react-icons/io';
import { useUserStore } from 'store/useUserStore';
import { FaHeart } from 'react-icons/fa';
import NotFoundComment from 'components/shared/NotFoundComment';
import { Loader } from 'components/shared';
import { StyledLoader } from 'styles/LoginStyled';
export const CustomModal = ({
  bookId,
  book,
  setModalOpen,
  showScroll,
}: {
  bookId: string | null;
  book: BookInfoType | undefined;
  setModalOpen: (open: boolean) => void;
  showScroll: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnclickOutside(ref, () => {
    setModalOpen(false);
    showScroll();
  });
  if (!bookId) return <div>loading...</div>;
  const { isLogin, user } = useUserStore();

  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const take = 5;
  const [page, setPage] = useState(1);
  const imagesCount = book?.images.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: comments, status: commentStatus } = useGetCommentsForBook(bookId, {
    page,
    take,
  });
  useGetBook(bookId);
  const { data: bookIsLikeData, status } = useGetBookIsLike(bookId, user?.id || '');
  const { mutate: addLike } = useAddLike({ bookId: bookId });
  const { mutate: removeLike } = useRemoveLike({ bookId: bookId });
  function formatDate(timestamp: string) {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    return formattedDate;
  }
  const handlePrevClick = () => {
    if (imagesCount) {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        setCurrentIndex(imagesCount - 1);
      }
    }
  };
  const handleNextClick = () => {
    if (imagesCount) {
      if (currentIndex < imagesCount - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
      showScroll();
    }
  };
  const toggleLike = () => {
    if (!user?.id) {
      alert('사용자 정보를 불러오지 못했습니다. 다시 로그인해주세요.');
      setModalOpen(false);
      showScroll();
      navigate('/login');
      return;
    }

    setIsUpdating(true);
    if (bookIsLikeData?.isLike) {
      removeLike(
        { bookId, userId: user.id },
        {
          onSettled: () => {
            setIsUpdating(false);
          },
        },
      );
    } else {
      addLike(
        { bookId, userId: user.id },
        {
          onSettled: () => {
            setIsUpdating(false);
          },
        },
      );
    }
  };

  if (status === 'error') return <div>error...</div>;
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

          {book?.images[0] && (
            <S.ModalPosterContainer>
              {' '}
              <S.ModalImgAndCotent>
                <S.ModalPosterImgContainer>
                  <S.ImageBtn onClick={handlePrevClick}>
                    <FcPrevious />
                  </S.ImageBtn>
                  <S.ModalPosterImg src={`${book.images[currentIndex].path}`} alt="modal-img" />
                  <S.ImageBtn onClick={handleNextClick}>
                    <FcNext />
                  </S.ImageBtn>

                  <S.HeartButton
                    onClick={toggleLike}
                    $liked={bookIsLikeData?.isLike}
                    $status={status}
                    disabled={isUpdating}
                  >
                    <FaHeart />
                  </S.HeartButton>
                  <S.ImagePointerWrapper>
                    {book?.images.map((image, index) => (
                      <Fragment key={index}>
                        <S.ImagePointer currentIndex={currentIndex} index={index}>
                          <img src={image.path} />
                        </S.ImagePointer>
                      </Fragment>
                    ))}
                  </S.ImagePointerWrapper>
                </S.ModalPosterImgContainer>
                <S.ModalContent>
                  <S.ModalTitle>{book?.title}</S.ModalTitle>
                  <S.ModalOverview>
                    {book?.user?.name ? (
                      <P.ProfileWrap>
                        <P.ProfileImgWrap>
                          <P.profileImg
                            src={book.user.profileImg[0] || '/img/default.png'}
                            alt={'프로필이미지'}
                          />
                        </P.ProfileImgWrap>
                        <span>{book.user.name}</span>
                      </P.ProfileWrap>
                    ) : (
                      ''
                    )}
                  </S.ModalOverview>
                  <S.ModalOverview>
                    {book?.authorName ? `작가이름: ${book?.authorName}` : ''}
                  </S.ModalOverview>
                  <S.ModalOverview>
                    {book?.category ? `카테고리: ${book?.category}` : ''}
                  </S.ModalOverview>
                  <S.ModalOverview>클릭수: {book?.clicks}</S.ModalOverview>
                  <S.ModalOverview>
                    좋아요:{' '}
                    {status === 'loading' && isLogin ? (
                      <StyledLoader $size={'10px'} />
                    ) : isLogin ? (
                      bookIsLikeData?.likeCount
                    ) : (
                      book?.likeCount
                    )}
                  </S.ModalOverview>

                  <S.ModalOverview>
                    등록날짜: {'  '}
                    {book && formatDate(book.createdAt)}
                  </S.ModalOverview>
                </S.ModalContent>
              </S.ModalImgAndCotent>
              <S.ModalSubject>책 소개</S.ModalSubject>
              <S.ModalIntroduce>{book?.content}</S.ModalIntroduce>
              <S.CommentContainer>
                <S.ModalSubject>한줄리뷰</S.ModalSubject>
                {commentStatus === 'loading' ? (
                  <Loader custom={true} />
                ) : (comments?.data ?? []).length > 0 ? (
                  <>
                    <CommentsDisplay
                      page={page}
                      take={take}
                      setPage={setPage}
                      comments={comments}
                      bookId={book?.id}
                    />
                  </>
                ) : (
                  <NotFoundComment />
                )}
                <CommentWrite bookId={book?.id} />
              </S.CommentContainer>
            </S.ModalPosterContainer>
          )}
        </S.Modal>
      </S.WrapperModal>
    </S.Presentation>
  );
};

export default CustomModal;
