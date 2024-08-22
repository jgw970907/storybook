import { useState } from 'react';
import styled from 'styled-components';
import * as S from 'styles/LoginStyled';
import { getStyledColor } from 'utils';
import formatTime from 'utils/formatTime';
import useEmailVerification from '../../hooks/useEmailVerification';

interface SignupFormProps {
  onSubmit: (data: { email: string; password: string; name: string; nickname: string }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const {
    email,
    setEmail,
    code,
    setCode,
    message,
    error,
    isVerified,
    isClickedVerification,
    timer,
    handleSendToEmail,
    handleVerifyCode,
  } = useEmailVerification();

  const handleSubmit = () => {
    if (!isVerified) {
      alert('이메일 인증을 완료하세요');
      return;
    }
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!email || !password || !name || !nickname) {
      alert('모든 항목을 입력해주세요.');
      return;
    }
    onSubmit({ email, password, name, nickname });
  };

  return (
    <S.Wrapper $gap={25}>
      <EmailField>
        <S.InputField>
          <S.Label>이메일 </S.Label>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.InputField>
        <AuthButton onClick={handleSendToEmail}>인증하기</AuthButton>
      </EmailField>
      {isClickedVerification && (
        <EmailField>
          <S.InputField>
            <S.Label>인증번호</S.Label>
            <S.Input
              type="number"
              placeholder="인증번호를 입력해주세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={4}
              onWheel={(e) => e.currentTarget.blur()}
            />
            <div style={{ position: 'absolute', color: '#fff' }}>{formatTime(timer)}</div>
          </S.InputField>
          <AuthButton onClick={handleVerifyCode}>확인</AuthButton>
        </EmailField>
      )}
      {message && <Message error={false}>{message}</Message>}
      {error && <Message error={true}>{error}</Message>}
      <S.InputField>
        <S.Label>비밀번호 </S.Label>
        <S.Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={20}
        />
      </S.InputField>
      <S.InputField>
        <S.Label>비밀번호 확인 </S.Label>
        <S.Input
          type="password"
          placeholder="Password Confirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          maxLength={20}
        />
      </S.InputField>
      <S.InputField>
        <S.Label>이름 </S.Label>
        <S.Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={5}
        />
      </S.InputField>
      <S.InputField>
        <S.Label>닉네임 </S.Label>
        <S.Input
          type="text"
          placeholder="Nick Name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={10}
        />
      </S.InputField>
      <S.LoginButton onClick={handleSubmit}>회원가입</S.LoginButton>
    </S.Wrapper>
  );
};
export default SignupForm;
const AuthButton = styled.button`
  color: ${getStyledColor('primary', 200)};
  border: 2px solid ${getStyledColor('primary', 500)};
  border-radius: 6px;
  background-color: inherit;
  font-weight: 500;
  margin-left: 30px;
  margin-bottom: 6px;
  white-space: nowrap;
  height: 42px;
  align-self: flex-end;
  padding: 6px 12px;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('primary', 400)};
    color: #fff;
  }

  &:active {
    background-color: ${getStyledColor('primary', 700)};
    color: #fff;
    border-color: ${getStyledColor('primary', 700)};
  }
`;
const EmailField = styled.div`
  width: 100%;
  display: flex;
`;
const Message = styled.p<{ error: boolean }>`
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-size: 14px;
  margin-top: 10px;
`;
