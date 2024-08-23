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

const { PatchBook, DeleteBook, GetBook } = bookQueries;
const AdminEditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef<ImageUploaderImperativeHandle>(null);

  const [title, setTitle] = useState('');
  const [patchLoading, setPatchLoading] = useState(false);
  const [content, setContent] = useState('');
  const [imagesSrc, setImagesSrc] = useState<string[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [newImagePaths, setNewImagePaths] = useState<string[]>([]);

  const paramId = id ?? '';
  const { data: book, isLoading } = GetBook(paramId);
  const { mutate, status: patchStatus } = PatchBook();
  const { mutate: remove } = DeleteBook();

  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setContent(book.content || '');
      setCategory(book.category || '');
      setAuthorName(book.authorName || '');
      setImageIds(book.images?.map((data) => data.id) ?? []);
      setImagesSrc(book.images?.map((data) => data.path) ?? []);
    }
  }, [book]);

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

  const handleSetImage = useCallback(async (fileData: File[] | null) => {
    if (fileData && fileData.length > 0) {
      const result = await postImages(fileData);
      const uploadedImagePaths = result.imagePaths;
      const uploadedImageIds = result.imageIds;
      // 배열의 배열을 평탄화(flatten)하여 단일 배열로 변환
      const validImagePaths = uploadedImagePaths.flat();
      const validImageIds = uploadedImageIds.flat();
      setImageIds((prev) => [...prev, ...validImageIds]);
      setNewImagePaths(validImagePaths);
    } else {
      console.log('이미지 업로드가 취소되었거나 이미지가 선택되지 않았습니다.');
    }
  }, []);
  const handleDeleteImage = useCallback(async (bookId: string, imageId: string) => {
    try {
      const res = await deleteImage(bookId, imageId);
      alert(res?.message);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleFinalUpdate = useCallback(async () => {
    try {
      setPatchLoading(true);
      if (newImagePaths.length > 0) {
        await mutate({
          id: paramId,
          title,
          content,
          category,
          authorName,
          images: imageIds,
        });
      }
    } catch (error) {
      console.error('Error during the update process:', error);
      // 에러 발생 시 처리할 로직 추가 가능
    } finally {
      // 성공적으로 완료되었거나 에러가 발생했을 때 모두 실행
      setPatchLoading(false);
    }

    navigate(`/admin`);
  }, [mutate, paramId, title, content, category, authorName, imageIds, newImagePaths, navigate]);

  const handleRemove = useCallback(() => {
    remove(paramId);
    navigate(`/admin`);
  }, [remove, paramId, navigate]);

  if (paramId === '') {
    return <div>유효하지 않은 ID입니다.</div>;
  }

  if (isLoading || patchLoading) {
    return <Loader />;
  }

  if (!book) {
    return <div>책 정보를 찾을 수 없습니다.</div>;
  }
  return (
    <Layout>
      <ContainerWrap>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>생성일</Text>
          <Data>{getDateStr(book.createdAt)}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>생성자</Text>
          <Data>{book.user.name}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>조회수</Text>
          <Data>{book.clicks}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>작가이름</Text>
          <Data>{book.authorName}</Data>
        </S.SubContainer>
        <S.SubContainer style={{ gridArea: 'data' }}>
          <Text>카테고리</Text>
          <Data>{book.category}</Data>
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
          {imagesSrc[0] && (
            <ImageUploader
              ref={imageRef}
              imageIds={imageIds}
              imagesSrc={imagesSrc}
              bookId={book.id}
              handleDeleteImage={handleDeleteImage}
              onChange={(fileData) => handleSetImage(fileData || [])}
            />
          )}
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
          <Button onClick={handleFinalUpdate} status={patchStatus}>
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
