import { styled } from 'styled-components';

import { getStyledColor, pixelToRem } from 'utils';
type ButtonColorType = 'primary' | 'gray' | 'success' | 'danger' | 'black';
type shade = 500 | 600 | 700 | 800 | 900 | 1000;
const getButtonColor = (type: ButtonColorType, shade: shade) => {
  switch (type) {
    case 'primary':
      return getStyledColor('blue', shade);
    case 'gray':
      return getStyledColor('gray', shade);
    case 'success':
      return getStyledColor('green', shade);
    case 'danger':
      return getStyledColor('red', shade);
    case 'black':
      return getStyledColor('black', shade);
  }
};

export const WrapperSearch = styled.div<{ backColorType: ButtonColorType }>`
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ backColorType }) => getButtonColor(backColorType, 500)};
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
`;
export const Search = styled.div`
  z-index: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;
export const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 50px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 20px;
  padding: 0 20px;
  margin-right: 10px;
  font-size: ${pixelToRem(16)};
  transition: all 0.3s ease;

  @media screen and (max-width: 1400px) {
    max-width: 450px;
    height: 45px;
    font-size: ${pixelToRem(14)};
  }

  @media screen and (max-width: 768px) {
    max-width: 400px;
    height: 40px;
    font-size: ${pixelToRem(12)};
  }

  @media screen and (max-width: 480px) {
    max-width: 300px;
    height: 35px;
    font-size: ${pixelToRem(10)};
  }
`;

export const Button = styled.button<{ btncolortype: ButtonColorType }>`
  width: ${pixelToRem(100)};
  height: ${pixelToRem(40)};
  padding: ${pixelToRem(10)} ${pixelToRem(10)};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getStyledColor('black', 500)};
  background-color: ${({ btncolortype }) => getButtonColor(btncolortype, 500)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  margin-right: 10px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    background-color: ${({ btncolortype }) => getButtonColor(btncolortype, 600)};
    color: ${getStyledColor('white', 'high')};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: ${({ btncolortype }) => getButtonColor(btncolortype, 700)};
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: ${getStyledColor('cool_gray', 400)};
    color: ${getStyledColor('cool_gray', 200)};
    cursor: not-allowed;
    opacity: 0.7;
  }

  @media screen and (max-width: 1400px) {
    width: ${pixelToRem(70)};
    height: ${pixelToRem(35)};
    font-size: ${pixelToRem(12)};
  }

  @media screen and (max-width: 1200px) {
    width: ${pixelToRem(60)};
    height: ${pixelToRem(30)};
    font-size: ${pixelToRem(10)};
  }

  @media screen and (max-width: 768px) {
    width: ${pixelToRem(50)};
    height: ${pixelToRem(25)};
    font-size: ${pixelToRem(8)};
  }
`;
export const SearchOption = styled.span<{ selected: boolean }>`
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  color: ${({ selected }) =>
    selected ? getStyledColor('black', 500) : getStyledColor('black', 300)};
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${getStyledColor('black', 500)};
  }
`;

export const SearchRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
export const SearchLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
