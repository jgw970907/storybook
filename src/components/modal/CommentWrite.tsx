import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from 'components/shared/Button';
import { getStyledColor } from 'utils';
import { PostComment } from 'queries/comment';
import { useUserStore } from 'store/useUserStore';

interface CommentWriteProps {
  bookId: string | undefined;
}

const CommentWrite: React.FC<CommentWriteProps> = ({ bookId }) => {
  const { isLogin, user } = useUserStore();
  const [comment, setComment] = useState<string>('');
  if (bookId === undefined) return null;
  const { mutate, status } = PostComment(bookId, user);

  const onChangeComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const onHandleClick = async () => {
    if (!comment) {
      alert('댓글을 입력해주세요.');
      return;
    }
    mutate(comment);
    setComment('');
  };

  return (
    <S.container>
      <S.textArea
        placeholder={isLogin ? '한줄리뷰를 작성하세요!' : '로그인 후 작성 가능합니다.'}
        name="reply5"
        value={comment}
        onChange={onChangeComment}
      />
      <S.buttonContainer>
        {isLogin && (
          <Button onClick={onHandleClick} color={'blue'} disabled={status === 'loading'}>
            댓글등록
          </Button>
        )}
      </S.buttonContainer>
    </S.container>
  );
};

export default CommentWrite;

const S = {
  container: styled.div`
    border-radius: 4px;
    padding: 10px 20px;
    display: flex;
    gap: 20px;
  `,
  textArea: styled.textarea`
    width: 100%;
    height: 70px;
    resize: none;
    border: 1px solid ${getStyledColor('cool_gray', 500)};
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
