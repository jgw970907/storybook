import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const BoardItem = ({ boardItem }) => {
  const dateChange = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
    const second = newDate.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };
  return (
    <S.boardItemContainer>
      <div>{boardItem?.id}</div>
      <Link to={`./board/${boardItem?.id}`}>
        <div>{boardItem?.title}</div>
      </Link>
      <div>{boardItem?.author?.nickname}</div>
      <div>{dateChange(boardItem?.createdAt)}</div>
      <div>{boardItem?.cursor}</div>
      <div>{boardItem?.likeCount}</div>
    </S.boardItemContainer>
  );
};

export default BoardItem;
const S = {
  boardItemContainer: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 0.5fr 0.5fr 0.5fr 0.5fr;
    border-bottom: 1px solid #e9ecef;
    padding: 1rem;
    align-items: center;
  `,
};
