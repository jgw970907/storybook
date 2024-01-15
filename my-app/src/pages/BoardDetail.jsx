import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useGetBoard } from 'pages/admin/dev5/queries';
import { useGetBoardComments } from 'pages/admin/dev5/queries';
import Header from '../components/detailpageComponents/Header';
import Body from '../components/detailpageComponents/Body';
import Comment from '../components/detailpageComponents/Comment';

const BoardDetail = () => {
  const { boardId } = useParams();
  console.log(boardId);
  const { isLoading: boardIsLoading, data: board, error: boardError } = useGetBoard(boardId);
  console.log(board);
  const {
    isLoading: commentsIsLoading,
    data: comments,
    error: commentsError,
  } = useGetBoardComments(boardId);

  if (boardIsLoading || commentsIsLoading) {
    return <div>Loading...</div>;
  }
  if (!board) {
    return <div>게시글이 없습니다.</div>;
  }
  if (board) {
    console.log(board);
  }
  if (boardError || commentsError) {
    return <div>Error...</div>;
  }
  return (
    <div>
      <>
        <Header
          title={board?.title}
          email={board?.author.email}
          nickname={board?.author.nickname}
          likeCount={board?.likeCount}
          createdAt={board?.createdAt}
        />
        <Body content={board?.content} />
      </>

      {comments ? <Comment replies={comments} /> : <div>댓글이 없습니다.</div>}
    </div>
  );
};

export default BoardDetail;
