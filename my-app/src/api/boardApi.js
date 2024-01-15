import secureLocalStorage from 'react-secure-storage';
import { StorageKeys } from 'utils/StorageKeys';
const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const getBoards = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api5s`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401) {
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }
    return { data: res.data };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

export const getBoard = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api5s/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401) {
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }
    return { data: res };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

export const createBoard = async (board) => {
  if (board.title === '' || board.content === '') return alert('제목과 내용을 입력해주세요');
  const accessToken = secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN);
  try {
    const response = await fetch(`${BASE_URL}/api5s`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(board),
    });
    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401)
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    return { data: res.data };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

export const patchBoard = async (board) => {
  const accessToken = secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN);
  try {
    const response = await fetch(`${BASE_URL}/api5s/${board.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(board),
    });
    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401)
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    return { data: res.data };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

export const deleteBoard = async (id) => {
  const accessToken = secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN);
  try {
    const response = await fetch(`${BASE_URL}/api5s/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401)
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    return { data: res.data };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  const accessToken = secureLocalStorage.getItem(StorageKeys.ACCESS_TOKEN);
  try {
    const response = await fetch(`${BASE_URL}/common/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401)
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    return { data: res.fileName };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};
