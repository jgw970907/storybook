import { useState, useEffect } from 'react';
import { addBannedWord, getBannedWords, deleteBannedWord } from 'api';

import * as S from 'styles/AdminStyledTemp';
import { BannedWord } from 'types';

const AdminManageBannedWords = () => {
  const [bannedWords, setBannedWords] = useState<BannedWord[]>([]);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    const fetchBannedWords = async () => {
      const response = await getBannedWords();
      if (response && response.status === 200) {
        const wordsArray = Object.values(response).filter((item) => typeof item === 'object');
        setBannedWords(wordsArray);
      }
    };
    fetchBannedWords();
  }, []);

  const handleAddWord = async () => {
    const response = await addBannedWord(newWord);
    if (response && response.status === 200) {
      const wordsArray = Object.values(response).filter((item) => typeof item === 'object');
      setBannedWords(wordsArray);
    }
    setNewWord('');
  };

  const handleDeleteWord = async (id: string) => {
    const response = await deleteBannedWord(id);
    if (response && response.status === 200) {
      const wordsArray = Object.values(response).filter((item) => typeof item === 'object');
      setBannedWords(wordsArray);
    }
  };

  return (
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>리뷰 금칙어 관리</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="금칙어는 유저가 작성 불가능한 단어"
        />
        <S.Button onClick={handleAddWord}>금칙어 추가</S.Button>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>순번</S.Tcolumn>
              <S.Tcolumn>금칙어</S.Tcolumn>
              <S.Tcolumn>삭제</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {bannedWords.length > 0 ? (
              bannedWords.map((data, index) => (
                <S.Trow key={data.id}>
                  <S.Tcell>{index + 1}</S.Tcell>
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
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageBannedWords;
