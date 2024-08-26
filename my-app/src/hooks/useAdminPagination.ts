import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AllowDataType = {
  BookTakelistRes: 'BookTakelistRes';
  CommentTakelistRes: 'CommentTakelistRes';
};

const useAdminPagination = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum + 1);
  }, []);
  const handlePrevPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum - 1);
  }, []);
  const handleNavigate = useCallback(
    (type: keyof AllowDataType, id: string) => {
      switch (type) {
        case 'BookTakelistRes':
          navigate(`/admin/books/detail/${id}`);
          break;

        default:
          break;
      }
    },
    [navigate],
  );

  return { currentPage, setCurrentPage, handleNextPage, handlePrevPage, handleNavigate };
};

export default useAdminPagination;
