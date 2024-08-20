import { useMutation, useQuery } from '@tanstack/react-query';
import { login, getUser } from 'api/auth';
import { QueryKeys, StorageKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

export const useLogin = () => {
  const { setIsLogin, setUser } = useUserStore.getState();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: [QueryKeys.USER_DATA],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      setUser(data.userInfo);
      secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
      navigate('/user');
    },
  });
};

export const useGetUser = (flag: boolean) => {
  return useQuery({
    queryKey: [QueryKeys.USER_DATA],
    queryFn: getUser,
    enabled: !!flag,
  });
};
