import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useGetBoard, useGetBoardComments } from '../queries';
import CommentWrite from 'pages/user/dev5/components/detailpageComponents/CommentWrite';
const AdminBoardModal = ({ show, setShow, boardId }) => {
  if (boardId === null) return null;
  const navigate = useNavigate();
  const { isLoading, data: board, error, refetch: refetchBoard } = useGetBoard(boardId);
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
        {comments?.map((comment) => (
          <div key={comment.id}>
            <h5>{comment.reply5}</h5>
          </div>
        ))}
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
