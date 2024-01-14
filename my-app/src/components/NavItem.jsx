import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logout } from '../api/auth';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'utils/StorageKeys';
const NavItem = () => {
  return (
    <S.container>
      {secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN) ? (
        <>
          <div onClick={logout}>로그아웃</div>
          <Link to={'/user/dev5'}>
            <div>게시판</div>
          </Link>
          <Link to={'/admin'}>
            <div>관리자</div>
          </Link>
          <Link to={'/'}>
            <div>유저</div>
          </Link>
        </>
      ) : (
        <>
          <Link to={'./admin/login'}>
            <div>로그인</div>
          </Link>
          <div>회원가입</div>
        </>
      )}
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
