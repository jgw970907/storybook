import { useUserStore } from 'store/useUserStore';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'utils/StorageKeys';

export const login = async (user) => {
  if (!user.email || !user.password) return alert('이메일과 비밀번호를 입력해주세요');

  const token = btoa(`${user.email}:${user.password}`);
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    const data = await response.json();
    if (data.statusCode !== 401 || data.statusCode !== 400) {
      useUserStore.getState().setAccessToken(data.accessToken);
      secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
    } else {
      alert(data.message);
    }
    return { data: data.userInfo };
  } catch (error) {
    console.error(error);
  }
};

export const signup = async (user) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/register/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.statusCode === 201) {
      useUserStore.getState().setAccessToken(data.accessToken);
      secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, data.accessToken);
      secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, data.refreshToken);
    }
    return { data: data.userInfo };
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  useUserStore.getState().setAccessToken(null);
  useUserStore.getState().setRefreshToken(null);
  secureLocalStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
  location.replace('/admin/dev5/admin/login');
};
