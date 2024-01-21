import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { logout } from "../api/auth";
import { useUserStore } from "store/useUserStore";

const NavItem = () => {
  const { user } = useUserStore();
  return (
    <S.container>
      {user ? (
        <>
          <div onClick={logout}>로그아웃</div>

          <Link to={"/admin"}>
            <div>관리자</div>
          </Link>
          <Link to={"/"}>
            <div>유저</div>
          </Link>
        </>
      ) : (
        <>
          <Link to={"./login"}>
            <div>로그인</div>
          </Link>
          <Link to={"./signup"}>
            <div>회원가입</div>
          </Link>
        </>
      )}
      <Link to={"./board"}>
        <div>게시판</div>
      </Link>
    </S.container>
  );
};

export default NavItem;

const S = {
  container: styled.div`
    padding: 20px;
    color: white;
    display: flex;
    gap: 1rem;
    & > div {
      cursor: pointer;
    }
  `,
};
