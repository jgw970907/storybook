import { getAccessWithApi } from 'api/auth';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'constant';

export const getAccessToken = (): string | null =>
  secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN) as string | null;
export const setAccessToken = (token: string) =>
  secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, token);
export const getRefreshToken = (): string | null =>
  secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN) as string | null;
export const setRefreshToken = (token: string) =>
  secureLocalStorage.setItem(StorageKeys.REFRESH_TOKEN, token);
export const clearToken = () => {
  secureLocalStorage.removeItem(StorageKeys.ACCESS_TOKEN);
  secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
};
export const fetchAccessTokenWithRefresh = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearToken();
    throw new Error('Refresh token not found');
  }

  try {
    const res = await getAccessWithApi();
    const accessToken = res;
    setAccessToken(accessToken);
    return accessToken;
  } catch {
    clearToken();
    throw new Error('Failed to fetch access token');
  }
};
