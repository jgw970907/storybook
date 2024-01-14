import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
const Navigation = () => {
  return (
    <S.navContainer>
      <Link to={'./'}>
        <S.title>ADMIN5</S.title>
      </Link>
      <NavItem />
    </S.navContainer>
  );
};

export default Navigation;

const S = {
  navContainer: styled.div`
    width: 100%;
    height: 10rem;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.primary};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  title: styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.G_200};
  `,
};
