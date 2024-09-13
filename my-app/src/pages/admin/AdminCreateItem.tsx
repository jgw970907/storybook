import { ChangeEvent as ReactChangeEvent, useEffect, useRef, useState } from 'react';
import * as S from 'styles/AdminStyledTemp';
import { usePostBook } from 'queries/book';
import useBookInfo from 'hooks/useBookInfo';
import ImageUploader, { ImageUploaderImperativeHandle } from 'components/shared/ImageUploader';
import Button from 'components/shared/Button';
import { FaBook } from 'react-icons/fa6';
import { BOOK_CATEGORIES } from 'constant';
const AdminCreateItem = () => {
  const { mutate, status } = usePostBook();
  const { bookInfo, setBookInfo, resetBookInfo } = useBookInfo();
  const [isInvalid, setIsInvalid] = useState(true);

  const imageRef = useRef<ImageUploaderImperativeHandle>(null);

  useEffect(() => {
    if (!bookInfo.images) return;
    if (
      bookInfo.title.length === 0 ||
      bookInfo.content.length === 0 ||
      bookInfo.images.length === 0 ||
      bookInfo.authorName.length === 0 ||
      bookInfo.category.length === 0
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [bookInfo, setIsInvalid]);

  const handleChange = (
    e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case 'title':
        setBookInfo((prev) => ({ ...prev, title: value }));
        break;
      case 'content':
        setBookInfo((prev) => ({ ...prev, content: value }));
        break;
      case 'authorName': // authorName 변경 핸들러 추가
        setBookInfo((prev) => ({ ...prev, authorName: value }));
        break;
      case 'category':
        setBookInfo((prev) => ({ ...prev, category: value }));
        break;
      default:
        break;
    }
  };

  const onClick = async () => {
    mutate({ ...bookInfo });
    resetBookInfo();
    if (imageRef.current) {
      imageRef.current.handleCancel();
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>
            <FaBook /> 책 등록하기
          </S.ContainerTitle>
        </S.ContainerHeader>
        <S.Wrapper $gap={20}>
          <S.InputField>
            <S.Label>도서명</S.Label>
            <S.Input
              name="title"
              placeholder="Title"
              value={bookInfo.title}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>설명</S.Label>
            <S.Textarea
              name="content"
              placeholder="content"
              value={bookInfo.content}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>저자 ID</S.Label> {/* authorId 입력 필드 추가 */}
            <S.Input
              name="authorName"
              placeholder="author name"
              value={bookInfo.authorName}
              onChange={handleChange}
            />
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>카테고리</S.Label>
            <S.Select
              size={'LARGE'}
              name="category"
              value={bookInfo.category}
              onChange={handleChange}
            >
              <S.Option size={'LARGE'} value="">
                카테고리
              </S.Option>
              {BOOK_CATEGORIES.map((category) => (
                <S.Option size={'LARGE'} key={category} value={category}>
                  {category}
                </S.Option>
              ))}
            </S.Select>
          </S.InputField>
          <S.InputField $marginTop={20}>
            <S.Label>이미지</S.Label>
            <ImageUploader
              ref={imageRef}
              onChange={(fileData) =>
                setBookInfo((prev) => ({
                  ...prev,
                  images: fileData || [],
                }))
              }
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $marginTop={40}>
          <Button onClick={onClick} status={status} disabled={isInvalid}>
            등록
          </Button>
        </S.Wrapper>
      </S.Container>
    </S.Layout>
  );
};

export default AdminCreateItem;
