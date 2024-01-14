import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import { FaUserFriends } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';
import { FaRegCommentDots } from 'react-icons/fa6';
import styled from 'styled-components';
const SidebarMenuItem = () => {
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);
  return (
    <>
      <Link to="/admin/dev5/admin/board-new">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/board-new' ? true : false}>
          {' '}
          <FaPencil size={30} />
          <span>글 작성하기</span>
        </S.menuItemContainer>
      </Link>
      <Link to="/admin/dev5/admin/account">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/account'}>
          {' '}
          <FaUserCircle size={30} />
          <span>계정 관리</span>
        </S.menuItemContainer>
      </Link>
      <Link to="/admin/dev5/admin/board-wrote">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/board-wrote'}>
          {' '}
          <TfiWrite size={30} />
          <span>내가 쓴 글</span>
        </S.menuItemContainer>
      </Link>
      <Link to="/admin/dev5/admin/friends">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/friends'}>
          {' '}
          <FaUserFriends size={30} />
          <span>친구 관리</span>
        </S.menuItemContainer>
      </Link>
      <Link to="/admin/dev5/admin/message">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/message'}>
          {' '}
          <IoSendSharp size={30} />
          <span>쪽지함</span>
        </S.menuItemContainer>
      </Link>
      <Link to="/admin/dev5/admin/comment">
        <S.menuItemContainer $isactive={path === '/admin/dev5/admin/comment'}>
          {' '}
          <FaRegCommentDots size={30} />
          <span>댓글 관리</span>
        </S.menuItemContainer>
      </Link>
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

    background-color: ${(props) => (props.$isactive ? '#595959' : 'none')};
    border: ${(props) => (props.$isactive ? '10px' : 'none')};
    border-color: ${(props) => (props.$isactive ? '#595959' : 'none')};
  `,
};
