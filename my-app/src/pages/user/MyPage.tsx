import * as S from 'styles/mypage/mypageStyled';
import { useUserStore } from 'store/useUserStore';
import Bottom from 'components/layout/Bottom';
import { Navigate } from 'react-router-dom';
import UserInfo from 'components/mypage/UserInfo';

import Tab from 'components/mypage/Tab';

const MyPage = () => {
  const { user, isLogin } = useUserStore();
  const userId: string = user?.id || '';
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }
  return (
    <S.Container>
      <UserInfo user={user} userId={userId} />
      <S.Divider />
      <Tab user={user} userId={userId} />
      <Bottom />
    </S.Container>
  );
};

export default MyPage;
