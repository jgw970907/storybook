import { getAxiosInstance as Axios } from "../axios/index";
import {
  BookReq,
  BooklistParams,
  BooklistRes,
  BookRes,
  BookPatchReq,
  BookTakelistRes,
  BookAddImageRes,
} from "types";

const getBooks = async (queries?: BooklistParams) => {
  let res;
  if (queries) {
    res = await Axios("/api2s").get<BookTakelistRes>(queries);
  } else {
    res = await Axios("/api2s").get<BooklistRes>(queries);
  }

  return res;
};

const getNextBooks = async (queries: BooklistParams) => {
  const res = await Axios("/api2s").get<BooklistRes>(queries);
  return res;
};

const postImage = async (imageFile: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await Axios("/fb/image/temp").post<{
    tempFilePath: string[];
  }>(formData);
  return res?.tempFilePath[0];
};

const deleteImage = async (bookId: number, imageId: number) => {
  const res = await Axios(`/api2s/${bookId}/delete-image/${imageId}`).remove();
  return res;
};

const addImage = async (bookId: number, images: string[]) => {
  const res = await Axios(`/api2s/${bookId}/add-image`).post<BookAddImageRes>({
    images: images,
  });
  return res;
};
const postBooks = async (params: BookReq) => {
  if (params.images && params.images[0] instanceof File) {
    const fileName = await postImage(params.images[0]);
    if (fileName) params.images[0] = fileName;
  }
  const res = await Axios("/api2s").post(params);

  return res;
};

const getBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).get<BookRes>();

  return res;
};

const patchBook = async (params: BookPatchReq & { id: number }) => {
  const { id, ...rest } = params;

  const res = await Axios(`/api2s/${id}`).patch(rest);

  return res;
};

const deleteBook = async (id: number) => {
  const res = await Axios(`/api2s/${id}`).remove({ id });
  return res;
};

export {
  getBooks,
  getNextBooks,
  postBooks,
  getBook,
  patchBook,
  deleteBook,
  deleteImage,
  addImage,
};
