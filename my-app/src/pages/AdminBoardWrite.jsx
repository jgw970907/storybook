import React, { useState } from 'react';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';

import { EditorState, convertToRaw } from 'draft-js';
import draftjsToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { useUserStore } from 'store/useUserStore';
import { usefetch } from '../hooks/usefetch';
import Input from '../dev5components/dev5UIComponent/Input';
import Button from '../dev5components/dev5UIComponent/Button';
const AdminBoardWritePage = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = usefetch();
  const accessToken = useUserStore((state) => state.accessToken);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  console.log('dev5 token ', accessToken);
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
      const responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/api5s`,
        'POST',
        JSON.stringify(data),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        },
      );
      alert('글이 작성되었습니다.');
      navigate('/user/dev5');
    } catch (err) {
      console.log(err);
    }
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
    return fetch('https://ahelios.com/common/image', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((res) => {
        let url = `${res.fileName}`;
        setImages([...images, url]);
        return { data: { link: url } };
      })
      .catch((error) => {
        console.error('에러:', error);
      });
  };
  return (
    <>
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
          height: '1000px',
          border: `2px solid #ddd`,
          borderRadius: '1rem',
          padding: '10px',
        }}
      />
      <S.buttonContainer>
        <Button onClick={handleClick} content={'글 게시하기'} disabled={isLoading} />
      </S.buttonContainer>
    </>
  );
};

export default AdminBoardWritePage;

const S = {
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
