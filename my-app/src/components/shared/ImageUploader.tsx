import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import styled from 'styled-components';
import { FaFileExcel, FaFileCirclePlus } from 'react-icons/fa6';
import { FaTrashAlt } from 'react-icons/fa';
import ImagePreview from './ImagePreview';
import { pixelToRem, getStyledColor } from 'utils';

export type ImageUploaderImperativeHandle = {
  getFileData: () => File[];
  handleCancel: (index?: number) => void;
  setPath: (path: string) => void;
  setFileData: (data: File[]) => void;
  setNewImageFiles?: (files: File[]) => void;
};

interface Props {
  imageIds?: string[];
  imagesSrc?: string[];
  bookId?: string;
  storyId?: string;
  handleDeleteImage?: (type: 'book' | 'story', id: string, imageId: string) => Promise<void>;
  onChange?: (files: File[] | null) => void;
  setNewImageFiles?: (files: File[]) => void;
}

const ImageUploader = (
  { imageIds = [], bookId = '', storyId = '', imagesSrc = [], handleDeleteImage, onChange }: Props,
  forwardedRef?: React.ForwardedRef<ImageUploaderImperativeHandle>,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([...imagesSrc]);
  const [fileData, setFileData] = useState<File[] | null>(null);

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
      onChange?.(newFileData.length > 0 ? newFileData : null); // onChange 호출
    } else {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setPreviewUrls([]);
      setFileData(null);
      onChange?.(null); // onChange 호출
    }
  };
  useImperativeHandle(forwardedRef, () => ({
    getFileData: () => fileData?.map((data) => data) || [],
    handleCancel: () => handleCancel(),
    setPath: (path: string) => {
      setPreviewUrls([path]);
    },
    setFileData: (data: File[]) => {
      setFileData(data);
      onChange?.(data); // onChange 호출
    },
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

    previewChange(validFiles);

    const newFileData = validFiles.map((file) => file);

    setFileData((prev) => {
      const updatedFileData = prev ? [...prev, ...newFileData] : newFileData;
      onChange?.(updatedFileData); // onChange 호출
      return updatedFileData;
    });
  };

  const handleDelete = async (type: 'book' | 'story', id: string, imageId: string) => {
    if (handleDeleteImage && id) {
      await handleDeleteImage(type, id, imageId);
      // 이미지 삭제 후 상태 업데이트
      setPreviewUrls((prev) => prev.filter((url, index) => imageIds[index] !== imageId));
      setFileData((prev) => {
        const updatedFileData = prev?.filter((data, index) => imageIds[index] !== imageId) || null;
        onChange?.(updatedFileData); // onChange 호출
        return updatedFileData;
      });
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
                {fileData && (
                  <ImageData>
                    <div>Name: {fileData[index]?.name}</div>
                    <div>Type: {fileData[index]?.type}</div>
                    <div>Size: {fileData[index] ? formatBytes(fileData[index].size) : ''}</div>
                  </ImageData>
                )}
                <DeleteButton
                  onClick={() => {
                    imagesSrc[0]
                      ? handleDelete(bookId ? 'book' : 'story', bookId || storyId, imageIds[index])
                      : handleCancel(index);
                  }}
                >
                  <FaTrashAlt />
                </DeleteButton>
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
