import { getAxiosInstance as Axios } from '../axios/index';
import { BooklistParams, BookRes, BooklistRes, BookReq, BookPatchReq } from 'types/bookTypes';
import Cookies from 'js-cookie';
import { postImages } from 'api/imageapi';

export const getBooks = async (queries?: BooklistParams) => {
  let res;
  if (queries) {
    res = await Axios('/book').get<BooklistRes>(queries);
  } else {
    res = await Axios('/book').get<BooklistRes>();
  }

  return res;
};

export const getNextBooks = async (queries: BooklistParams) => {
  const res = await Axios('/book').get<BooklistRes>(queries);
  return res;
};
export const postBooks = async ({ title, content, images, authorName, category }: BookReq) => {
  let imageIds: string[] = [];
  // let iamgePaths: string[] = [];?
  if (images && images.length > 0) {
    const uploadResults = await postImages(images);
    console.log(uploadResults);
    imageIds = uploadResults.imageIds;
    if (imageIds.length === 0) {
      throw new Error('Image upload failed');
    }
  }

  const res = await Axios('/book').post({ title, content, authorName, category, imageIds });
  return res;
};

export const getBook = async (id: string) => {
  const res = await Axios(`/book/${id}`).get<BookRes>();

  return res;
};

export const patchBook = async (params: BookPatchReq & { id: string }) => {
  const { id, ...rest } = params;

  const res = await Axios(`/book/${id}`).patch<{
    book: {
      id: string;
      title: string;
      content: string;
      category: string;
      authorName: string;
      imageIds: string[];
    };
    imageIds: string[];
    imagePaths: string[];
  }>(rest);

  return res;
};

export const deleteBook = async (id: string) => {
  const res = await Axios(`/book/${id}`).remove({ id });
  return res;
};
export const incrementClicks = async (bookId: string) => {
  try {
    const res = await Axios(`/book/increment-clicks/${bookId}`).patchWithoutToken<{
      clicks: number;
      cookieName: string;
    }>({ cookieName: `book_${bookId}_clicked` });
    const clicks = res?.clicks;
    const cookieName = res?.cookieName;
    if (clicks && cookieName) {
      const clicked = Cookies.get(cookieName);
      if (!clicked) {
        Cookies.set(cookieName, 'true', { expires: 1 });
      }
      return clicks;
    }
  } catch (error) {
    console.error('Error incrementing clicks:', error);
    throw error;
  }
};
