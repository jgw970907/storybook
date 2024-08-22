import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import secureLocalStorage from 'react-secure-storage';
import { useUserStore } from 'store/useUserStore';
import { signUp } from 'api/auth';
import * as S from 'styles/LoginStyled';
import SignupForm from 'components/auth/SignupForm';

const SignupPage = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, setUser } = useUserStore((state) => state);
  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      if (!data) return;
      setIsLogin(true);
      setUser(data.userInfo);
      secureLocalStorage.setItem('refreshToken', data.refreshToken);
      navigate('/user');
    },
  });

  useEffect(() => {
    if (isLogin) {
      navigate('/admin/main');
    }
  }, [isLogin, navigate]);

  const handleSubmit = (formData: {
    email: string;
    password: string;
    name: string;
    nickname: string;
  }) => {
    mutate(formData);
  };

  return (
    <S.Body>
      <S.Layout>
        <S.Title>회원가입</S.Title>
        <SignupForm onSubmit={handleSubmit} />
        <S.Wrapper $gap={20} $marginTop={40}>
          <div>
            <S.RegistText>이미 회원이신가요?</S.RegistText>
            <S.StyledLink to="/login">로그인</S.StyledLink>
          </div>
        </S.Wrapper>
      </S.Layout>
    </S.Body>
  );
};

export default SignupPage;
