import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { postLogin, postRegister } from "../api";

import Input from "../components/UIElements/Input";
import Button from "../components/UIElements/Button";
const LoginPage = () => {
  const [Inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const onClickHandler = async () => {
    try {
      const { id, password } = Inputs;
      if (id === "" || password === "") {
        return alert("아이디와 비밀번호를 입력해주세요.");
      }

      const res = await postLogin(id, password);
      console.log(res);
      if (res) {
        const { accessToken, refreshToken } = res;
        console.log(accessToken, refreshToken);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...Inputs,
      [name]: value,
    });
  };
  return (
    <Container>
      <Input
        label="로그인"
        type="text"
        placeholder="아이디"
        onChange={onChangeHandler}
        name="id"
        value={Inputs.id}
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호"
        onChange={onChangeHandler}
        name="password"
        value={Inputs.password}
      />
      <Button label="로그인" onClick={onClickHandler} disabled={false} />
      <Link to="/signup">회원가입</Link>
    </Container>
  );
};

export default LoginPage;
export const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
