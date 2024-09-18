import * as S from 'styles/SearchStyled';
import Dropdown from './Dropdown';
import { useEffect, useState } from 'react';
import { Select, Option } from 'styles/AdminStyledTemp';
interface SearchBarProps {
  setSearchTitle: (search: string) => void;
  setSearchAuthorName: (search: string) => void;
  setCategory?: (category: string) => void;
  order: 'DESC' | 'ASC' | 'CLICKS';
  setOrder: React.Dispatch<React.SetStateAction<'DESC' | 'ASC' | 'CLICKS'>>;
  backColorType: 'black' | 'gray';
}

const SearchBar = ({
  setSearchTitle,
  setSearchAuthorName,
  setCategory,
  order,
  setOrder,
  backColorType,
}: SearchBarProps) => {
  const [searchState, setSearchState] = useState('');
  const [searchOption, setSearchOption] = useState('제목');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value);
  };

  const onKeyPressSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchState);
    }
  };

  const onClickSearch = () => {
    if (!searchState) return alert('검색어를 입력해주세요');
    setSearch(searchState);
  };

  const onClickReset = () => {
    setSearch('');
    setSearchState('');
    if (setCategory) setCategory('');
    setSearchOption('제목');
  };

  const setSearch = (search: string) => {
    if (searchOption === '제목') {
      setSearchTitle(search);
      setSearchAuthorName('');
    } else {
      setSearchAuthorName(search);
      setSearchTitle('');
    }
  };

  return (
    <S.WrapperSearch backColorType={backColorType}>
      <S.Search>
        <S.SearchLeft>
          <Select
            size={'SMALL'}
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
          >
            <Option size={'SMALL'} value="제목">
              제목
            </Option>
            <Option size={'SMALL'} value="작가">
              작가
            </Option>
          </Select>
          <S.SearchInput
            placeholder="검색어를 입력하세요"
            value={searchState}
            onChange={onChangeSearch}
            onKeyDown={onKeyPressSearch}
          />
        </S.SearchLeft>
        <S.SearchRight>
          <S.Button
            btncolortype={'primary'}
            onClick={onClickSearch}
            disabled={status === 'loading'}
          >
            검색
          </S.Button>
          <S.Button btncolortype={'danger'} onClick={onClickReset} disabled={status === 'loading'}>
            초기화
          </S.Button>
          <Dropdown order={order} setOrder={setOrder} />
        </S.SearchRight>
      </S.Search>
    </S.WrapperSearch>
  );
};

export default SearchBar;
