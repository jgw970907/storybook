import React from "react";
import usePaginationStore from "../store/pagenationStore";
import styled from "styled-components";
import { getStyledColor } from "utils";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);
  const nextPage = Math.min(currentPage + 1, totalPages);
  const prevPage = Math.max(currentPage - 1, 1);
  const arr = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <S.container>
      <S.prevPage
        onClick={() => handleClick(prevPage)}
        disabled={currentPage === 1}
        $currentPage={currentPage}
      >
        prev
      </S.prevPage>
      {arr.map((page) => (
        <S.button
          key={page}
          onClick={() => handleClick(page)}
          $page={page}
          $currentPage={currentPage}
        >
          {page}
        </S.button>
      ))}
      <S.nextPage
        onClick={() => handleClick(nextPage)}
        disabled={currentPage === totalPages}
        $currentPage={currentPage}
        $totalPages={totalPages}
      >
        next
      </S.nextPage>
    </S.container>
  );
};

export default Pagination;

const S = {
  container: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    & > button {
      font-size: 20px;
    }
  `,
  button: styled.button`
    color: ${(props) => (props.$currentPage === props.$page ? "red" : "black")};
    background-color: ${(props) =>
      props.$currentPage === props.$page
        ? getStyledColor("orange", 500)
        : getStyledColor("gray", 400)};
    padding: 4px;
    border: 0.5px solid gray;
    border-radius: 4px;
  `,
  prevPage: styled(IoIosArrowBack)`
    color: ${(props) =>
      props.$currentPage === 1
        ? getStyledColor("gray", 700)
        : getStyledColor("blue", 800)};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid gray;
    font-size: 30px;
  `,
  nextPage: styled(IoIosArrowForward)`
    color: ${(props) =>
      props.$currentPage === props.$totalPages
        ? getStyledColor("gray", 700)
        : getStyledColor("blue", 800)};
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid gray;
    font-size: 30px;
  `,
};
