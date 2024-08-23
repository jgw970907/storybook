import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUser, getUserlist, patchUser } from 'api/user';
import { AxiosError } from 'axios';
import { QueryKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';

const KEY = [QueryKeys.USER, 'userlist'];

export const GetUserlist = () => {
  const { isLogin } = useUserStore.getState();

  return useQuery({
    queryKey: KEY,
    queryFn: getUserlist,
    enabled: !!isLogin,
    select: (users) =>
      users &&
      Object.keys(users)
        .filter((key) => key !== 'status')
        .map((key) => users[parseInt(key)]),
  });
};

export const DeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: KEY,
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(KEY);
    },
  });
};
export const PatchUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QueryKeys.USER, 'userInfo'],
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.USER_DATA]);
      alert('유저데이터 수정을 성공했습니다.');
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};
