import React, { useState } from "react";
import styled from "styled-components";
import { useCreateBoardComment } from "pages/admin/dev5/queries";
import Button from "pages/admin/dev5/dev5components/dev5UIComponent/Button";
import { getStyledColor } from "utils";
const CommentWrite = ({ boardId }) => {
  if (boardId === null) return null;
  const {
    mutateAsync: createBoardComment,
    isLoading,
    error,
  } = useCreateBoardComment(boardId);
  const [comment, setComment] = useState({
    reply5: "",
  });
  const onChangeComment = (e) => {
    const { name, value } = e.target;
    setComment({
      ...comment,
      [name]: value,
    });
    console.log(comment);
  };
  const onHandleClick = async () => {
    if (!comment.reply5) {
      alert("댓글을 입력해주세요.");
      return;
    }
    try {
      await createBoardComment({ boardId, comment });
      alert("댓글이 등록되었습니다.");
    } catch (error) {
      alert(error.message);
    }
    setComment({
      reply5: "",
    });
  };

  return (
    <S.container>
      <S.textArea
        placeholder="댓글을 작성하세요!"
        name={"reply5"}
        value={comment.reply5}
        onChange={onChangeComment}
      />
      <S.buttonContainer>
        <Button
          content={"댓글 등록"}
          onClick={onHandleClick}
          size={"30px"}
          disabled={isLoading}
        />
      </S.buttonContainer>
    </S.container>
  );
};

export default CommentWrite;
const S = {
  container: styled.div`
    background-color: ${getStyledColor("blue", 500)};
    border-radius: 4px;
    padding: 10px 20px;
    box-shadow: 1px 1px 4px 2px ${getStyledColor("cool_gray", 500)};
  `,
  textArea: styled.textarea`
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 1px solid ${getStyledColor("cool_gray", 500)};
    padding: 1rem;
    box-sizing: border-box;
    border-radius: 5px;
  `,
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
