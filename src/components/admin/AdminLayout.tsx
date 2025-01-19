import React, { ReactNode } from 'react';
import * as S from 'styles/AdminStyledTemp';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>{title}</S.ContainerTitle>
        </S.ContainerHeader>
        {children}
      </S.Container>
    </S.Layout>
  );
};

export default AdminLayout;
