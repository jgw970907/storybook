import { useState, useRef, useEffect, useCallback } from 'react';
import * as S from 'styles/gpt/gptLayout';
import * as SS from 'styles/AdminStyledTemp';
import { usePostGptChat } from 'queries/gpt';
import { updateStory, getMyStory } from 'api/gpt';
import { useUserStore } from 'store/useUserStore';
import { useGptStore } from 'store/usegptStore';
import { Input } from 'styles/AdminStyledTemp';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from 'components/shared/Spinner';
import { Button } from 'styles/SearchStyled';
import ImageUploader, { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import styled from 'styled-components';
import { BOOK_CATEGORIES } from 'constant';
import { deleteImage, postImages } from 'api/imageapi';
import { getStyledColor, pixelToRem } from 'utils';
import Bottom from 'components/layout/Bottom';
import { GptTextEditor } from 'components/gpt/GptTextEditor';
import DOMPurify from 'isomorphic-dompurify';
export default function GptPromptPage() {
  const { user, isLogin } = useUserStore();
  const { storyId } = useParams();

  const [uploadLoading, setUploadLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [prompt, setPrompt] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [promptResult, setPromptResult] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const {
    userId,
    setTitle,
    title,
    story,
    setStory,
    gptResponse,
    setUserId,
    setGptResponse,
    setImageIdsStore,
    imageIdsStore,
  } = useGptStore();
  const { mutate: postgptChatMutate, status: gptChatStatus } = usePostGptChat();

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
            setUserId(res.userId);
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
  }, [storyId, setTitle, setStory, setCategory, setIsPublic, setImageIdsStore, setUserId]);

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
      alert('이미지 삭제 중 문제가 발생했습니다.');
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

  const handleUpload = async () => {
    if (!story) {
      setErrorText('내용을 입력하세요');
      return;
    }
    const purifiedStory = DOMPurify.sanitize(story);

    if (purifiedStory !== story) {
      setErrorText('HTML 내용에 문제가 있어 저장할 수 없습니다.');
      return;
    }
    setUploadLoading(true);
    if (!story) {
      setErrorText('내용을 입력하세요');
      return;
    }
    let newImageIds = [...imageIdsStore];
    // ImageUploader에서 파일 데이터를 직접 가져오기
    const filesToUpload = imageRef.current?.getFileData() || [];
    if (filesToUpload.length > 0) {
      const uploadResults = await postImages(filesToUpload);
      newImageIds = [...imageIdsStore, ...uploadResults.imageIds];
      setImageIdsStore(newImageIds);
    }
    try {
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

  const handleEditorFocus = () => {
    setIsFocused(true);
  };
  const handleEditorBlur = () => {
    setIsFocused(false);
  };
  if (!isLogin || !user || !userId) {
    // userId가 설정되지 않았다면 로딩 상태 유지
    return <Spinner />;
  }

  if (user.id !== userId) {
    // userId가 설정된 이후에만 비교하여 Navigate 처리
    return <Navigate to="/" replace />;
  }
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
            imagesSrc={imagesSrc}
            imageIds={imageIdsStore}
            handleDeleteImage={handleDeleteImage}
            storyId={storyId}
          />
        </SS.InputField>
        <Section>
          <h2>GPT-4o-mini를 통해 영감을 얻으세요</h2>

          <p>{errorText}</p>

          <form onSubmit={handleGptChatSubmit}>
            <TextArea
              disabled={gptChatStatus === 'loading'}
              value={prompt || gptResponse}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Gpt에게 요청할 내용을 입력하세요."
              rows={5}
              height="200px"
              onBlur={handleEditorBlur}
              onFocus={handleEditorFocus}
              isFocused={isFocused}
            />
            <BtnWrap>
              {gptChatStatus === 'loading' ? <Spinner width={'2rem'} /> : null}
              <Button btncolortype="gray" type="submit" disabled={gptChatStatus === 'loading'}>
                Gpt로 응답받기
              </Button>{' '}
            </BtnWrap>
          </form>

          <TextArea
            readOnly={true}
            value={promptResult}
            onChange={handleResultChange}
            rows={10}
            height="300px"
          />
        </Section>

        <Section>
          <h2>당신만의 스토리를 만드세요</h2>
          <p
            style={{
              color: 'gray',
              fontSize: '1rem',
              marginTop: '0',
              marginBottom: '10px',
            }}
          >
            드래그를 통해 스토리를 변경할 수 있습니다. 원하는대로 요청하세요.<br></br> 데이터는
            <b> 1분</b>마다 자동저장되고 <b>ctrl + s</b>로 저장 가능합니다.
          </p>
          <GptTextEditor
            story={story}
            setStory={setStory}
            setErrorText={setErrorText}
            storyId={storyId}
            handleUpload={handleUpload}
            uploadLoading={uploadLoading}
          />
        </Section>
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
export const TextArea = styled.textarea<{ height: string; isFocused?: boolean }>`
  margin: 10px;
  padding: 10px;
  width: 100%;
  min-height: ${({ height }) => height};
  resize: both;
  outline: none;
  margin: 0;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: ${({ isFocused }) => (isFocused ? '3px' : '2px')} solid
    ${({ isFocused }) => (isFocused ? getStyledColor('teal', 800) : getStyledColor('gray', 800))};
`;
