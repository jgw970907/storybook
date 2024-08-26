import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
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
  return (
    <S.Pagination>
      <S.PaginationButton disabled={currentPage === 1}>
        <FaAngleLeft onClick={() => handlePrevPage(currentPage)} />
      </S.PaginationButton>
      <div>
        {Array.from({ length: Math.ceil(total / 10) }, (_, index) => (
          <S.PaginationNumber
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            $isCurrentPage={currentPage === index + 1}
          >
            {index + 1}
          </S.PaginationNumber>
        ))}
      </div>
      <S.PaginationButton disabled={currentPage >= Math.ceil(total / 10)}>
        <FaAngleRight onClick={() => handleNextPage(currentPage)} />
      </S.PaginationButton>
    </S.Pagination>
  );
};

export default AdminPagination;
