import { getAxiosInstance as Axios } from './axios/index';
import Cookies from 'js-cookie';
import {
  BookReq,
  BooklistParams,
  BooklistRes,
  BookRes,
  BookPatchReq,
  BookAddImageRes,
  CommentGetRes,
  CommentPostRes,
  PatchCommentReq,
  // BookTakelistRes,
  BookisLikeRes,
  MyFavoritesParams,
  MyFavorites,
  Countlist,
  CommentsGetRes,
  BookChangeLikeRes,
  BannedWord,
  BannedWordList,
} from 'types';

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
    console.log(imageIds);
    // iamgePaths = uploadResults.imagePaths
    // Ensure all images are successfully uploaded
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

export const deleteImage = async (bookId: string, imageId: string) => {
  const res = await Axios(`/fb/image/temp/${bookId}/${imageId}`).remove<{ message: string }>();
  return res;
};

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
    const res = await Axios(`fb/image/temp/profile`).post<{ imageId: string; imagePath: string }>(
      formData,
    );
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
    const res = await Axios(`/fb/image/temp`).post<{ imageIds: string[]; imagePaths: string[] }>(
      formData,
    );

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
export const getCommentsForBook = async (
  bookId: string,
  params: { page: number; take: number },
) => {
  const res = await Axios(
    `/comment/${bookId}?page=${params.page}&take=${params.take}`,
  ).get<CommentGetRes>();
  return res;
};
export const getComments = async (params: { page: number; take: number }) => {
  const res = await Axios(`/comment?page=${params.page}&take=${params.take}`).get<CommentsGetRes>(
    params,
  );

  return res;
};
export const postComment = async (bookId: string, comment: string) => {
  const res = await Axios(`/comment/${bookId}`).post<CommentPostRes>({
    content: comment,
  });
  return res;
};

export const patchComment = async (params: PatchCommentReq) => {
  const { bookId, comment, commentId } = params;
  const res = await Axios(`/comment/${bookId}/${commentId}`).patch({
    content: comment,
  });
  return res;
};
export const deleteCommentByRole = async (commentId: string, userId: string) => {
  const res = await Axios(`/comment/role/${commentId}/${userId}`).remove();
  return res;
};
export const deleteComment = async (bookId: string, commentId: string) => {
  const res = await Axios(`/comment/${bookId}/${commentId}`).remove();
  return res;
};
//vercel 참고, like 데이터베이스에서 userId를 이용해 like데이터와 book데이터 묶어서 return
export const getMyFavorites = async (params: MyFavoritesParams) => {
  const { userId, take, page } = params;
  console.log(userId);
  const res = await Axios(
    `/myfavorites/${userId}?take=${take}&page=${page}&order__updatedAt=DESC`,
  ).get<MyFavorites>();
  return res;
};

export const getBookLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  const res = await Axios(`/like/${bookId}/${userId}`).get<BookisLikeRes>();
  return res;
};

export const addLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/like/add/${bookId}/${userId}`).patch<BookChangeLikeRes>();
  return res;
};
export const removeLike = async ({ bookId, userId }: { bookId: string; userId: string }) => {
  if (!userId) return;
  const res = await Axios(`/like/remove/${bookId}/${userId}`).patch<BookChangeLikeRes>();
  return res;
};

export const getCount = async () => {
  const res = await Axios(`/statistics/count`).get<Countlist>();

  return res;
};
export const addBannedWord = async (word: string) => {
  const res = await Axios(`/bannedword`).post<BannedWordList>({ word });
  return res;
};
export const getBannedWords = async (take: number, page: number) => {
  const res = await Axios(`/bannedword?take=${take}&page=${page}`).get<BannedWordList>();
  return res;
};
export const deleteBannedWord = async (id: string) => {
  const res = await Axios(`/bannedword/${id}`).remove<BannedWordList>();
  return res;
};
export const incrementClicks = async (bookId: string) => {
  try {
    const res = await Axios(`/book/increment-clicks/${bookId}`).patch<{
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
