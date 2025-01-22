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
          if (!accessToken) {
            console.warn('토큰 갱신 실패, 로그아웃 처리');
            logout();
            return; // 토큰 갱신이 실패하면 더 이상 진행하지 않음
          }
        }

        let decodedToken: any = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          accessToken = await fetchAccessTokenWithRefresh();
          if (!accessToken) {
            console.warn('토큰 갱신 실패, 로그아웃 처리');
            logout();
            return;
          }
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
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [setIsLogin, setUser, logout]);

  return { loading };
};
