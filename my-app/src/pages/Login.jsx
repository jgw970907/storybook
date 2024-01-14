import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../dev5components/dev5UIComponent/Input';
import Button from '../dev5components/dev5UIComponent/Button';
import { login } from '../api/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const onClickLogin = async () => {
    setIsLoading(true);
    const { data } = await login(Inputs);
    setIsLoading(isLoading);
    if (data) {
      navigate('/admin/dev5');
    }
    setIsLoading(false);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <S.container>
      <Input
        label="로그인"
        type="text"
        placeholder="아이디"
        onChange={onChangeHandler}
        name="email"
        text={Inputs.id}
        size={'100%'}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        onChange={onChangeHandler}
        name="password"
        text={Inputs.password}
        size={'100%'}
      />
      <Button label="로그인" onClick={onClickLogin} content={'로그인'} disabled={isLoading} />
      <Link to="/admin/dev5/admin/signup">회원가입</Link>
    </S.container>
  );
};

export default Login;

const S = {
  container: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  `,
};
