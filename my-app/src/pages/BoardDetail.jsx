import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import secureLocalStorage from "react-secure-storage";

import { useGetBoard } from "pages/admin/dev5/queries";
import { useGetBoardComments } from "pages/admin/dev5/queries";
import Header from "../components/detailpageComponents/Header";
import Body from "../components/detailpageComponents/Body";
import Comment from "../components/detailpageComponents/Comment";
import CommentWrite from "../components/detailpageComponents/CommentWrite";
import DeleteOrUpdateButton from "../components/detailpageComponents/DeleteOrUpdateButton";

const BoardDetail = () => {
  const { boardId } = useParams();
  console.log(boardId);
  const {
    isLoading: boardIsLoading,
    data: board,
    error: boardError,
  } = useGetBoard(boardId);
  console.log(board);
  const {
    isLoading: commentsIsLoading,
    data: comments,
    error: commentsError,
  } = useGetBoardComments(boardId);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = secureLocalStorage.getItem("USER_INFO");
    console.log(user);

    if (user) {
      const { email } = JSON.parse(user);
      if (email === board?.author.email) {
        setIsAdmin(true);
      }
    }
  }, [boardId]);
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
  if (comments) {
    console.log(comments);
  }

  return (
    <div>
      <S.container>
        <S.titleContainer>
          <S.title>제목: {board?.title}</S.title>
          <S.deleteOrUpdateButton>
            <DeleteOrUpdateButton isAdmin={isAdmin} />
          </S.deleteOrUpdateButton>
        </S.titleContainer>

        <Header
          email={board?.author.email}
          nickname={board?.author.nickname}
          likeCount={board?.likeCount}
          replyCount={board?.reply5Count}
          createdAt={board?.createdAt}
        />
        <Body content={board?.content} />
      </S.container>

      {comments ? <Comment replies={comments} /> : <div>댓글이 없습니다.</div>}
      <CommentWrite boardId={boardId} />
    </div>
  );
};

export default BoardDetail;

const S = {
  container: styled.div`
    border: 2px solid #000;
    border-radius: 5px;
    min-width: 800px;
  `,
  titleContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2rem;
    border-bottom: 2px solid #000;
  `,
  title: styled.div`
    font-size: 2rem;
    font-weight: bold;
  `,
  deleteOrUpdateButton: styled.div`
    margin-right: 2rem;
  `,
};
