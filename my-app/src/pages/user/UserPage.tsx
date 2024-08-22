import { styled } from 'styled-components';
import { Stars, Stars2, Stars3 } from 'styles/StarParticles';
import Loader from 'components/shared/Loader';
import NotFound from 'pages/NotFound';
import BookList from 'components/user/BookList';
import SearchBar from 'components/shared/SearchBar';
import { useBookData } from 'hooks/useBookData';
import { useSearch } from 'hooks/useSearch';
import { useMemo } from 'react';

const UserPage = () => {
  const { searchState, setSearchState, search, setSearch, order, setOrder } = useSearch();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, hasBooks } = useBookData(
    order,
    search,
  );

  const memoizedBookList = useMemo(
    () => (
      <BookList
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    ),
    [data, fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  return (
    <Main>
      <Stars />
      <Stars2 />
      <Stars3 />

      <SearchBar
        searchState={searchState}
        setSearchState={setSearchState}
        setSearch={setSearch}
        order={order}
        setOrder={setOrder}
      />
      <LayoutContainer>
        {status === 'loading' ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : hasBooks ? (
          memoizedBookList
        ) : (
          <NotFound search={search} />
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

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: relative;
`;
