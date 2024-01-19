import { Route, Routes, Outlet } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import secureLocalStorage from "react-secure-storage";
import { StorageKeys } from "utils/StorageKeys";

import { Hamburger } from "./context/useContext";
import { refreshAccessToken, userMe } from "./api/auth";
import Sidebar from "./dev5components/Sidebar";
import Navigation from "./dev5components/Navigation";
import AdminBoardWrite from "./pages/AdminBoardWrite";
import AdminMain from "./pages/AdminMain";
import AdminBoardUpdate from "./pages/AdminBoardUpdate";
import AdminBoardWrote from "./pages/AdminBoardWrote";
import AdminAccountManage from "./pages/AdminAccountManage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthRoutes from "./dev5components/AuthRoutes";
import NotAuthRoutes from "./dev5components/NotAuthRoutes";
import * as S from "styles/LoginStyled";
const Layout = ({ open }) => {
  return (
    <>
      <Navigation />
      <Sub.main>
        <Sidebar />
        <Sub.outlet $open={open}>
          <Outlet />
        </Sub.outlet>
      </Sub.main>
    </>
  );
};
export default function Dev5() {
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // 로그인 여부 확인
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치 정보 가져오기
  console.log("location", location);
  async function initializeAuth() {
    const currentPath = location.pathname;
    const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      console.log("newAccessToken", newAccessToken);
      useUserStore.getState().setAccessToken(newAccessToken);
      const user = await userMe();
      useUserStore.getState().setUser(user);
      if (currentPath === "/admin/dev5/admin/login") {
        navigate("/"); // 로그인 페이지에서 인증 후 메인 페이지로 이동
      } else {
        navigate(currentPath); // 다른 페이지에서 인증 후 현재 페이지로 복원
      }
      setIsLoading(false);
    } else {
      navigate("/admin/dev5/admin/login");
    }
  }
  useEffect(() => {
    initializeAuth();
  }, []);
  if (isLoading) {
    return (
      <S.Body>
        <S.StyledLoader />
      </S.Body>
    );
  }

  return (
    <Hamburger.Provider value={{ open, setOpen }}>
      <Routes>
        <Route path="/" element={<Layout open={open} />}>
          {/* 로그인된 유저 입장 가능 */}
          <Route element={<AuthRoutes user={user} />}>
            <Route exact path="/" element={<AdminMain />} />
            <Route
              exact
              path="/admin/board-new"
              element={<AdminBoardWrite />}
            />
            <Route
              exact
              path="/admin/board-update/:boardId"
              element={<AdminBoardUpdate />}
            />
            <Route
              exact
              path="/admin/board-wrote"
              element={<AdminBoardWrote />}
            />
            <Route
              exact
              path="/admin/account"
              element={<AdminAccountManage />}
            />
          </Route>
          {/* 로그아웃된 유저 입장 가능 */}
          <Route element={<NotAuthRoutes user={user} />}>
            <Route exact path="/admin/login" element={<Login />} />
            <Route exact path="/admin/signup" element={<Signup />} />
          </Route>
        </Route>
      </Routes>
    </Hamburger.Provider>
  );
}

const Sub = {
  main: styled.div`
    display: flex;
    width: 100%;
    padding-top: 10rem;
  `,
  outlet: styled.div`
    padding: 3rem;
    transition: transform 0.5s ease-in-out;
    transform: ${(props) =>
      props.$open ? "translateX(20%) " : "translateX(0) "};
    width: ${(props) => (props.$open ? "80%" : "100%")};
    margin-left: ${(props) => (props.$open ? "5%" : "0")};
  `,
};
