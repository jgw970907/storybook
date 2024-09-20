import { useMemo, useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { postEditorImage } from 'api/imageapi';
import { Button } from 'styles/SearchStyled';
import { useChangeStoryWithGpt, useAppendStoryContent } from 'queries/gpt';
import { patchStoryContent } from 'api/gpt';
import { TextArea } from 'pages/user/GptPromptPage';
export const GptTextEditor = ({
  story,
  setStory,
  setErrorText,
  storyId,
  handleUpload,
  uploadLoading,
}: {
  story: string | undefined;
  setStory: (story: string) => void;
  setErrorText: (errorText: string) => void;
  storyId?: string;
  handleUpload: () => void;
  uploadLoading: boolean;
}) => {
  const { mutate: appendMutate, status: appendStatus } = useAppendStoryContent();
  const { mutate: changeMutate, status: changeStatus } = useChangeStoryWithGpt();
  const quillRef = useRef<ReactQuill>(null);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [userRequest, setUserRequest] = useState('');

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('editorImage', file);
        const res = await postEditorImage(formData);
        console.log('Image upload response:', res); // 디버깅을 위한 로그 추가
        const range = quillRef.current?.getEditor().getSelection()?.index;
        console.log('Current selection range:', range); // 디버깅을 위한 로그 추가
        if (range !== null && range !== undefined) {
          quillRef.current?.getEditor().insertEmbed(range, 'image', res.imagePath);
          console.log('Image inserted at range:', range); // 디버깅을 위한 로그 추가
        }
      }
    };
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selected = selection?.toString();

    if (selected && selection) {
      setSelectedText(selected);
      setShowPopup(true);

      // 선택한 텍스트의 위치 가져오기
      const range = selection.getRangeAt(0);
      const { top, left } = range.getBoundingClientRect();
      setPopupPosition({ top: top + window.scrollY + 20, left: left + window.scrollX });
    } else {
      setSelectedText(null);
      setShowPopup(false);
    }
  };
  // `ReactQuill`의 내부 DOM에 `onMouseUp` 이벤트 리스너 추가
  useEffect(() => {
    const quillEditor = quillRef.current?.getEditor();
    const editorContainer = quillEditor?.root;

    if (editorContainer) {
      editorContainer.addEventListener('mouseup', handleTextSelection);
    }

    return () => {
      if (editorContainer) {
        editorContainer.removeEventListener('mouseup', handleTextSelection);
      }
    };
  }, []);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
          [{ color: ['red', 'blue', 'green'] }, { background: ['gray', 'yellow'] }],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const handleSaveContent = async () => {
    if (!story) {
      setErrorText('내용을 입력하세요');
      return;
    }
    setSaveLoading(true);
    try {
      await patchStoryContent(storyId || '', story);
    } catch (error) {
      alert('스토리 변경 중 에러가 발생했습니다: ${error.message}');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleGptRequest = async () => {
    if (selectedText) {
      changeMutate(
        { userText: selectedText, userRequest: userRequest, storyId: storyId || '' },
        {
          onSuccess: (res) => {
            const modifiedText = res?.content;

            if (modifiedText && story) {
              setStory(story.replace(selectedText, modifiedText));
            }
          },
        },
      );
    }
    setSelectedText(null);
    setUserRequest('');
    setShowPopup(false);
  };
  const handleAppendContent = async () => {
    await handleSaveContent();
    appendMutate(
      { storyId: storyId || '', userRequest: userRequest },
      {
        onSuccess: (res) => {
          const appendedText = res?.content;
          if (appendedText) {
            setStory(story + appendedText);
          }
        },
      },
    );
  };
  return (
    <Container>
      <StyledQuill
        ref={quillRef}
        onChange={setStory}
        theme="snow"
        value={story}
        modules={modules}
        placeholder="내용을 입력하세요"
        style={{ height: '1000px', marginBottom: '50px' }}
      />
      <BtnWrap>
        <Button
          btncolortype="primary"
          onClick={handleSaveContent}
          disabled={
            appendStatus === 'loading' || changeStatus === 'loading' || saveLoading || uploadLoading
          }
        >
          저장하기
        </Button>
        <Button
          btncolortype="danger"
          onClick={handleAppendContent}
          disabled={
            appendStatus === 'loading' || changeStatus === 'loading' || saveLoading || uploadLoading
          }
        >
          Gpt로 생성
        </Button>
        <Button
          btncolortype="success"
          onClick={handleUpload}
          disabled={
            appendStatus === 'loading' || changeStatus === 'loading' || saveLoading || uploadLoading
          }
        >
          게시하기
        </Button>
      </BtnWrap>
      {showPopup && popupPosition && (
        <div
          style={{
            position: 'absolute',
            top: popupPosition.top,
            left: popupPosition.left,
            background: 'white',
            border: '1px solid black',
            padding: '30px',
            borderRadius: '10px',
          }}
        >
          <TextArea
            placeholder="User Prompt"
            value={userRequest}
            onChange={(e) => setUserRequest(e.target.value)}
            height="100px"
          />
          <Button
            btncolortype="primary"
            onClick={handleGptRequest}
            disabled={
              changeStatus === 'loading' ||
              appendStatus === 'loading' ||
              saveLoading ||
              uploadLoading
            }
          >
            GPT로 요청하기
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 40px;
  margin-bottom: 20px;
`;
const StyledQuill = styled(ReactQuill)`
  .ql-editor img {
    width: 50%;
    height: auto;
    position: relative;
    margin-left: 25%;
    margin-right: 25%;
  }
`;
