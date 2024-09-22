import { useMemo, useState, useRef, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { postEditorImage } from 'api/imageapi';
import { Button } from 'styles/SearchStyled';
import { useChangeStoryWithGpt, useAppendStoryContent } from 'queries/gpt';
import { patchStoryContent } from 'api/gpt';
import { TextArea } from 'pages/user/GptPromptPage';
import Spinner from 'components/shared/Spinner';
import { getStyledColor } from 'utils';
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
  const [isFocused, setIsFocused] = useState(false);
  const [editorFocused, setEditorFocused] = useState(false);
  const [prevStory, setPrevStory] = useState<string | undefined>(story);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleEditorFocus = () => setEditorFocused(true);
  const handleEditorBlur = () => setEditorFocused(false);

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
        const range = quillRef.current?.getEditor().getSelection()?.index;
        if (range !== null && range !== undefined) {
          quillRef.current?.getEditor().insertEmbed(range, 'image', res.imagePath);
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
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (story !== '' && story !== undefined && story !== prevStory) {
        patchStoryContent(storyId || '', story);
        setPrevStory(story);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [story, storyId, prevStory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault(); // 브라우저 기본 동작 방지
        handleSaveContent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story]);
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
    const request = window.prompt('받고싶은 스토리에 대한 내용을 입력하세요:');
    await handleSaveContent();

    if (request) {
      appendMutate(
        { storyId: storyId || '', userRequest: request },
        {
          onSuccess: (res) => {
            const appendedText = res?.content;
            if (appendedText) {
              setStory(story + appendedText);
            }
          },
        },
      );
    }
  };
  return (
    <Container editorFocused={editorFocused}>
      <StyledQuill
        ref={quillRef}
        onChange={setStory}
        onFocus={handleEditorFocus}
        onBlur={handleEditorBlur}
        theme="snow"
        value={story}
        modules={modules}
        placeholder="내용을 입력하세요"
        style={{
          height: '1000px',
          marginBottom: '50px',
        }}
      />
      <BtnWrap>
        {saveLoading ||
        uploadLoading ||
        appendStatus === 'loading' ||
        changeStatus === 'loading' ? (
          <Spinner width={'2rem'} />
        ) : null}

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
            border: '3px solid gray',

            padding: '30px',
            borderRadius: '10px',
          }}
        >
          <TextArea
            placeholder="요청할 내용을 입력하세요"
            value={userRequest}
            onChange={(e) => setUserRequest(e.target.value)}
            height="100px"
            onFocus={handleFocus}
            onBlur={handleBlur}
            isFocused={isFocused}
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
            GPT로 변경하기
          </Button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div<{ editorFocused: boolean }>`
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid
    ${({ editorFocused }) =>
      editorFocused ? getStyledColor('teal', 800) : getStyledColor('gray', 800)};
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
