import React from "react";
import styled from "styled-components";
const ErrorText = ({ textError }) => {
  return <TextError>{textError}</TextError>;
};

export default ErrorText;
const TextError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
