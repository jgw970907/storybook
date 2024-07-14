export type ImagesType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  order: number;
  type: number;
  path: string;
  fbPath: string;
};

export type BookInfoType = {
  id: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  likeCount: number;
  isSecret: boolean;
  images: ImagesType[];
  user: UserType;
  authorName: string;
  category: string;
};

export type BooklistRes = {
  data: BookInfoType[];
  cursor: {
    after: number;
  };
  count: number;
  next: string;
  total: number;
};

export type BookTakelistRes = {
  data: BookInfoType[];
  total: number;
};

export type BookPatchReq = {
  title: string;
  content: string;
  images: string[];
  category: string;
  authorName: string;
};

export type BookReq = {
  title: string;
  content: string;
  images: File[];
  authorName: string;
  category: string;
};

export type BookPost = {
  title: string;
  content: string;
  authorName: string;
  category: string;
};

export type UserPatchReq = {
  id?: string;
  nickname?: string;
  password?: string;
  profileImgPath?: string;
};
export type UserType = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  profileImg: Array<string>;
};
export type BookRes = {
  id: string;
  updatedAt: string;
  createdAt: string;
  title: string;
  content: string;
  clicks: number;
  isSecret: boolean;
  user: UserType;
  images: Array<{
    id: string;
    updatedAt: string;
    createdAt: string;
    order: number;
    type: number;
    path: string;
    fbPath: string;
  }>;
  category: string;
  authorName: string;
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

export type BooklistParams = {
  take?: number;
  page?: number;
  order__createdAt?: 'DESC' | 'ASC';
  where__title__i_like?: string;
  order__clicks?: 'DESC';
  order__likeCount?: 'DESC';
};

export type MyFavoritesParams = {
  userId: string;
  take: number;
  page: number;
};

export type ErrorType = {
  message: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  userInfo: UserType;
};

export type SignUpReq = {
  nickname: string;
  name: string;
  password: string;
  email: string;
};

export type SignUpRes = {
  accessToken: string;
  refreshToken: string;
  userInfo: UserType;
};

export type SelectedBookState = {
  selectedBook: SelectedBook;
  setSelectedBook: (newBookInfo: SelectedBook) => void;
};

export type SelectedBook = {
  title: string;
  content: string;
  images?: ImagesType[];
  authorName: string;
  category: string;
};

export type CommentPostRes = {
  content: string;
  user: UserType;
};
export type CommentType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  user: UserType;
};
export type CommentGetRes = {
  data: Array<CommentType>;
  total: number;
};
export type CommentsType = {
  commentId: string;
  commentArray: Array<CommentType>;
  total: number;
  bookTitle: string;
};
export type CommentsGetRes = {
  data: CommentsType[];
  total: number;
};

export type PatchCommentReq = {
  bookId: string;
  commentId: string;
  comment: string;
};

export type BookisLikeRes = {
  isLike: boolean;
  likeId: string;
  likeCount: number;
};

export type BookChangeLikeRes = {
  isLike: boolean;
  likeId: string;
  likeCount: number;
};
//vercel likes참고해야함
export type MyFavorites = {
  books: BookInfoType[];
  totalPages: number;
  currentPage: number;
};

// 통계
export type Countlist = {
  totalBooks: string;
  totalClicks: string;
  totalUsers: string;
  totalAdmins: string;
  totalComments: string;
};

export type BannedWord = {
  id: string;
  word: string;
};
export type BannedWordList = {
  data: BannedWord[];
  total: number;
};
// 댓글 목록
//댓글마다 고유 bookId 부여, 책과 댓글 관계는 1:N

export type RepliesList = CommentType[];
