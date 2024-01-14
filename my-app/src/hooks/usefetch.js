import { useState, useCallback } from 'react';
export const usefetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        body,
        headers,
      });
      if (!response.ok) {
        throw new Error('요청에 실패했습니다.');
      }
      const responseData = await response.json();
      console.log(responseData);

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message || '서버에 문제가 있습니다.');
      setIsLoading(false);
      throw err;
    }
  });
  return {
    isLoading,
    error,
    sendRequest,
  };
};
