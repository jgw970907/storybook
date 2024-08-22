import { useEffect, useState, ChangeEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import * as S from '../../styles/LoginStyled';
import { useLogin } from 'queries/auth';
import Loader from 'components/shared/Loader';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('Admin@tester.com');
  const [password, setPassword] = useState<string>('@qwer1234');
  const [isEmpty, setIsEmpty] = useState(false);
  const { isLogin } = useUserStore();

  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin();

  useEffect(() => {
    if (isLogin) {
      navigate('/user');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    setIsEmpty(email.length === 0 || password.length === 0);
  }, [email, password]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  }, []);

  const handleLogin = useCallback(() => {
    if (isEmpty) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    mutate({ email, password });
  }, [email, password, isEmpty, mutate]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isEmpty && e.key === 'Enter') {
        handleLogin();
      }
    },
    [isEmpty, handleLogin],
  );

  if (isLoading) {
    return (
      <S.Body>
        <Loader />
      </S.Body>
    );
  }

  return (
    <S.Body>
      <S.Layout>
        <S.Title>로그인</S.Title>
        <S.Wrapper $gap={25}>
          <S.InputField>
            <S.Label htmlFor="email">이메일</S.Label>
            <S.Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              name="email"
              value={email}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </S.InputField>
          <S.InputField>
            <S.Label htmlFor="password">비밀번호</S.Label>
            <S.Input
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              value={password}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </S.InputField>
        </S.Wrapper>
        <S.Wrapper $gap={30} $marginTop={40}>
          <S.LoginButton onClick={handleLogin} disabled={isEmpty}>
            로그인
          </S.LoginButton>
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
  );
};

export default LoginPage;
