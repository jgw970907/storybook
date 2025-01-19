import { Fragment, useEffect } from 'react';

import * as S from 'styles/AdminStyledTemp';
import { bookQueries } from 'queries';
import { useSelectedBook } from 'store/useSelectedBooks';
import { getDateStr } from 'utils';
import { BookInfoType } from 'types/bookTypes';
import { useQueryClient } from '@tanstack/react-query';
import { getNextBooks } from 'api/book';
import Loader from 'components/shared/Loader';
import { QueryKeys } from 'constant';
import useAdminPagination from 'hooks/useAdminPagination';
import AdminPagination from 'components/admin/AdminPagination';
import AdminLayout from 'components/admin/AdminLayout';
import AdminTable from 'components/admin/AdminTable';
import { LoaderScreen } from 'styles/LoaderWrapper';
const AdminManage = () => {
  const { useDeleteBook, useGetBooksAdmin } = bookQueries;
  const { currentPage, setCurrentPage, handleNavigate, handlePrevPage, handleNextPage } =
    useAdminPagination();
  const { setSelectedBook } = useSelectedBook();
  const { mutate: remove } = useDeleteBook(currentPage);

  const { data: books, status: bookGetLoading } = useGetBooksAdmin({
    take: 10,
    page: currentPage,
    order__createdAt: 'DESC',
    where__title__i_like: '',
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage) {
      const key = [QueryKeys.ADMIN, 'books', (currentPage + 1).toString()];
      queryClient.prefetchQuery({
        queryKey: key,
        queryFn: () =>
          getNextBooks({
            take: 10,
            page: currentPage + 1,
            order__createdAt: 'DESC',
            where__title__i_like: '',
          }),
      });
    }
  }, [currentPage, queryClient]);

  const handleEdit = (id: string) => {
    if (!books) return;
    const selectedBook: BookInfoType | undefined = books.data.find((book) => book.id === id);
    if (!selectedBook) return;
    const { images, title, content, authorName, category } = selectedBook;

    setSelectedBook({ title, content, images, authorName, category });
    handleNavigate('BookTakelistRes', id);
  };

  const handleRemove = (id: string) => {
    remove(id);
  };

  if (bookGetLoading === 'loading') {
    return (
      <LoaderScreen>
        <Loader />
      </LoaderScreen>
    );
  }

  return books && books.data.length > 0 ? (
    <AdminLayout title="책 관리">
      <AdminTable headers={['No', '제목', '생성자', '조회수', '생성일', '수정 및 삭제']}>
        {books.data.map((book, index) => (
          <Fragment key={book.id}>
            <S.Trow>
              <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
              <S.Tcell width={100}>{book.title}</S.Tcell>
              <S.Tcell width={250}>{book.authorName}</S.Tcell>
              <S.Tcell>{book.clicks}</S.Tcell>
              <S.Tcell>{getDateStr(book.createdAt)}</S.Tcell>
              <S.Tcell>
                <S.EditIcon onClick={() => handleEdit(book.id)} />
                <S.TrashIcon onClick={() => handleRemove(book.id)} />
              </S.Tcell>
            </S.Trow>
          </Fragment>
        ))}
      </AdminTable>

      <S.PaginationWrapper>
        <AdminPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={books.total}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
        />
      </S.PaginationWrapper>
    </AdminLayout>
  ) : (
    <AdminLayout title="책 관리">
      <S.NoMessage>책이 없습니다.</S.NoMessage>
    </AdminLayout>
  );
};

export default AdminManage;
