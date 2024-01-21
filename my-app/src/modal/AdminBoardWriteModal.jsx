import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState, AtomicBlockUtils } from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Modal from 'react-bootstrap/Modal';
import { useCreateBoard } from '../queries';
import { uploadImage } from '../api/boardApi';
import Input from '../dev5components/dev5UIComponent/Input';
import Button from '../dev5components/dev5UIComponent/Button';

const AdminBoardWriteModal = ({ writeShow, setWriteShow }) => {
  const navigate = useNavigate();
  const { mutateAsync: createBoardMutate, isLoading, error } = useCreateBoard();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const handleClose = () => setWriteShow(false);
  console.log('dev5 editorState ', editorState);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (state) => {
    setEditorState(state);
    setHtmlString(draftjsToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const handleClick = async () => {
    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!htmlString) {
      alert('내용을 입력해주세요.');
      return;
    }
    const data = {
      title: title,
      content: htmlString,
      images: images,
    };
    try {
      await createBoardMutate(data);
      alert('게시글이 등록되었습니다.');
      navigate('/user/dev5');
    } catch (error) {
      alert(error.message);
    }
  };
  const insertImage = (editorState, url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: url });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
  };
  const imageUploadCallBack = (file) => {
    console.log(file);
    if (file.size > 1024 * 1024 * 5) {
      alert('5MB 이하의 이미지만 업로드 가능합니다.');
      return;
    }
    if (!file.type.includes('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    return uploadImage(formData).then((res) => {
      setImages([...images, res.data]);
      let clientUrl = `${process.env.REACT_APP_SERVER_URL}/client/images/api5s/${res.data}`;
      const newEditorState = insertImage(editorState, clientUrl);
      setEditorState(newEditorState);
      return { data: { link: clientUrl } };
    });
  };
  return (
    <Modal show={writeShow} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{'게시판 글 작성하기'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Input
            label="제목"
            type={'text'}
            placeholder={'제목을 입력하세요'}
            name="title"
            text={title}
            onChange={handleTitle}
            size={'100%'}
          />
        </div>
        <Editor
          placeholder="내용을 입력해주세요."
          editorState={editorState}
          onEditorStateChange={handleDescription}
          toolbar={{
            image: {
              uploadCallback: imageUploadCallBack,
              alt: { present: true, mandatory: true },
              previewImage: true,
              urlEnabled: true,
              uploadEnabled: true,
            },
          }}
          editorStyle={{
            width: '100%',
            height: '500px',
            border: `2px solid #ddd`,
            borderRadius: '1rem',
            padding: '10px',
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <S.buttonContainer variant="secondary">
          <Button onClick={handleClose} content={'닫기'} />
        </S.buttonContainer>
        <S.buttonContainer>
          <Button onClick={handleClick} content={'글 게시하기'} disabled={isLoading} />
        </S.buttonContainer>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminBoardWriteModal;

const S = {
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
