import AdminPagination from 'components/admin/AdminPagination';
import { Loader } from 'components/shared';
import useAdminPagination from 'hooks/useAdminPagination';
import { useDeleteUser, useGetUserlist } from 'queries/users';
import { Fragment } from 'react';
import { useUserStore } from 'store/useUserStore';
import * as S from 'styles/AdminStyledTemp';

const AdminManageUsers = () => {
  const { user } = useUserStore();
  const userRole = user?.role;
  const { data: users, status: usersStatus, isLoading } = useGetUserlist();
  const { mutate } = useDeleteUser();
  const { currentPage, setCurrentPage, handleNextPage, handlePrevPage } = useAdminPagination();

  if (!users || isLoading) {
    return <Loader />;
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
    <S.Layout>
      <S.Container>
        <S.ContainerHeader>
          <S.ContainerTitle>사용자 목록</S.ContainerTitle>
        </S.ContainerHeader>
        <S.Table>
          <S.Theader>
            <S.Trow>
              <S.Tcolumn>No.</S.Tcolumn>
              <S.Tcolumn>이름</S.Tcolumn>
              <S.Tcolumn>닉네임</S.Tcolumn>
              <S.Tcolumn>이메일</S.Tcolumn>
              <S.Tcolumn>권한</S.Tcolumn>
              <S.Tcolumn>회원 탈퇴</S.Tcolumn>
            </S.Trow>
          </S.Theader>
          <S.Tbody>
            {usersStatus === 'success' &&
              users.map((user, index) => {
                return (
                  <Fragment key={user.id}>
                    <S.Trow>
                      <S.Tcell width={30}>{(currentPage - 1) * 10 + index + 1}</S.Tcell>
                      <S.Tcell width={100}>{user.name}</S.Tcell>
                      <S.Tcell width={250}>{user.nickname}</S.Tcell>
                      <S.Tcell>{user.email}</S.Tcell>
                      <S.Tcell>{user.role}</S.Tcell>
                      <S.Tcell>
                        {userRole === 'ADMIN' && user.role === 'USER' ? (
                          <S.TrashIcon
                            onClick={() => handleRemove(user.id, user.name, user.role)}
                          />
                        ) : (
                          '-'
                        )}
                      </S.Tcell>
                    </S.Trow>
                  </Fragment>
                );
              })}
          </S.Tbody>
        </S.Table>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
          }}
        >
          <AdminPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={users.length}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
          />
        </div>
      </S.Container>
    </S.Layout>
  );
};

export default AdminManageUsers;
