import React from 'react';
import styled from 'styled-components';

const BottomContainer = styled.div`
  width: 100%;
  background-color: #f8f9fa;
  bottom: 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;
const BottomWrapper = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
`;
const BottomText = styled.div`
  width: 100%;
  color: #343a40;
  font-size: 14px;
  margin: 0;
`;

const Bottom: React.FC = () => {
  return (
    <BottomContainer>
      <BottomWrapper>
        <BottomText>email: jangcoding09@gmail.com</BottomText>
        <BottomText>name: Jang gun woo</BottomText>
        <BottomText>
          github:{' '}
          <a href="https://github.com/jangco97" target="blank">
            깃헙주소
          </a>
        </BottomText>
      </BottomWrapper>
    </BottomContainer>
  );
};

export default Bottom;
