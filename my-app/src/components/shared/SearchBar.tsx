import * as S from 'styles/SearchStyled';
import Dropdown from './Dropdown';
interface SearchBarProps {
  searchState: string;
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
  setSearch: (search: string) => void;
  order: 'DESC' | 'ASC' | 'CLICKS';
  setOrder: React.Dispatch<React.SetStateAction<'DESC' | 'ASC' | 'CLICKS'>>;
}
const SearchBar = ({ searchState, setSearchState, setSearch, order, setOrder }: SearchBarProps) => {
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
  };
  return (
    <S.WrapperSearch>
      <S.Search>
        <S.SearchInput
          placeholder="검색어를 입력하세요"
          value={searchState}
          onChange={onChangeSearch}
          onKeyDown={onKeyPressSearch}
        />
        <S.SearchButton onClick={onClickSearch} disabled={status === 'loading'}>
          검색
        </S.SearchButton>
        <S.ResetButton onClick={onClickReset} disabled={status === 'loading'}>
          초기화
        </S.ResetButton>
      </S.Search>
      <Dropdown order={order} setOrder={setOrder} />
    </S.WrapperSearch>
  );
};
export default SearchBar;
