export type ImagesType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  order: number;
  type: number;
  path: string;
  fbPath: string;
};

export type BookAddImageRes = {
  images: Array<{
    id: string;
    updatedAt: string;
    createdAt: string;
    order: number;
    type: number;
    path: string;
    fbPath: string;
  }>;
};
