import { useState, useEffect, ChangeEvent as ReactChangeEvent, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from 'styles/AdminStyledTemp';
import { bookQueries } from 'queries';
import ImageUploader, { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import { postImages, deleteImage } from 'api/imageapi';
import Loader from 'components/shared/Loader';
import { Button } from 'components/shared';
import { styled } from 'styled-components';
import { getDateStr } from 'utils';
import { BOOK_CATEGORIES } from 'constant';
import { getBook } from 'api/book';
import { LoaderScreen } from 'styles/LoaderWrapper';

const { usePatchBook, useDeleteBook } = bookQueries;
const AdminEditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef<ImageUploaderImperativeHandle>(null);

  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [clicks, setClicks] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [patchLoading, setPatchLoading] = useState(false);
  const [content, setContent] = useState('');
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const paramId = id ?? '';
  const { mutate, status: patchStatus } = usePatchBook();
  const { mutate: remove } = useDeleteBook();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const book = await getBook(paramId);
        if (book) {
          setTitle(book.title || '');
          setContent(book.content || '');
          setCategory(book.category || '');
          setAuthorName(book.authorName || '');
          setImageIds(book.images?.map((data) => data.id));
          imageRef.current?.setPath(book.images[0].path);
          setImagesSrc(book.images?.map((data) => data.path));
          setCreatedAt(book.createdAt);
          setUsername(book.user.name);
          setClicks(book.clicks);
        }
      } catch (error) {
        alert('데이터를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [
    paramId,
    setTitle,
    setContent,
    setCategory,
    setAuthorName,
    setImageIds,
    setImagesSrc,
    setIsLoading,
  ]);

  useEffect(() => {
    if (paramId === '') {
      navigate(-1);
    }
  }, [paramId, navigate]);

  const handleChangeTitle = useCallback((e: ReactChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleChangeContent = useCallback((e: ReactChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleChangeCategory = useCallback((e: ReactChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }, []);

  const handleChangeAuthorName = useCallback((e: ReactChangeEvent<HTMLInputElement>) => {
    setAuthorName(e.target.value);
  }, []);
  useEffect(() => {
    return () => {
      setImagesSrc([]);
      setTitle('');
      setContent('');
      setCategory('');
      setAuthorName('');
      setImageIds([]);
    };
  }, [setTitle, setContent, setCategory, setAuthorName, setImageIds, setImagesSrc]);

  const handleUpdate = useCallback(async () => {
    setPatchLoading(true);
    try {
      const newImageFiles = imageRef.current?.getFileData() || [];
      let newImageIds = imageIds;
      if (newImageFiles.length > 0) {
        const uploadResults = await postImages(newImageFiles);
        newImageIds = [...imageIds, ...uploadResults.imageIds];
        setImageIds(newImageIds);
      }
      mutate({
        id: paramId,
        title,
        content,
        category,
        authorName,
        images: newImageIds,
      });
    } catch (error) {
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setPatchLoading(false);
    }

    navigate(`/admin`);
  }, [mutate, paramId, title, content, category, authorName, imageIds, navigate]);

  const handleRemove = useCallback(() => {
    remove(paramId);
    navigate(`/admin`);
  }, [remove, paramId, navigate]);
  const handleDeleteImage = useCallback(async (type: string, storyId: string, imageId: string) => {
    try {
      const res = await deleteImage(type, storyId, imageId);
      alert(res?.message);
    } catch (error) {
      alert('이미지 삭제에 실패했습니다.');
    }
  }, []);
  if (paramId === '') {
    return <div>유효하지 않은 ID입니다.</div>;
  }

  if (isLoading || patchLoading) {
    return (
      <LoaderScreen>
        <Loader />
      </LoaderScreen>
    );
  }

  return (
    <Layout>
      <ContainerWrap>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>생성일</Text>
          <Data>{getDateStr(createdAt)}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>생성자</Text>
          <Data>{username}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>조회수</Text>
          <Data>{clicks}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>작가이름</Text>
          <Data>{authorName}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>카테고리</Text>
          <Data>{category}</Data>
        </S.SubContainer>
      </ContainerWrap>

      <S.Container style={{ alignSelf: 'flex-start', gridArea: 'contain' }}>
        <S.ContainerHeader>
          <S.ContainerTitle>책 수정하기</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Wrapper>
          <S.InputField>
            <S.Label style={{ color: 'black' }}>도서명</S.Label>
            <S.Input name="title" placeholder="Title" value={title} onChange={handleChangeTitle} />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label style={{ color: 'black' }}>설명</S.Label>
            <S.Textarea
              name="content"
              placeholder="content"
              value={content}
              onChange={handleChangeContent}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label style={{ color: 'black' }}>저자 이름</S.Label>
            <S.Input
              name="authorName"
              placeholder="Author Name"
              value={authorName}
              onChange={handleChangeAuthorName}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label style={{ color: 'black' }}>카테고리</S.Label>
            <select name="category" value={category} onChange={handleChangeCategory}>
              <option value="">Select a category</option>
              {BOOK_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </S.InputField>
        </S.Wrapper>
        <S.InputField $marginTop={20}>
          <S.Label style={{ color: 'black' }}>이미지</S.Label>
          <ImageUploader
            ref={imageRef}
            imageIds={imageIds}
            imagesSrc={imagesSrc}
            bookId={id}
            handleDeleteImage={handleDeleteImage}
          />
        </S.InputField>
        <S.InputField
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
            gap: 20,
          }}
        >
          <Button onClick={handleUpdate} status={patchStatus}>
            수정
          </Button>
          <S.Button onClick={handleRemove} $variant="error">
            삭제
          </S.Button>
        </S.InputField>
      </S.Container>
    </Layout>
  );
};

export default AdminEditItem;

const Layout = styled.div`
  display: grid;
  grid-template-areas: 'data contain';
  width: 100%;
  height: 100%;
  gap: 30px;
`;

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Text = styled.div`
  font-weight: 500;
`;

const Data = styled.div`
  margin-top: 8px;
  font-size: 14px;
`;
