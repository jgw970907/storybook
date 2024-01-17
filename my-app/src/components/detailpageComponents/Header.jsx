import React from 'react';
import styled from 'styled-components';
const Header = ({ email, nickname, likeCount, createdAt, replyCount }) => {
  return (
    <S.container>
      <S.infoContainer>
        <S.email>이메일:{email}</S.email>
        <S.nickname>닉네임:{nickname}</S.nickname>
        <S.likeCount>좋아요:{likeCount}</S.likeCount>
        <S.replyCount>댓글:{replyCount}</S.replyCount>
        <S.createdAt>{createdAt}</S.createdAt>
      </S.infoContainer>
    </S.container>
  );
};

export default Header;

const S = {
  container: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #000;
  `,

  infoContainer: styled.div`
    height: 100px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-auto-flow: column;
    align-items: center;
    box-sizing: border-box;
  `,

  email: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
  nickname: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
  likeCount: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
  createdAt: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
  replyCount: styled.div`
    font-size: 1rem;
    padding: 1rem;
  `,
};
