import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import queryKeys from "queries/queryKeys";
import styled from "styled-components";
import * as S from "../../../admin/dev5/styles/styled";
import { useGetBoards } from "pages/admin/dev5/queries";
import BoardList from "../components/BoardList";
import BoardEmpty from "../components/BoardEmpty";
import usePaginationStore from "../../../admin/dev5/store/pagenationStore";
import Pagination from "../../../admin/dev5/dev5components/Pagination";
import DropDown from "../components/DropDown";
const BoardMain = () => {
  const queryClient = useQueryClient();
  const { currentPage, searchQuery, setSearchQuery, order, setCurrentPage } =
    usePaginationStore();
  const { data, error, isLoading } = useGetBoards({
    take: 10,
    page: currentPage,
    order: "ASC",
    search: searchQuery,
  });
  // const [boards, setBoards] = useState();
  const [search, setSearch] = useState("");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data || data.length === 0) {
    return <BoardEmpty />;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const onKeyPressSearch = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(search);
      setSearch("");
    }
  };
  const onClickSearch = () => {
    if (!search) return alert("검색어를 입력해주세요");
    setSearchQuery(search);
    setSearch("");
  };
  const onClickReset = () => {
    setCurrentPage(1);
    setSearchQuery("");
    queryClient.invalidateQueries([queryKeys.ADMIN, "boards"]);
  };
  return (
    <Sub.container>
      <Sub.header>
        <h1>게시판</h1>
        <S.Search>
          {searchQuery ? <span>현재검색어:{searchQuery} </span> : null}
          <S.SearchInput
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={onChangeSearch}
            onKeyDown={onKeyPressSearch}
          />
          <S.SearchButton onClick={onClickSearch}>검색</S.SearchButton>
          <S.ResetButton onClick={onClickReset}>초기화</S.ResetButton>
        </S.Search>
        <DropDown />
      </Sub.header>
      <S.Container>
        <Sub.boardHeader>
          <div>번호</div>
          <div>제목</div>
          <div>작성자</div>
          <div>작성일</div>
          <div>조회수</div>
          <div>좋아요</div>
        </Sub.boardHeader>
        {/* {data?.length !== 0 ? <BoardList boards={data} /> : <BoardEmpty />} */}
        <BoardList boards={data} />
        <Sub.paginationContainer>
          <Pagination />
        </Sub.paginationContainer>
      </S.Container>
    </Sub.container>
  );
};

export default BoardMain;

const Sub = {
  container: styled.div`
    width: 100%;
    height: 100%;
  `,
  header: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  boardHeader: styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 0.5fr 1fr 0.5fr 0.5fr;
    padding: 1rem;
    border-bottom: 1px solid #000;
  `,
  paginationContainer: styled.div`
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    display: flex;
    justify-content: center;
  `,
};
