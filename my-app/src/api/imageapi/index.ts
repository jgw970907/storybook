import { getAxiosInstance as Axios } from '../axios/index';
import { BookAddImageRes } from 'types/imageTypes';

export const deleteImage = async (bookId: string, imageId: string) => {
  const res = await Axios(`/fb/image/temp/${bookId}/${imageId}`).remove<{ message: string }>();
  return res;
};
//dd
export const patchImages = async (bookId: string, imageIds: string[]) => {
  const res = await Axios(`/fb/image/temp/${bookId}`).patch<BookAddImageRes>({
    imageIds: imageIds,
  });
  return res;
};
export const postImage = async (
  imageFile: File,
): Promise<{ imageId: string; imagePath: string }> => {
  const formData = new FormData();
  formData.append('profileImage', imageFile);
  try {
    const res = await Axios(`/fb/image/temp/profile`).post<{
      imageId: string;
      imagePath: string;
    }>(formData);
    if (res && res.imageId && res.imagePath) {
      return { imageId: res.imageId, imagePath: res.imagePath };
    } else {
      console.error('Error: Response data is undefined or invalid.');
      return { imageId: '', imagePath: '' };
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return { imageId: '', imagePath: '' };
  }
};
export const postImages = async (
  imageFiles: File[],
): Promise<{ imageIds: string[]; imagePaths: string[] }> => {
  const formData = new FormData();
  imageFiles.forEach((imageFile) => formData.append('images', imageFile));

  try {
    const res = await Axios(`/fb/image/temp`).post<{
      imageIds: string[];
      imagePaths: string[];
    }>(formData);

    if (res && res.imageIds && res.imagePaths) {
      return { imageIds: res.imageIds, imagePaths: res.imagePaths };
    } else {
      console.error('Error: Response data is undefined or invalid.');
      return { imageIds: [], imagePaths: [] };
    }
  } catch (error) {
    console.error('Error uploading image:', error);
    return { imageIds: [], imagePaths: [] };
  }
};
