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

        const decodedToken: any = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error('Access token expired');
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
