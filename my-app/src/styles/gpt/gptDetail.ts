import styled from 'styled-components';
import { getStyledColor } from 'utils';

export const Container = styled.div`
  width: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  position: relative; /* 가상 요소를 위한 상대 위치 설정 */
  border-radius: 8px;
  background-image: linear-gradient(
      45deg,
      ${getStyledColor('pool_blue', 500)} 25%,
      transparent 25%,
      transparent 75%,
      ${getStyledColor('pool_blue', 500)} 75%,
      ${getStyledColor('pool_blue', 500)}
    ),
    linear-gradient(
      45deg,
      ${getStyledColor('pool_blue', 500)} 25%,
      transparent 25%,
      transparent 75%,
      ${getStyledColor('pool_blue', 500)} 75%,
      ${getStyledColor('pool_blue', 500)}
    );
  background-size: 20px 20px;
  background-position:
    0 0,
    10px 10px;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 9px;
    background-color: ${getStyledColor('teal', 400)};
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

export const InfoContainer = styled.div`
  align-items: center;
  box-sizing: border-box;
  position: relative; /* 가상 요소를 위한 상대 위치 설정 */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${getStyledColor('pool_blue', 500)};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    z-index: -1;
    border: 5px solid rgba(0, 0, 0, 0.8);
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 0;
    border-top: 11px solid ${getStyledColor('teal', 400)};
  }
`;
export const Ptag = styled.p`
  font-size: 1rem;
  padding: 1rem;
  color: #333;
  font-family: 'GoormSansMedium';
  font-weight: 300;
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const profileImg = styled.img<{ $size: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  object-fit: cover;
  border-radius: 50%;
  border: 3px dashed rgba(0, 0, 0, 0.8);
  margin: 0.1rem;
`;

export const Title = styled.h1`
  color: black;
  font-family: 'GoormSansBold';
  font-weight: 800;
  padding-left: 1rem;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3rem;
  height: 500px;
  align-items: center;
  margin: 1rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: 100%;
    align-items: center;
    gap: 1.4rem;
  }
`;
export const HeaderImageWrapper = styled.div`
  min-width: 300px;
  width: 50%;
  height: 100%;
  background-size: cover;
  padding-left: 1rem;
  padding-right: 1rem;
`;
export const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  border-radius: 8px;
`;
export const BodyContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 800px;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  line-height: 1.6;
  font-size: 1rem;
  color: #333;
  font-family: 'GoormSansMedium';
  margin-bottom: 2rem;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  p {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  blockquote {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    background-color: #f1f1f1;
    border-left: 4px solid #ccc;
  }

  pre {
    background-color: #272822;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
  }

  code {
    background-color: #f1f1f1;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
  }
  img {
    width: 50%;
    height: auto;
    position: relative;
    margin-left: 25%;
    margin-right: 25%;
  }
  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
