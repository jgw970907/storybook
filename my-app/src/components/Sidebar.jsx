import React, { useContext } from "react";
import styled from "styled-components";
import SidebarMenu from "./SidebarMenu";
import { Hamburger } from "../context/useContext";

const Sidebar = () => {
  const { open } = useContext(Hamburger);
  return (
    <>
      <S.container $open={open}>
        <SidebarMenu />
      </S.container>
    </>
  );
};

export default Sidebar;

const S = {
  container: styled.div`
    position: fixed;
    left: 0;
    width: 20%;
    height: 100vh;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.G_400};
    transition: transform 0.5s ease-in-out;
    transform: ${(props) =>
      props.$open ? "translateX(0)" : "translateX(-100%)"};
  `,
  button: styled.button`
    position: fixed;
    top: 20;
    left: 0;
    width: 5rem;
    height: 5rem;
    background-color: ${({ theme }) => theme.colors.G_400};
  `,
};
