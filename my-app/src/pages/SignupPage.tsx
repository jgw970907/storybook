import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import Input from "../dev5components/dev5UIComponent/Input";
import Button from "../dev5components/dev5UIComponent/Button";
import { getStyledColor } from "utils";
import { signup } from "../api/auth";
import * as S from "styles/LoginStyled";
import { StyledLoader } from "../styles/styled";
import ErrorText from "../dev5components/ErrorText";
const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
  });
  const [timer, setTimer] = useState(0);
  const [code, setCode] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [serverError, setServerError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout();
  }, [timer]);
  const onClickSignup = async () => {
    setIsLoading(true);
    const { data, error } = await signup(Inputs);
    if (error) {
      setServerError(error);
    } else if (data) {
      navigate("/admin/dev5");
    }

    setIsLoading(false);
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  const onChangePasswordCheck = (e) => {
    const { value } = e.target;
    setPasswordCheck(value);
    if (Inputs.password !== value) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordError(false);
    }
  };
  const onChangeCode = (e) => {
    const { value } = e.target;
    setCode(value);
  };
  const handleSendToEmail = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/mail/send-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Inputs.email }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setEmailError(data.message);
      } else if (!data.isValid) {
        setEmailError(data.message);
      } else {
        alert("인증번호가 발송되었습니다.");
        setTimer(600);
      }
    } catch (error) {
      console.log(error);
      setEmailError(error.message || "인증번호 발송에 실패했습니다.");
    }
  };

  const handleVerifyCode = async () => {
    console.log("인증번호확인");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/mail/verify-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: Inputs.email, code }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setCodeError(data.message);
      } else if (!data.isValid) {
        setCodeError(data.message);
      } else {
        alert("인증되었습니다.");
        setIsEmailVerified(true);
      }
    } catch (error) {
      console.log(error);
      setCodeError(error.message || "인증번호 확인에 실패했습니다.");
    }
  };
  return (
    <Container>
      <S.Layout>
        <Wrapper>
          <h2>회원가입</h2>
          <Input
            label="이메일"
            type="text"
            placeholder="이메일"
            onChange={onChangeHandler}
            name="email"
            text={Inputs.id}
            size={"100%"}
            error={emailError}
          />
          <EmailCode>
            <button onClick={handleSendToEmail}>인증번호 받기</button>
            <div>{timer > 0 && <span>{timer}초</span>}</div>
          </EmailCode>
          <EmailVerify>
            <Input
              label="인증번호"
              type="text"
              placeholder="인증번호"
              onChange={onChangeCode}
              name="code"
              text={code}
              size={"100%"}
              error={codeError}
            />
            <button onClick={handleVerifyCode}>인증하기</button>
          </EmailVerify>
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            onChange={onChangeHandler}
            name="password"
            text={Inputs.password}
            size={"100%"}
            error={passwordError}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            name="passwordCheck"
            text={passwordCheck}
            size={"100%"}
            error={passwordError}
          />
          <Input
            label="이름"
            type="text"
            placeholder="이름"
            onChange={onChangeHandler}
            name="name"
            text={Inputs.name}
            size={"100%"}
          />
          <Input
            label="닉네임"
            type="text"
            placeholder="닉네임"
            onChange={onChangeHandler}
            name="nickname"
            text={Inputs.nickname}
            size={"100%"}
          />
          {serverError && <ErrorText textError={serverError} />}
          {isLoading ? (
            <StyledLoader /> // Loader displayed when isLoading is true
          ) : (
            <Button
              label="회원가입"
              onClick={onClickSignup}
              content={"회원가입"}
              disabled={!isEmailVerified || isLoading}
              size={"300px"}
            />
          )}
          <Hr />
          <div>
            <span>이미 계정이 있으신가요?</span>
            <Link to="/admin/dev5/login">로그인</Link>
          </div>
        </Wrapper>
      </S.Layout>
    </Container>
  );
};

export default SignupPage;
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
`;
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
const EmailCode = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;
const EmailVerify = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
