import qs from 'qs';
import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'constant';
import { fetchAccessTokenWithRefresh } from 'utils/auth';

const injectInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.defaults.paramsSerializer = (params) => {
    return qs.stringify(params);
  };

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
      } else {
        config.headers['Content-Type'] = 'application/json';
      }
      if (config.headers.Authorization) return config;

      const accessToken = secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN) as string;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => {
      console.error(error);
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const { config, response } = error;
      let isRefreshing = false;
      if (response?.status === 401 || response?.status === 404) {
        if (!isRefreshing) {
          try {
            const refreshToken = secureLocalStorage.getItem(StorageKeys.REFRESH_TOKEN) as string;
            if (!refreshToken) {
              throw new Error('Refresh token not found');
            }

            // 새 accessToken 요청
            const newAccessToken = await fetchAccessTokenWithRefresh();
            secureLocalStorage.setItem(StorageKeys.ACCESS_TOKEN, newAccessToken);

            // 요청 헤더 업데이트 후 다시 요청
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return instance.request(config);
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            alert('다시 로그인 해주세요.');
            secureLocalStorage.removeItem(StorageKeys.REFRESH_TOKEN);
            secureLocalStorage.removeItem(StorageKeys.ACCESS_TOKEN);
            window.location.replace('/gptpage');
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default injectInterceptors;
