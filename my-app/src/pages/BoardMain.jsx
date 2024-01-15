import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetBoards } from 'pages/admin/dev5/queries';
import BoardList from '../components/BoardList';
import BoardEmpty from '../components/BoardEmpty';

const BoardMain = () => {
  const { data, error, isLoading } = useGetBoards();
  // const [boards, setBoards] = useState();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <BoardEmpty />;
  }
  return (
    <>
      <S.header>
        <h1>게시판</h1>
        <h3>임시 카테고리</h3>
      </S.header>

      <S.boardHeader>
        <div>번호</div>
        <div>제목</div>
        <div>작성자</div>
        <div>작성일</div>
        <div>조회수</div>
        <div>좋아요</div>
      </S.boardHeader>
      {/* {data?.length !== 0 ? <BoardList boards={data} /> : <BoardEmpty />} */}
      <BoardList boards={data} />
    </>
  );
};

export default BoardMain;

const S = {
  header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  boardHeader: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 0.5fr 0.5fr 0.5fr 0.5fr;
    padding: 1rem;
    border-bottom: 1px solid #000;
  `,
};
