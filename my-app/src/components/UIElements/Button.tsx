import React from "react";
import styled from "styled-components";
const Button = ({ content, onClick, size, disabled }) => {
  return (
    <S.button onClick={onClick} disabled={disabled} $size={size}>
      {content}
    </S.button>
  );
};

export default Button;

const S = {
  button: styled.button`
    width: ${(props) => props.$size || "auto"};
    height: 50px;
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors.disabled : theme.colors.primary};
    color: ${({ theme }) => theme.colors.G_200};
    border: none;
    border-radius: 5px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    transition: background-color 0.3s, transform 0.1s;

    &:hover {
      background-color: ${({ theme, disabled }) =>
        disabled ? theme.colors.disabled : theme.colors.primaryHover};
    }

    &:active {
      transform: ${({ disabled }) => (disabled ? "none" : "scale(0.98)")};
    }
  `,
};
