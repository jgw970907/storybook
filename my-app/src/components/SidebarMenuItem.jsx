import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaPencil } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

import styled from "styled-components";
const SidebarMenuItem = () => {
  const location = useLocation();
  const path = location.pathname;
  const tabs = [
    {
      to: "/admin/dev5/",
      icon: <FaUserCircle size={30} />,
      name: "계정 관리",
    },
    {
      to: "/admin/dev5/admin/board-new",
      icon: <FaPencil size={30} />,
      name: "글 작성하기",
    },
    {
      to: "/admin/dev5/admin/board-wrote",
      icon: <TfiWrite size={30} />,
      name: "내가 쓴 글",
    },
  ];
  return (
    <>
      {tabs.map((tab) => (
        <Link to={tab.to} key={tab.name}>
          <S.menuItemContainer $isactive={path === tab.to}>
            {tab.icon}
            <div>{tab.name}</div>
          </S.menuItemContainer>
        </Link>
      ))}
    </>
  );
};

export default SidebarMenuItem;

const S = {
  menuItemContainer: styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
    color: black;
    &:hover {
      background-color: ${({ theme }) => theme.colors.G_200};
    }

    background-color: ${(props) => (props.$isactive ? "#595959" : "none")};
    border: ${(props) => (props.$isactive ? "10px" : "none")};
    border-color: ${(props) => (props.$isactive ? "#595959" : "none")};
  `,
};
