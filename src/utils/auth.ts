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

export const fetchAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error('No refresh token available');

  const response = await getAccessWithApi();

  if (response) {
    const accessToken = response;
    setAccessToken(accessToken);
    return accessToken;
  } else {
    throw new Error('Failed to refresh access token');
  }
};
