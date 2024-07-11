import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAccessToken, fetchAccessToken } from '../utils/auth';
import { getUser } from 'api/auth';
import { UserType } from 'types';
import { useUserStore } from 'store/useUserStore';
interface DecodedToken {
  id: string;
  exp: number;
  // 다른 토큰 속성들...
}

export const useAuth = () => {
  const { setIsLogin, setUser } = useUserStore.getState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let accessToken = getAccessToken();
        console.log(accessToken);
        if (!accessToken) {
          accessToken = await fetchAccessToken();
        }

        const decodedToken: DecodedToken = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          accessToken = await fetchAccessToken();
        }

        const userData = await getUser();
        if (userData) {
          setIsLogin(true);
          setUser(userData);
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { loading };
};
