import { useState } from 'react';
import * as S from 'styles/auth/authStyled';
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
      <S.EmailField>
        <S.InputField>
          <S.Label>이메일 </S.Label>
          <S.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </S.InputField>
        <S.AuthButton onClick={handleSendToEmail}>인증하기</S.AuthButton>
      </S.EmailField>
      {isClickedVerification && (
        <S.EmailField>
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
          <S.AuthButton onClick={handleVerifyCode}>확인</S.AuthButton>
        </S.EmailField>
      )}
      {message && <S.Message error={false}>{message}</S.Message>}
      {error && <S.Message error={true}>{error}</S.Message>}
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
        <S.Label>활동명 </S.Label>
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
