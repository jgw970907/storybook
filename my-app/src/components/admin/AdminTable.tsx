import React, { ReactNode } from 'react';
import * as S from 'styles/AdminStyledTemp';

interface AdminTableProps {
  headers: string[];
  children: ReactNode;
}

const AdminTable: React.FC<AdminTableProps> = ({ headers, children }) => {
  return (
    <S.Table>
      <S.Theader>
        <S.Trow>
          {headers.map((header, index) => (
            <S.Tcolumn key={index}>{header}</S.Tcolumn>
          ))}
        </S.Trow>
      </S.Theader>
      <S.Tbody>{children}</S.Tbody>
    </S.Table>
  );
};

export default AdminTable;
