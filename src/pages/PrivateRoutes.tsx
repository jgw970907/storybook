import { Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

const PrivateRoutes = () => {
  const { isLogin, user } = useUserStore();

  // 사용자 역할이 admin인지 확인
  const isAdmin = user?.role === 'ADMIN';

  return isLogin && isAdmin ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoutes;
