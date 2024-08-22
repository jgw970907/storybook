import { useState } from 'react';
import useTimer from 'hooks/useTimer';
import { sendToEmail, sendVerificationCode } from 'api/auth';
import { AxiosError } from 'axios';

const useEmailVerification = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isClickedVerification, setIsClickedVerification] = useState(false);
  const { timer, setTimer } = useTimer('sec');

  const handleSendToEmail = async () => {
    try {
      const res = await sendToEmail(email);
      setIsClickedVerification(true);
      setMessage(res.message);
      setError(null);
      setTimer(600);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || '이메일 전송 중 오류가 발생했습니다.');
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      // 에러 발생 시에도 인증번호 입력 창을 유지
      setIsClickedVerification(true);
      setMessage(null);
      setTimer(600); // 에러 발생 시에도 타이머 유지
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await sendVerificationCode(email, code);
      if (res.status === 200) {
        setIsVerified(true);
        setMessage(res.message);
        setIsClickedVerification(false);
        setTimer(0);
        setError(null);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message || '인증번호가 일치하지 않습니다.');
      } else {
        setError('인증 과정에서 오류가 발생했습니다.');
      }
      // 에러 발생 시에도 인증번호 입력 창을 유지
      setIsClickedVerification(true);
      setMessage(null);
      // 타이머가 아직 남아있다면 유지
      if (timer > 0) {
        setTimer(timer);
      } else {
        setTimer(600); // 타이머가 끝났다면 다시 설정
      }
    }
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    message,
    error,
    isVerified,
    isClickedVerification,
    handleSendToEmail,
    handleVerifyCode,
    timer,
  };
};

export default useEmailVerification;
