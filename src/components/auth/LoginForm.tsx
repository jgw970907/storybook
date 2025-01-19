import React, { useCallback } from 'react';
import useForm from '../../hooks/useForm';
import * as S from 'styles/auth/authStyled';
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const { values, isEmpty, handleChange, checkEmpty } = useForm({
    email: 'Admin@tester.com',
    password: '@qwer1234',
  });
  const handleLogin = useCallback(() => {
    if (checkEmpty()) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    onSubmit(values.email, values.password);
  }, [values, checkEmpty, onSubmit]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isEmpty && e.key === 'Enter') {
        handleLogin();
      }
    },
    [isEmpty, handleLogin],
  );
  return (
    <S.Wrapper $gap={25}>
      <S.Label>이메일</S.Label>
      <S.Input
        id="email"
        type="email"
        placeholder="이메일을 입력해주세요."
        name="email"
        value={values.email}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <S.Label>비밀번호</S.Label>
      <S.Input
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        name="password"
        value={values.password}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <S.LoginButton onClick={handleLogin} disabled={isEmpty}>
        로그인
      </S.LoginButton>
    </S.Wrapper>
  );
};
export default LoginForm;
