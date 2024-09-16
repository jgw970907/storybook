import AdminLayout from 'components/admin/AdminLayout';
import AdminPagination from 'components/admin/AdminPagination';
import AdminTable from 'components/admin/AdminTable';
import { Loader } from 'components/shared';
import useAdminPagination from 'hooks/useAdminPagination';
import { useDeleteUser, useGetUserlist } from 'queries/users';
import { Fragment } from 'react';
import { useUserStore } from 'store/useUserStore';
import * as S from 'styles/AdminStyledTemp';
import { LoaderScreen } from 'styles/LoaderWrapper';

const AdminManageUsers = () => {
  const { user } = useUserStore();
  const userRole = user?.role;
  const { data: users, status: usersStatus, isLoading } = useGetUserlist();
  const { mutate } = useDeleteUser();
  const { currentPage, setCurrentPage, handleNextPage, handlePrevPage } = useAdminPagination();

  if (!users || isLoading) {
    return (
      <LoaderScreen>
        <Loader />
      </LoaderScreen>
    );
  }

  const handleRemove = (id: string, name: string, role: string) => {
    if (userRole === role) {
      console.error('권한이 같습니다.');
      return;
    }
    alert(`${name}이 제거되었습니다.`);
    mutate(id);
  };

  return (
    <AdminLayout title="사용자 목록">
      <AdminTable headers={['No.', '이름', '닉네임', '이메일', '권한', '회원 탈퇴']}>
        {usersStatus === 'success' &&
          users.map((user, index) => (
            <Fragment key={user.id}>
              <S.Trow>
                <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                <S.Tcell width={100}>{user.name}</S.Tcell>
                <S.Tcell width={250}>{user.nickname}</S.Tcell>
                <S.Tcell>{user.email}</S.Tcell>
                <S.Tcell>{user.role}</S.Tcell>
                <S.Tcell>
                  {userRole === 'ADMIN' && user.role === 'USER' ? (
                    <S.TrashIcon onClick={() => handleRemove(user.id, user.name, user.role)} />
                  ) : (
                    '-'
                  )}
                </S.Tcell>
              </S.Trow>
            </Fragment>
          ))}
      </AdminTable>
      <S.PaginationWrapper>
        <AdminPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          total={users.length}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
        />
      </S.PaginationWrapper>
    </AdminLayout>
  );
};

export default AdminManageUsers;
