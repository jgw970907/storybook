import { useState, useRef, useEffect, useCallback } from 'react';
import * as S from 'styles/gpt/gptLayout';
import * as SS from 'styles/AdminStyledTemp';
import { useChangeStoryWithGpt, useAppendStoryContent, usePostGptChat } from 'queries/gpt';
import { updateStory, patchStoryContent, getMyStory } from 'api/gpt';
import { useUserStore } from 'store/useUserStore';
import { useGptStore } from 'store/usegptStore';
import { Input } from 'styles/AdminStyledTemp';
import { useParams } from 'react-router-dom';
import Spinner from 'components/shared/Spinner';
import { Button } from 'styles/SearchStyled';
import ImageUploader, { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import styled from 'styled-components';
import { BOOK_CATEGORIES } from 'constant';
import { deleteImage, postImages } from 'api/imageapi';
import { getStyledColor, pixelToRem } from 'utils';
import Bottom from 'components/layout/Bottom';

export default function GptPromptPage() {
  const { user } = useUserStore();
  const { storyId } = useParams();
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const [promptResult, setPromptResult] = useState<string | undefined>('');
  const [userRequest, setUserRequest] = useState('');
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [images, setImages] = useState<File[] | null>(null);
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);
  // const [imageIds, setImageIds] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const {
    setTitle,
    title,
    story,
    setStory,
    gptResponse,
    setGptResponse,
    setImageIdsStore,
    imageIdsStore,
  } = useGptStore();
  const { mutate: postgptChatMutate, status: gptChatStatus } = usePostGptChat();
  const { mutate: changeMutate, status: changeStatus } = useChangeStoryWithGpt();
  const { mutate: appendMutate, status: appendStatus } = useAppendStoryContent();

  const imageRef = useRef<ImageUploaderImperativeHandle>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (storyId) {
        setLoading(true);
        try {
          const res = await getMyStory(storyId);
          if (res) {
            setTitle(res.title);
            setStory(res.content);
            setCategory(res.category || '블로그');
            setIsPublic(res.isSecret);
            const fileData = res.images.map((image) => ({
              name: image.name,
              type: String(image.type),
              size: String(image.size),
            }));
            imageRef.current?.setFileData(fileData);
            imageRef.current?.setPath(res.images[0].path);
            setImagesSrc(res.images.map((image) => image.path));
            setImageIdsStore(res.images.map((image) => image.id));
          }
        } catch (error) {
          setErrorText('데이터를 불러오는데 실패했습니다.');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [storyId, setTitle, setStory, setCategory, setIsPublic, setImageIdsStore]);

  useEffect(() => {
    return () => {
      setTitle('');
      setPrompt('');
      setStory('');
      setGptResponse('');
      setImageIdsStore([]);
    };
  }, [setTitle, setPrompt, setStory, setGptResponse, setImageIdsStore]);
  const handleDeleteImage = useCallback(async (type: string, storyId: string, imageId: string) => {
    try {
      const res = await deleteImage(type, storyId, imageId);
      alert(res?.message);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const hadnleChageCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  const handleGptChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt) {
      setErrorText('내용을 입력하세요');
      return;
    }
    postgptChatMutate(
      { prompt },
      {
        onSuccess: (res) => {
          setPromptResult(res?.content);
          setGptResponse(res?.content);
        },
      },
    );
  };

  const handleResultChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPromptResult(e.target.value);
  };

  const handleUserTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value);
  };

  const handleUpload = async () => {
    let newImageIds = imageIdsStore;
    if (!story) {
      setErrorText('내용을 입력하세요');
      return;
    }
    if (images && images.length > 0) {
      const uploadResults = await postImages(images);
      newImageIds = [...imageIdsStore, ...uploadResults.imageIds];

      setImageIdsStore(newImageIds);
    }
    try {
      setUploadLoading(true);
      await updateStory({
        title,
        storyId: storyId || '',
        content: story,
        category: category,
        authorName: user?.name || 'admin',
        imageIds: newImageIds,
        isSecret: isPublic,
      });
      alert('스토리가 업로드 되었습니다.');
    } catch (error) {
      alert('스토리 업로드 중 문제가 발생했습니다.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleTextSelection = () => {
    const selected = window.getSelection()?.toString();

    if (selected) {
      setSelectedText(selected);
      setShowPopup(true);

      if (textAreaRef.current) {
        const { top, left } = textAreaRef.current.getBoundingClientRect();

        setPopupPosition({ top: top + window.scrollY + 20, left: left + window.scrollX });
      }
    } else {
      setSelectedText(null);

      setShowPopup(false);
    }
  };
  const handleSaveContent = async () => {
    if (!story) {
      setErrorText('내용을 입력하세요');
      return;
    }
    setSaveLoading(true);
    try {
      await patchStoryContent(storyId || '', story);
      alert('스토리가 저장되었습니다.');
    } catch (error) {
      alert('스토리 변경 중 에러가 발생했습니다: ${error.message}');
    } finally {
      setSaveLoading(false);
    }
  };
  const handleAppendContent = async () => {
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
    setShowPopup(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      <S.GptLayout>
        <SS.InputField $marginTop={20}>
          <SS.Label>제목</SS.Label>
          <Input placeholder="제목" value={title} onChange={handleTitle}></Input>
        </SS.InputField>
        <SS.InputField $marginTop={20}>
          <SS.Label>카테고리</SS.Label>
          <SS.Select
            size={'MEDIUM'}
            name="category"
            value={category}
            onChange={hadnleChageCategory}
          >
            <SS.Option size={'MEDIUM'} value="">
              카테고리
            </SS.Option>
            {BOOK_CATEGORIES.map((category) => (
              <SS.Option size={'MEDIUM'} key={category} value={category}>
                {category}
              </SS.Option>
            ))}
          </SS.Select>
        </SS.InputField>
        <SS.InputField $marginTop={20}>
          <SS.Label>공개/비공개</SS.Label>
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <Span>체크박스 클릭시 비공개</Span>
          </CheckboxContainer>
        </SS.InputField>

        <SS.InputField $marginTop={20}>
          <SS.Label>썸네일</SS.Label>
          <ImageUploader
            ref={imageRef}
            onChange={(fileData: File[] | null) => setImages(fileData ? fileData : null)}
            imagesSrc={imagesSrc}
            imageIds={imageIdsStore}
            handleDeleteImage={handleDeleteImage}
            storyId={storyId}
          />
        </SS.InputField>
        <Section>
          <h2>GPT-4o-mini를 통해 영감을 얻으세요</h2>

          <p>{errorText}</p>
          <form onSubmit={handleGptChatSubmit} style={{ width: '100%' }}>
            <textarea
              disabled={gptChatStatus === 'loading'}
              value={prompt || gptResponse}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Gpt에게 요청할 내용을 입력하세요."
              rows={5}
              style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
            />

            <BtnWrap>
              {gptChatStatus === 'loading' ? <Spinner width={'2rem'} /> : null}
              <Button btncolortype="gray" type="submit" disabled={gptChatStatus === 'loading'}>
                Gpt 요청
              </Button>{' '}
            </BtnWrap>
          </form>

          <div style={{ width: '100%' }}>
            <textarea
              readOnly={true}
              value={promptResult}
              onChange={handleResultChange}
              rows={10}
              style={{ width: '100%', padding: '10px', height: '300px' }}
            />
          </div>
        </Section>

        <Section>
          <h2>당신만의 스토리를 만드세요</h2>
          <p>
            드래그를 통해 스토리를 변경할 수 있습니다. 원하는대로 요청하세요. 저장버튼을 수시로 눌러
            데이터 유실을 방지하세요.
          </p>

          <textarea
            disabled={
              appendStatus === 'loading' ||
              changeStatus === 'loading' ||
              saveLoading ||
              uploadLoading
            }
            ref={textAreaRef}
            value={story}
            onChange={handleUserTextChange}
            rows={20} // rows 속성을 20으로 변경
            style={{ width: '100%', padding: '10px', height: '600px' }} // height 스타일 추가
            onMouseUp={handleTextSelection}
          />
          <BtnWrap>
            {saveLoading ||
            uploadLoading ||
            changeStatus === 'loading' ||
            appendStatus === 'loading' ? (
              <Spinner width={'2rem'} />
            ) : null}
            <Button
              btncolortype="primary"
              onClick={handleSaveContent}
              disabled={
                appendStatus === 'loading' ||
                changeStatus === 'loading' ||
                saveLoading ||
                uploadLoading
              }
            >
              저장하기
            </Button>
            <Button
              btncolortype="danger"
              onClick={handleAppendContent}
              disabled={
                appendStatus === 'loading' ||
                changeStatus === 'loading' ||
                saveLoading ||
                uploadLoading
              }
            >
              Gpt로 생성
            </Button>
            <Button
              btncolortype="success"
              onClick={handleUpload}
              disabled={
                appendStatus === 'loading' ||
                changeStatus === 'loading' ||
                saveLoading ||
                uploadLoading
              }
            >
              게시하기
            </Button>
          </BtnWrap>
        </Section>

        {showPopup && popupPosition && (
          <div
            style={{
              position: 'absolute',
              top: popupPosition.top,
              left: popupPosition.left,
              background: 'white',
              border: '1px solid black',
              padding: '10px',
            }}
          >
            <input
              type="text"
              placeholder="User Prompt"
              value={userRequest}
              onChange={(e) => setUserRequest(e.target.value)}
              style={{ marginBottom: '10px', padding: '5px' }}
            />
            <Button
              btncolortype="primary"
              onClick={handleGptRequest}
              disabled={changeStatus === 'loading'}
            >
              GPT로 요청하기
            </Button>
          </div>
        )}
      </S.GptLayout>
      <Bottom />
    </>
  );
}

const Section = styled.section`
  margin-top: 20px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  padding: 40px;
  margin-bottom: 20px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  max-width: ${pixelToRem(300)};
  background-color: ${getStyledColor('gray', 500)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
  margin-top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
`;
const Span = styled.span`
  font-size: 1rem;
`;
