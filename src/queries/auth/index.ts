import { useMutation, useQuery } from '@tanstack/react-query';
import { login, getUser } from 'api/auth';
import { QueryKeys, StorageKeys } from 'constant';
import { useUserStore } from 'store/useUserStore';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import { jwtDecode } from 'jwt-decode';

export const useLogin = () => {
  const { setIsLogin, setUser, logout } = useUserStore.getState();
  const navigate = useNavigate();

  const setLogoutTimer = (expiresIn: number) => {
    setTimeout(() => {
      logout();
      navigate('/login');
    }, expiresIn);
  };

  return useMutation({
    mutationKey: [QueryKeys.USER_DATA],
    mutationFn: login,
    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      setUser(data.userInfo);
      secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);

      const decodedToken: any = jwtDecode(data.accessToken);
      const expiresIn = decodedToken.exp * 1000 - Date.now();
      setLogoutTimer(expiresIn);

      navigate('/');
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
