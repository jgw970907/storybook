import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { FaFileExcel, FaFileCirclePlus } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import ImagePreview from './ImagePreview';
import { pixelToRem, getStyledColor } from 'utils';

export type ImageUploaderImperativeHandle = {
  handleCancel: () => void;
};

interface Props {
  onChange: (files: File[] | null) => void;
  imageIds?: string[];
  imagesSrc?: string[];
  bookId?: string;
  handleDeleteImage?: (bookId: string, imageId: string) => Promise<void>;
}

const ImageUploader = (
  { onChange, imageIds = [], bookId = '', imagesSrc = [], handleDeleteImage }: Props,
  forwardedRef?: React.ForwardedRef<ImageUploaderImperativeHandle>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([...imagesSrc]);
  const [fileData, setFileData] = useState<{ name: string; type: string; size: string }[] | null>(
    null,
  );
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB로 설정
  // 프리뷰 이미지 변경
  const previewChange = (imageFiles: File[]) => {
    const urls = imageFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...urls].slice(0, 4));
  };

  // 데이터 단위 변환
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 KB';
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCancel = async (index?: number) => {
    if (index !== undefined && fileData) {
      const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
      const newFileData = fileData.filter((_, i) => i !== index);
      setPreviewUrls(newPreviewUrls);
      setFileData(newFileData.length > 0 ? newFileData : null);
      onChange(newFileData.length > 0 ? newFileData.map((data) => new File([], data.name)) : null);
    } else {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setPreviewUrls([]);
      setFileData(null);
      onChange(null);
    }
  };
  useImperativeHandle(forwardedRef, () => ({
    handleCancel: () => handleCancel(),
  }));

  // input data onChange
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files == null) return;

    const imageFiles = Array.from(files);
    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    imageFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      alert(`다음 파일은 너무 커서 업로드할 수 없습니다: ${invalidFiles.join(', ')}`);
    }

    if (validFiles.length === 0) return;

    onChange(validFiles);
    previewChange(validFiles);

    const newFileData = validFiles.map((file) => {
      const { name, size } = file;
      const lastDotIndex = name.lastIndexOf('.');
      const newName = lastDotIndex !== -1 ? name.substring(0, lastDotIndex) : name;
      const newType = lastDotIndex !== -1 ? name.substring(lastDotIndex + 1) : '';
      const newSize = formatBytes(size);
      return { name: newName, type: newType, size: newSize };
    });

    setFileData((prevData) => [...(prevData || []), ...newFileData].slice(0, 4));
  };

  const handleDelete = async (bookId: string, imageId: string) => {
    if (handleDeleteImage && bookId) {
      await handleDeleteImage(bookId, imageId);
      // 이미지 삭제 후 상태 업데이트
      setPreviewUrls((prev) => prev.filter((url, index) => imageIds[index] !== imageId));
      setFileData((prev) => prev?.filter((data, index) => imageIds[index] !== imageId) || null);
    }
  };
  return (
    <>
      <ImagePreview src={previewUrls[0]}>
        <Container>
          <Label htmlFor="fileInput">
            <Upload>
              <FaFileCirclePlus />
              파일 업로드하기
            </Upload>
            <Input
              id="fileInput"
              type="file"
              ref={inputRef}
              onChange={handleOnChange}
              accept="image/jpg, image/jpeg, image/png"
              multiple
            />
          </Label>
          {!bookId && fileData !== null && <Cancle onClick={() => handleCancel()} />}
        </Container>
      </ImagePreview>
      <ImagePreviews>
        {previewUrls[0] &&
          previewUrls.map((image, index) => {
            return (
              <ImageWrapper key={index}>
                <img src={image} />
                <DeleteButton
                  onClick={() => {
                    imagesSrc[0] ? handleDelete(bookId, imageIds[index]) : handleCancel(index);
                  }}
                >
                  <FaTrashAlt />
                </DeleteButton>
                {fileData && (
                  <ImageData>
                    <div>Name: {fileData[index].name}</div>
                    <div>Type: {fileData[index].type}</div>
                    <div>Size: {fileData[index].size}</div>
                  </ImageData>
                )}
              </ImageWrapper>
            );
          })}
      </ImagePreviews>
    </>
  );
};

export default forwardRef(ImageUploader);
const ImagePreviews = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover div {
    display: block;
  }
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('red', 900)};
  }
  &:active {
    color: ${getStyledColor('red', 1000)};
  }
`;
const ImageData = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: ${pixelToRem(10)};
  padding: 2px;
`;

const Upload = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${pixelToRem(14)};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cancle = styled(FaFileExcel)`
  align-self: flex-end;
  cursor: pointer;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('red', 900)};
  }
  &:active {
    color: ${getStyledColor('red', 1000)};
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;
