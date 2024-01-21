import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../dev5components/dev5UIComponent/Input";
import Button from "../dev5components/dev5UIComponent/Button";
import { getStyledColor } from "utils";
import { login } from "../api/auth";
import * as S from "styles/LoginStyled";
import { StyledLoader } from "../styles/styled";
import ErrorText from "../dev5components/ErrorText";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textError, setTextError] = useState(null);
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const onClickLogin = async () => {
    setIsLoading(true);
    const { data, error } = await login(Inputs);
    if (error) {
      setTextError(error);
    } else if (data) {
      navigate("/admin/dev5");
    }

    setIsLoading(false);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <S.Body>
      <S.Layout>
        <Wrapper>
          <h2>로그인</h2>
          <Input
            label="이메일"
            type="text"
            placeholder="이메일"
            onChange={onChangeHandler}
            name="email"
            text={Inputs.id}
            size={"100%"}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            onChange={onChangeHandler}
            name="password"
            text={Inputs.password}
            size={"100%"}
          />
          {textError && <ErrorText textError={textError} />}
          {isLoading ? (
            <StyledLoader /> // Loader displayed when isLoading is true
          ) : (
            <Button
              label="로그인"
              onClick={onClickLogin}
              content={"로그인"}
              disabled={isLoading}
              size={"300px"}
            />
          )}
          <Hr />
          <div>
            <span>아직 회원이 아닌가요?</span>
            <Link to="/admin/dev5/signup">회원가입</Link>
          </div>
        </Wrapper>
      </S.Layout>
    </S.Body>
  );
};

export default LoginPage;
const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${getStyledColor("orange", 500)};
`;
const Hr = styled.hr`
  width: 100%;
  margin: 1rem 0;
`;
