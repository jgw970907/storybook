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

import AdminMain from "./pages/AdminMain";
import AdminBoardUpdate from "./pages/AdminBoardUpdate";
import AdminBoardWrote from "./pages/AdminBoardWrote";
import AdminAccountManage from "./pages/AdminAccountManage";
import BoardDetail from "pages/user/dev5/pages/BoardDetail";
import BoardMain from "pages/user/dev5/pages/BoardMain";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
  async function initializeAuth() {
    const currentPath = location.pathname;
    const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN);
    if (!refreshToken) {
      navigate("/admin/dev5/login");
      return;
    }

    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      useUserStore.getState().setAccessToken(newAccessToken);
      const user = await userMe();
      useUserStore.getState().setUser(user);
    } catch (error) {
      console.error("Authentication failed:", error);
      // 에러 처리 로직, 예를 들어 로그인 페이지로 리디렉션
      navigate("/admin/dev5/login");
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const path = location.pathname;
    const isLoginRequired = path.startsWith("/admin/dev5/admin");
    if (
      location.pathname !== ("/admin/dev5/login" || "/admin/dev5/signup") &&
      isLoginRequired &&
      !user
    ) {
      initializeAuth();
    } else {
      setIsLoading(false);
    }
  }, [location.pathname]);

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
          <Route path="/board" element={<BoardMain />} />
          <Route path="/board/board/:boardId" element={<BoardDetail />} />
          {/* 로그인된 유저 입장 가능 */}
          <Route element={<AuthRoutes user={user} />}>
            <Route exact path="/" element={<AdminMain />} />
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
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/signup" element={<SignupPage />} />
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
