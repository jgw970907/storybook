import { useCallback, useState } from 'react';
import { BookReq } from 'types/bookTypes';

const InitData: BookReq = {
  title: '',
  content: '',
  images: [],
  authorName: '', // authorname 추가
  category: '',
};

const useBookInfo = (initData = InitData) => {
  const [bookInfo, setBookInfo] = useState(initData);

  const resetBookInfo = useCallback(() => {
    setBookInfo(InitData);
  }, [setBookInfo]);

  return { bookInfo, setBookInfo, resetBookInfo };
};

export default useBookInfo;
