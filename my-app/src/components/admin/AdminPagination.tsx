import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import * as S from 'styles/AdminStyledTemp';

const AdminPagination = ({
  currentPage,
  setCurrentPage,
  handlePrevPage,
  handleNextPage,
  total,
}: {
  currentPage: number;
  setCurrentPage: (pageNum: number) => void;
  handlePrevPage: (pageNum: number) => void;
  handleNextPage: (pageNum: number) => void;
  total: number;
}) => {
  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);
  const maxVisiblePages = 10;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisiblePages, 1);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const handlePrevGroup = () => {
    const newPage = Math.max(startPage - maxVisiblePages, 1);
    setCurrentPage(newPage);
  };

  const handleNextGroup = () => {
    const newPage = Math.min(endPage + 1, totalPages);
    setCurrentPage(newPage);
  };

  return (
    <S.Pagination>
      <S.PaginationButton disabled={currentPage === 1} onClick={handlePrevGroup}>
        <MdOutlineKeyboardDoubleArrowLeft />
      </S.PaginationButton>
      <S.PaginationButton disabled={currentPage === 1}>
        <FaAngleLeft onClick={() => handlePrevPage(currentPage)} />
      </S.PaginationButton>
      <div>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
          const pageNumber = startPage + index;
          return (
            <S.PaginationNumber
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              $isCurrentPage={currentPage === pageNumber}
            >
              {pageNumber}
            </S.PaginationNumber>
          );
        })}
      </div>
      <S.PaginationButton disabled={currentPage >= totalPages}>
        <FaAngleRight onClick={() => handleNextPage(currentPage)} />
      </S.PaginationButton>
      <S.PaginationButton disabled={endPage >= totalPages} onClick={handleNextGroup}>
        <MdOutlineKeyboardDoubleArrowRight />
      </S.PaginationButton>
    </S.Pagination>
  );
};

export default AdminPagination;
