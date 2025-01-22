import axios, { AxiosRequestConfig } from 'axios';
import injectInterceptors from './interceptors';

const BASE_URL = 'https://storybooksnow.com';
const instance = injectInterceptors(axios.create({ baseURL: BASE_URL, withCredentials: true }));

export const getAxiosInstance = (endpoint: string) => {
  const get = async <T>(queries: object = {}) => {
    try {
      const res = await instance.get<T>(endpoint, {
        params: queries,
      } as AxiosRequestConfig);
      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const post = async <T>(params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.post<T>(endpoint, params, config);
      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const patch = async <T>(params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const res = await instance.patch<T>(endpoint, params, config);
      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const patchWithoutToken = async <T>(params: object = {}, config?: AxiosRequestConfig) => {
    try {
      const axiosInstance = axios.create({ baseURL: BASE_URL, withCredentials: true });
      const res = await axiosInstance.patch<T>(endpoint, params, config);
      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const remove = async <T>(params: object = {}) => {
    try {
      const res = await instance.delete<T>(endpoint, {
        data: params,
      });
      const { data, status } = res;
      return { ...data, status };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  };

  return { get, post, patch, patchWithoutToken, remove };
};

export default getAxiosInstance;
