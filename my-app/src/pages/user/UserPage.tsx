import { useState, useMemo } from 'react';
import { styled } from 'styled-components';
import * as S from 'styles/SearchStyled';
import { getStyledColor } from 'utils';
import Book from '../../components/user/Book';
import { bookQueries } from 'queries';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import { CustomModal } from 'components/modal/CustomModal';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import Dropdown from 'components/shared/Dropdown';
import Loader from 'components/shared/Loader';
import { useSearchStore } from 'store/useSearchStore';
import NotFound from 'pages/NotFound';
import { incrementClicks } from 'api/book';

const UserPage = () => {
  const { useInfinityScroll } = bookQueries;
  const [modalOpen, setModalOpen] = useState(false);
  const [searchState, setSearchState] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [order, setOrder] = useState<'DESC' | 'ASC' | 'CLICKS'>('DESC');
  const { search, setSearch } = useSearchStore();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinityScroll(
    order,
    search,
  );
  const targetRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

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

  const unshowScroll = () => {
    document.body.style.overflow = 'hidden';
  };
  const showScroll = () => {
    document.body.style.overflow = 'unset';
  };
  const selectedBook = useMemo(() => {
    return data?.pages.flatMap((page) => page?.data).find((book) => book?.id === selectedBookId);
  }, [data, selectedBookId]);

  const handleClick = (id: string) => {
    setModalOpen(true);
    unshowScroll();
    setSelectedBookId(id); // 선택된 책의 ID를 상태에 저장

    // const cookieName = `book_${id}_clicked`;
    // const clicked = Cookies.get(cookieName);
    if (id) {
      incrementClicks(id);
    } else {
      alert('책이 삭제되었거나 잘못된 경로입니다.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Main>
      <Stars />
      <Stars2 />
      <Stars3 />
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
        <Dropdown order={order} setOrder={setOrder} status={status} />
      </S.WrapperSearch>

      <LayoutContainer>
        {status === 'loading' ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <Layout>
            <TotheTop onClick={scrollToTop}>Top</TotheTop>
            {data?.pages.some((page) => (page?.data ?? []).length > 0) ? (
              data?.pages.map((page) =>
                page?.data.map((book, index) => {
                  const isLastItem = page.data.length - 1 === index;
                  return (
                    <Book
                      key={book.id}
                      ref={isLastItem ? targetRef : null}
                      {...book}
                      onClick={() => handleClick(book.id)}
                    />
                  );
                }),
              )
            ) : (
              <NotFound search={search} />
            )}
          </Layout>
        )}
        {modalOpen && selectedBook && (
          <CustomModal
            bookId={selectedBookId}
            book={selectedBook}
            setModalOpen={setModalOpen}
            showScroll={showScroll}
          />
        )}
      </LayoutContainer>
    </Main>
  );
};

export default UserPage;

const Main = styled.main`
  width: 100%;
  min-height: 1500px;
  display: flex;
  flex-direction: column;
  padding-top: 10%;
  position: relative;
  background-color: #121212;
`;
const LayoutContainer = styled.div`
  display: flex;
`;

const Layout = styled.div`
  width: 1200px;
  margin: 0 auto;
  background-color: ${getStyledColor('background', 'dark')};
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(400px, auto);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(350px, auto);
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
`;

const TotheTop = styled.button`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 200;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #000;
  color: #fff;
  border: 2px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition:
    color 0.2s,
    border 0.2s,
    background-color 0.2s;

  &:hover {
    color: ${getStyledColor('white', 'high')};
    border: 2px solid ${getStyledColor('teal', 600)};
    background-color: ${getStyledColor('teal', 600)};
  }
  @media screen and (max-width: 1400px) {
    font-size: 10px;
    padding: 10px 5px;
    border: 1px solid rgb(210, 204, 193);
  }
`;
