import React from 'react';
import styled from 'styled-components';
import BoardItem from './BoardItem';

const BoardList = ({ boards }) => {
  return (
    <S.container>
      {boards?.map((boardItem) => {
        return <BoardItem key={boardItem.id} boardItem={boardItem} />;
      })}
    </S.container>
  );
};

export default BoardList;
const S = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
  `,
};
