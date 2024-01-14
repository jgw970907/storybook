import React from 'react';
import styled from 'styled-components';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => {
  return (
    <S.menuContainer>
      <SidebarMenuItem />
    </S.menuContainer>
  );
};

export default SidebarMenu;

const S = {
  menuContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};
