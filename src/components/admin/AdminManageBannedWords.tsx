import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { addBannedWord, getBannedWords, deleteBannedWord } from 'api/bannedword';
import { BannedWord } from 'types';
import styled from 'styled-components';
import * as S from 'styles/AdminStyledTemp';
import AdminLayout from 'components/admin/AdminLayout';
import AdminTable from 'components/admin/AdminTable';
import { Button } from 'components/shared';
import { Input } from 'styles/AdminStyledTemp';
import useAdminPagination from 'hooks/useAdminPagination';
import AdminPagination from './AdminPagination';

const take = 10;

const AdminManageBannedWords: React.FC = () => {
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([]);
  const [newWord, setNewWord] = useState('');
  const { currentPage, setCurrentPage, handleNextPage, handlePrevPage } = useAdminPagination();
  const [total, setTotal] = useState(0);
  const fetchBannedWords = useCallback(async () => {
    const response = await getBannedWords(take, currentPage);
    if (response && response.status === 200) {
      setBannedWords(response.data);
      setTotal(response.total);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchBannedWords();
  }, [fetchBannedWords, currentPage]);

  const handleAddWord = async () => {
    const response = await addBannedWord(newWord);
    if (response && response.status === 201) {
      setBannedWords(response.data);
      setTotal(response.total);
    }
    setNewWord('');
  };

  const handleDeleteWord = async (id: string) => {
    const response = await deleteBannedWord(id);
    if (response && response.status === 200) {
      setBannedWords(response.data);
      setTotal(response.total);
    }
  };

  return (
    <AdminLayout title="리뷰 금칙어 관리">
      <Align>
        <Input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="금칙어 작성"
        />
        <Button onClick={handleAddWord}>추가</Button>
      </Align>
      <AdminTable headers={['NO.', '금칙어', '삭제']}>
        {bannedWords.length > 0 ? (
          bannedWords.map((data, index) => (
            <Fragment key={data.id}>
              <S.Trow>
                <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                <S.Tcell width={100}>{data.word}</S.Tcell>
                <S.Tcell>
                  <S.TrashIcon onClick={() => handleDeleteWord(data.id)} />
                </S.Tcell>
              </S.Trow>
            </Fragment>
          ))
        ) : (
          <S.Trow>
            <S.Tcell colSpan={3}>금칙어가 없습니다.</S.Tcell>
          </S.Trow>
        )}
      </AdminTable>
      <S.PaginationWrapper>
        <AdminPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          total={total}
        />
      </S.PaginationWrapper>
    </AdminLayout>
  );
};

export default AdminManageBannedWords;

const Align = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;
