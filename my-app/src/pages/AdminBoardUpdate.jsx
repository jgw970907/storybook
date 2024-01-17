import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { useNavigate } from "react-router-dom";
import {
  EditorState,
  convertToRaw,
  ContentState,
  AtomicBlockUtils,
} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftjsToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { useGetBoard, usePatchBoard } from "../queries";
import { uploadImage } from "../api/boardApi";
import Input from "../dev5components/dev5UIComponent/Input";
import Button from "../dev5components/dev5UIComponent/Button";

const AdminBoardUpdate = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading: boardIsLoading,
    data: board,
    error: boardError,
  } = useGetBoard(boardId);
  const {
    mutateAsync: patchBoard,
    isLoading: updateLoading,
    error: updateError,
  } = usePatchBoard();
  // let draft = htmlToDraft(board?.content);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [htmlString, setHtmlString] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  // useEffect(() => {
  //   setTitle(board?.title || '');
  //   let ImagePath = `${process.env.REACT_APP_SERVER_URL}${board?.images[0]?.path}`;
  //   setImages([ImagePath]);
  //   const blocksFromHtml = htmlToDraft(board?.content || '');
  //   if (blocksFromHtml) {
  //     const { contentBlocks, entityMap } = blocksFromHtml;
  //     const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  //     setEditorState(EditorState.createWithContent(contentState));
  //   }
  // }, []);
  if (boardIsLoading) {
    return <div>Loading...</div>;
  }

  console.log("dev5 editorState ", editorState);
  console.log(title);
  console.log(htmlString);
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (state) => {
    setEditorState(state);
    const currentContent = state.getCurrentContent();
    const newHtmlString = draftjsToHtml(convertToRaw(currentContent));
    setHtmlString(newHtmlString);
  };
  const handleClick = async () => {
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!htmlString) {
      alert("내용을 입력해주세요.");
      return;
    }

    try {
      await patchBoard(boardId, { title, content: htmlString, images });
      alert("수정이 완료되었습니다.");
      navigate("/admin/dev5/admin/board-wrote");
    } catch (error) {
      alert(error.message);
    }
  };
  const insertImage = (editorState, url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
  const imageUploadCallBack = (file) => {
    console.log(file);
    if (file.size > 1024 * 1024 * 5) {
      alert("5MB 이하의 이미지만 업로드 가능합니다.");
      return;
    }
    if (!file.type.includes("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    return uploadImage(formData).then((res) => {
      setImages([...images, res.data]);
      let clientUrl = `${process.env.REACT_APP_SERVER_URL}/client/images/api5s/${res.data}`;
      const newEditorState = insertImage(editorState, clientUrl);
      setEditorState(newEditorState);
      return { data: { link: clientUrl } };
    });
  };
  return (
    <>
      <div>
        <Input
          label="제목"
          type={"text"}
          placeholder={"제목을 입력하세요"}
          name="title"
          text={title}
          onChange={handleTitle}
          size={"100%"}
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
          width: "100%",
          height: "500px",
          border: `2px solid #ddd`,
          borderRadius: "1rem",
          padding: "10px",
        }}
      />
      <S.buttonContainer>
        <Button
          onClick={handleClick}
          content={"글 수정하기"}
          disabled={updateLoading}
        />
      </S.buttonContainer>
    </>
  );
};

export default AdminBoardUpdate;

const S = {
  buttonContainer: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};
