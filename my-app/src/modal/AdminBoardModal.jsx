import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import {
  useGetBoard,
  useGetBoardComments,
  useDeleteBoardComment,
  usePatchBoardComment,
} from "../queries";
import CommentWrite from "pages/user/dev5/components/detailpageComponents/CommentWrite";
import { CommentButton, ButtonContainer } from "../styles/detailPageStyled";
import { useUserStore } from "store/useUserStore";
const AdminBoardModal = ({ show, setShow, boardId }) => {
  if (boardId === null) return null;
  const navigate = useNavigate();
  const {
    isLoading,
    data: board,
    error,
    refetch: refetchBoard,
  } = useGetBoard(boardId);
  const { mutateAsync: deleteCommentMutate } = useDeleteBoardComment(boardId);
  const { mutateAsync: patchCommentMutate } = usePatchBoardComment(boardId);
  const { user } = useUserStore();
  const {
    isLoading: commentLoading,
    data: comments,
    error: commentError,
    refetch: refetchComments,
  } = useGetBoardComments(boardId);

  useEffect(() => {
    if (show && boardId !== null) {
      refetchBoard();
      refetchComments();
    }
  }, [show, boardId, refetchBoard, refetchComments]);

  const handleClose = () => setShow(false);
  const onClickPatchComment = async (commentId, oldComment) => {
    const comment = prompt("댓글을 수정해주세요.", oldComment);
    if (comment === oldComment) return alert("수정된 내용이 없습니다.");
    if (comment === null) return alert("수정이 취소되었습니다.");
    const data = {
      reply5: comment,
    };
    try {
      const response = await patchCommentMutate({ boardId, commentId, data });
      if (response.status === 200) {
        alert("댓글이 수정되었습니다.");
        refetchComments();
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const onClickDeleteComment = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await deleteCommentMutate({ boardId, commentId });
        alert("댓글이 삭제되었습니다.");
        refetchComments();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  if (boardId === null) return null;
  if (isLoading || commentLoading) return <div>loading...</div>;
  if (error || commentError) return <div>error...</div>;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{board?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div dangerouslySetInnerHTML={{ __html: board?.content }}></div>
        <hr />
        <FlexColumn>
          {comments?.map((comment) => (
            <div key={comment.id}>
              <span>작성자: {comment.author.nickname}</span>
              <FlexRow>
                <span>{comment.reply5}</span>

                <ButtonContainer>
                  {user?.nickname === comment?.author?.nickname && (
                    <CommentButton
                      onClick={() =>
                        onClickPatchComment(comment.id, comment.reply5)
                      }
                    >
                      수정
                    </CommentButton>
                  )}
                  <CommentButton
                    onClick={() => onClickDeleteComment(comment.id)}
                  >
                    삭제
                  </CommentButton>{" "}
                </ButtonContainer>
              </FlexRow>
            </div>
          ))}{" "}
        </FlexColumn>
        <hr />
        <CommentWrite boardId={boardId} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate(`/admin/dev5/admin/board-update/${boardId} `)}
        >
          글 수정하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminBoardModal;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
`;
