import React from 'react';
import usePaginationStore from '../store/pagenationStore';
const Pagination = () => {
  const { currentPage, setCurrentPage, totalPage } = usePaginationStore();

  const handleClick = (page) => {
    setCurrentPage(page);
  };
  return <div>Pagination</div>;
};

export default Pagination;
