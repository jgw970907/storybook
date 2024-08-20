export type ErrorType = {
  message: string;
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
