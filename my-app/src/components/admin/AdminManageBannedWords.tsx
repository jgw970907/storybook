import { useState, useEffect, useCallback } from 'react';
import { addBannedWord, getBannedWords, deleteBannedWord } from 'api';

import * as S from 'styles/AdminStyledTemp';
import { BannedWord } from 'types';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import styled from 'styled-components';

const take = 10;

const AdminManageBannedWords = () => {
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([]);
  const [newWord, setNewWord] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleNextPage = useCallback((pageNum: number) => {
    setCurrentPage(pageNum);
  }, []);

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
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>리뷰 금칙어 관리</S.ContainerTitle>
        </S.ContainerHeader>
        <Align>
          <S.Input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="금칙어 작성"
          />
          <S.Button onClick={handleAddWord}>추가</S.Button>
        </Align>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>NO.</S.Tcolumn>
              <S.Tcolumn>금칙어</S.Tcolumn>
              <S.Tcolumn>삭제</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {bannedWords.length > 0 ? (
              bannedWords.map((data, index) => (
                <S.Trow key={data.id}>
                  <S.Tcell>{(currentPage - 1) * take + index + 1}</S.Tcell>
                  <S.Tcell>{data.word}</S.Tcell>
                  <S.Tcell>
                    <S.Button onClick={() => handleDeleteWord(data.id)}>삭제</S.Button>
                  </S.Tcell>
                </S.Trow>
              ))
            ) : (
              <S.Trow>
                <S.Tcell colSpan={3}>등록된 금지어가 없습니다.</S.Tcell>
              </S.Trow>
            )}
          </S.Tbody>
        </S.Table>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
          <S.Pagination>
            <S.PaginationButton
              disabled={currentPage === 1}
              onClick={() => handleNextPage(currentPage - 1)}
            >
              <FaAngleLeft />
            </S.PaginationButton>
            <div>
              {Array.from({ length: Math.ceil(total / take) }, (_, index) => (
                <S.PaginationNumber
                  key={index}
                  onClick={() => handleNextPage(index + 1)}
                  $isCurrentPage={currentPage === index + 1}
                >
                  {index + 1}
                </S.PaginationNumber>
              ))}
            </div>
            <S.PaginationButton
              disabled={currentPage >= Math.ceil(total / take)}
              onClick={() => handleNextPage(currentPage + 1)}
            >
              <FaAngleRight />
            </S.PaginationButton>
          </S.Pagination>
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageBannedWords;

const Align = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 30px;
`;
