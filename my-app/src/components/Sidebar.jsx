import React from 'react';
import styled from 'styled-components';
import SidebarMenu from './SidebarMenu';
const Sidebar = () => {
  return (
    <S.container>
      <SidebarMenu />
    </S.container>
  );
};

export default Sidebar;

const S = {
  container: styled.div`
    width: 20%;
    height: 100vh;
    padding: 3rem;
    background-color: ${({ theme }) => theme.colors.G_400};
  `,
};
