import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import * as S from '../../styles/LoginStyled';
import { useLogin } from 'queries/auth';
import Loader from 'components/shared/Loader';
import LoginForm from 'components/auth/LoginForm';
import Bottom from 'components/layout/Bottom';

const LoginPage = () => {
  const { isLogin } = useUserStore();
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();

  useEffect(() => {
    if (isLogin) {
      navigate('/user');
    }
  }, [isLogin, navigate]);

  const handleLogin = (email: string, password: string) => {
    mutate({ email, password });
  };

  if (isLoading) {
    return (
      <S.Body>
        <Loader />
      </S.Body>
    );
  }

  return (
    <>
      <S.Body>
        <S.Layout>
          <S.Title>로그인</S.Title>
          <LoginForm onSubmit={handleLogin} />
          <S.Wrapper $gap={30} $marginTop={40}>
            <S.Divider>
              <div>OR</div>
            </S.Divider>
            <div>
              <S.RegistText>아직 회원이 아니신가요?</S.RegistText>
              <S.StyledLink to="/signup">회원가입</S.StyledLink>
            </div>
          </S.Wrapper>
        </S.Layout>
      </S.Body>
      <Bottom />
    </>
  );
};

export default LoginPage;
