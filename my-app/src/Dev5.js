import { Route, Routes, Outlet } from "react-router-dom";
import { useUserStore } from "store/useUserStore";
import React, { useState } from "react";
import styled from "styled-components";

import { Hamburger } from "./context/useContext";
import Sidebar from "./dev5components/Sidebar";
import Navigation from "./dev5components/Navigation";
import AdminBoardWrite from "./pages/AdminBoardWrite";
import AdminMain from "./pages/AdminMain";
import AdminBoardUpdate from "./pages/AdminBoardUpdate";
import AdminBoardWrote from "./pages/AdminBoardWrote";
import AdminAccountManage from "./pages/AdminAccountManage";
import AdminComment from "./pages/AdminComment";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
const Layout = ({ open }) => {
  return (
    <>
      <Navigation />
      <S.main>
        <Sidebar />
        <S.outlet $open={open}>
          <Outlet />
        </S.outlet>
      </S.main>
    </>
  );
};
export default function Dev5() {
  const accessToken = useUserStore((state) => state.accessToken);
  const [open, setOpen] = useState(false);
  return (
    <Hamburger.Provider value={{ open, setOpen }}>
      <Routes>
        <Route path="/" element={<Layout open={open} />}>
          <Route exact path="/" element={<AdminMain />} />
          <Route exact path="/admin/login" element={<Login />} />
          <Route exact path="/admin/signup" element={<Signup />} />
          <Route exact path="/admin/board-new" element={<AdminBoardWrite />} />
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
          <Route exact path="/admin/account" element={<AdminAccountManage />} />
          <Route exact path="/admin/comment" element={<AdminComment />} />
        </Route>
      </Routes>
    </Hamburger.Provider>
  );
}

const S = {
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
