import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, fetchAccessTokenWithRefresh } from '../utils/auth';
import { getUser } from 'api/auth';
import { useUserStore } from 'store/useUserStore';
export const useAuth = () => {
  const { setIsLogin, setUser, logout } = useUserStore.getState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let accessToken = getAccessToken();
        if (!accessToken) {
          accessToken = await fetchAccessTokenWithRefresh();
        }

        let decodedToken: any = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          accessToken = await fetchAccessTokenWithRefresh();
          decodedToken = jwtDecode(accessToken);
        }

        const userData = await getUser();
        if (userData) {
          setIsLogin(true);
          setUser(userData);

          // 타이머 설정
          const expiresIn = decodedToken.exp * 1000 - Date.now();
          const timer = setTimeout(() => {
            logout();
          }, expiresIn);

          // 컴포넌트 언마운트 시 타이머 정리
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setIsLogin, setUser, logout]);

  return { loading };
};
