import React from "react";
import styled from "styled-components";
const Input = ({
  label,
  type = "text",
  placeholder,
  name,
  text,
  onChange,
  size = "100px",
  error,
}) => {
  return (
    <>
      <S.container>
        {label ? <S.label htmlFor={name}>{label}: </S.label> : null}
        <S.InputContainer>
          <S.input
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            value={text}
            onChange={onChange}
            $size={size}
          />
          <S.textError>{error ? error : null}</S.textError>
        </S.InputContainer>
      </S.container>
    </>
  );
};

export default Input;
const S = {
  container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
  `,
  input: styled.input`
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 0.5rem;
    width: ${(props) => props.$size};
  `,
  label: styled.label`
    color: #888;
    font-size: 1.2rem;
    font-weight: bold;
    width: 100px;
    margin-right: 1rem;
  `,
  textError: styled.div`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `,
};
