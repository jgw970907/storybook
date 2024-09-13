export type ImagesType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  order: number;
  type: string;
  size: string;
  name: string;
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
    size: number;
    name: string;
    path: string;
    fbPath: string;
  }>;
};
