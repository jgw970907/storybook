import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import secureLocalStorage from "react-secure-storage";

import { useGetBoard } from "pages/admin/dev5/queries";
import { useGetBoardComments } from "pages/admin/dev5/queries";
import { getCustomData } from "pages/admin/dev5/utils/getCustomDate";

import Header from "../components/detailpageComponents/Header";
import Body from "../components/detailpageComponents/Body";
import Comment from "../components/detailpageComponents/Comment";
import CommentWrite from "../components/detailpageComponents/CommentWrite";
import DeleteOrUpdateButton from "../components/detailpageComponents/DeleteOrUpdateButton";
import { StyledLoader, Container } from "../../../admin/dev5/styles/styled";
import * as S from "../../../admin/dev5/styles/detailPageStyled";
const BoardDetail = () => {
  const { boardId } = useParams();
  const { user } = useUserStore();
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

  if (boardIsLoading || commentsIsLoading) {
    return (
      <div>
        <StyledLoader />
      </div>
    );
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
    <S.Flex>
      <Container>
        <S.TtileContainer>
          <S.Title>제목: {board?.title}</S.Title>
          <S.ButtonContainer>
            {user?.email === board?.author?.email && <DeleteOrUpdateButton />}
          </S.ButtonContainer>
        </S.TtileContainer>

        <Header
          email={board?.author.email}
          nickname={board?.author.nickname}
          likeCount={board?.likeCount}
          replyCount={board?.reply5Count}
          createdAt={getCustomData(board?.createdAt)}
        />
        <Body content={board?.content} />
      </Container>

      {comments ? (
        <Comment replies={comments} user={user} />
      ) : (
        <div>댓글이 없습니다.</div>
      )}
      <CommentWrite boardId={boardId} />
    </S.Flex>
  );
};

export default BoardDetail;
