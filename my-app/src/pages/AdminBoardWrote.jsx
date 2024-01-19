import React, { useState } from "react";
import { useQueryClient } from "react-query";
import queryKeys from "queries/queryKeys";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as S from "../styles/styled";
import { getStyledColor } from "utils";
import { useGetBoards, useDeleteBoard } from "../queries";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Pagination from "../dev5components/Pagination";
import usePaginationStore from "../store/pagenationStore";
import AdminGoods from "../dev5components/AdminGoods";
import AdminBoardModal from "../modal/AdminBoardModal";
import { getCustomData } from "../utils/getCustomDate";
const AdminBoardWrote = () => {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { currentPage, order, searchQuery, setSearchQuery, setCurrentPage } =
    usePaginationStore();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [boardId, setBoardId] = useState(null);
  const {
    isLoading,
    data: boards,
    error,
  } = useGetBoards({
    take: 5,
    page: currentPage,
    order: order,
    search: searchQuery,
  });
  const {
    isLoading: deleteLoading,
    mutate: remove,
    error: deleteError,
  } = useDeleteBoard();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const deleteCheck = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      remove(id);
    } else {
      return;
    }
  };
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
  const titleClick = (id) => {
    setShow(true);
    setBoardId(id);
  };
  return (
    <>
      <AdminBoardModal show={show} setShow={setShow} boardId={boardId} />
      <S.Flex>
        <S.Container>
          <S.Header>
            <S.HeaderTitle>게시판 관리</S.HeaderTitle>
          </S.Header>
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
          <S.Table>
            <S.Theader>
              <S.Trow>
                <S.Tcolumn>ID</S.Tcolumn>
                <S.Tcolumn>제목</S.Tcolumn>
                <S.Tcolumn>작성자</S.Tcolumn>
                <S.Tcolumn>작성일</S.Tcolumn>
                <S.Tcolumn>좋아요</S.Tcolumn>
                <S.Tcolumn>댓글</S.Tcolumn>
                <S.Tcolumn>수정 및 삭제</S.Tcolumn>
              </S.Trow>
            </S.Theader>
            <S.Tbody>
              {boards?.data?.map((board) => {
                const {
                  id,
                  title,
                  createdAt,
                  updatedAt,
                  likeCount,
                  clicks,
                  reply5Count,
                  author,
                } = board;
                return (
                  <S.Trow key={id}>
                    <S.Tcell>{id}</S.Tcell>
                    <S.TcellTitle onClick={() => titleClick(id)}>
                      {title}
                    </S.TcellTitle>
                    <S.Tcell>{author.nickname}</S.Tcell>
                    <S.Tcell>{getCustomData(createdAt)}</S.Tcell>
                    <S.Tcell>{likeCount}</S.Tcell>
                    <S.Tcell>{reply5Count}</S.Tcell>
                    <S.TcellButton>
                      <EditIcon
                        onClick={() =>
                          navigate(`/admin/dev5/admin/board-update/${id} `)
                        }
                      />
                      <TrashIcon onClick={() => deleteCheck(id)} />
                    </S.TcellButton>
                  </S.Trow>
                );
              })}
            </S.Tbody>
          </S.Table>
          <Pagination />
        </S.Container>
        <S.Container>
          <AdminGoods />
        </S.Container>
      </S.Flex>
    </>
  );
};

export default AdminBoardWrote;

const EditIcon = styled(FaPenToSquare)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor("cool_gray", 700)};
  &:hover {
    color: ${getStyledColor("blue", 900)};
  }
  &:active {
    color: ${getStyledColor("blue", 1000)};
  }
  margin-right: 20px;
  cursor: pointer;
`;

const TrashIcon = styled(FaRegTrashCan)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor("cool_gray", 700)};
  &:hover {
    color: ${getStyledColor("red", 900)};
  }
  &:active {
    color: ${getStyledColor("red", 1000)};
  }
  cursor: pointer;
`;
