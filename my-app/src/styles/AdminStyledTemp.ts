import { FaPenToSquare, FaRegTrashCan } from 'react-icons/fa6';
import styled, { css } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 750px;
  border-radius: 4px;
  height: 100%;
  background-color: #fff;
  padding: 40px 40px;
`;

export const SubContainer = styled.div`
  border-radius: 4px;
  background-color: #fff;
  padding: ${pixelToRem(20)} ${pixelToRem(25)};
  @media screen and (max-width: 1400px) {
    padding: ${pixelToRem(15)} ${pixelToRem(20)};
  }
`;

export const ContainerHeader = styled.div`
  min-height: ${pixelToRem(80)};
  @media screen and (max-width: 1400px) {
    min-height: ${pixelToRem(60)};
  }
`;

export const ContainerTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: ${pixelToRem(24)};
  font-weight: 700;
  @media screen and (max-width: 1400px) {
    gap: 4px;
    font-size: ${pixelToRem(18)};
    font-weight: 500;
  }
`;

type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export const Button = styled.button<{ $variant?: Variant; color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: ${pixelToRem(70)};
  min-height: ${pixelToRem(35)};
  padding: 0px 12px;
  border-radius: 10px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${getStyledColor('red', 700)};
    transition: background-color 0.2s ease-in;
  }
  @media screen and (max-width: 1400px) {
    min-width: ${pixelToRem(60)};
    min-height: ${pixelToRem(30)};
    padding: 0px 6px;
    font-weight: 500;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'primary':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('teal', 1000)};
        `;
      case 'secondary':
        return css`
          color: ${getStyledColor('teal', 1000)};
          background-color: ${getStyledColor('teal', 100)};
        `;
      case 'success':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('forest', 800)};
        `;
      case 'warning':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('orange', 800)};
        `;
      case 'error':
        return css`
          color: ${getStyledColor('white', 'high')};
          background-color: ${getStyledColor('red', 800)};
        `;
      default:
        return css`
          color: ${getStyledColor('black', 800)};
          background-color: ${getStyledColor('white', 'high')};
          border: 2px solid ${getStyledColor('gray', 800)};
        `;
    }
  }};
`;
export const LinkCardWrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-auto-columns: minmax(200px, auto);
  grid-auto-rows: minmax(200px, auto);
  grid-template-columns: repeat(2, 2fr);
  gap: 30px;
`;
export const Wrapper = styled.div<{ $marginTop?: number; $gap?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => ($gap ? $gap + 'px' : '')};
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};
  @media screen and (max-width: 1400px) {
    gap: 5px;
    font-size: ${pixelToRem(14)};
  }
`;

export const Label = styled.label`
  font-weight: 400;
  color: ${getStyledColor('gray', 900)};
  margin-bottom: 5px;
  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(11)};
  }
`;

export const InputField = styled.div<{ $marginTop?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${({ $marginTop }) => ($marginTop ? $marginTop + 'px' : '')};

  @media screen and (max-width: 1400px) {
    margin-top: 10px;
  }
`;
export const NoMessage = styled.div`
  font-size: ${pixelToRem(20)};
  font-weight: 700;
  color: ${getStyledColor('gray', 900)};
  text-align: center;
  margin-top: 50px;
`;
export const Input = styled.input`
  width: 100%;
  max-width: ${pixelToRem(600)};
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 500)};
  color: ${getStyledColor('gray', 1200)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 10px;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1400px) {
    max-width: ${pixelToRem(500)};
    padding: 10px 15px;
    border: 2px solid rgba(0, 0, 0, 0);
  }

  @media screen and (max-width: 768px) {
    max-width: ${pixelToRem(400)};
    padding: 8px 12px;
  }

  @media screen and (max-width: 480px) {
    max-width: ${pixelToRem(300)};
    padding: 6px 10px;
  }

  &:focus {
    border: 3px solid ${getStyledColor('teal', 600)};
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
  }

  &::placeholder {
    color: ${getStyledColor('gray', 900)};
  }
`;

const sizeStyles = {
  SMALL: css`
    max-width: ${pixelToRem(80)};
    padding: 4px 10px;
    font-size: ${pixelToRem(10)};
  `,
  MEDIUM: css`
    max-width: ${pixelToRem(250)};
    padding: 8px 16px;
    font-size: ${pixelToRem(12)};
  `,
  LARGE: css`
    max-width: ${pixelToRem(400)};
    padding: 10px 20px;
    font-size: ${pixelToRem(15)};
  `,
};

interface SelectProps {
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
}

export const Select = styled.select<SelectProps>`
  font-weight: 700;
  width: 10rem;
  border-radius: 10px;
  color: ${getStyledColor('gray', 1200)};
  background-color: ${getStyledColor('gray', 500)};
  border: 2px solid ${getStyledColor('black', 400)};
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
  margin-right: 1rem;
  ${({ size }) => sizeStyles[size]}

  @media screen and (max-width: 1400px) {
    ${({ size }) => size === 'LARGE' && sizeStyles.MEDIUM}
  }

  @media screen and (max-width: 768px) {
    ${({ size }) => size === 'LARGE' && sizeStyles.SMALL}
    ${({ size }) => size === 'MEDIUM' && sizeStyles.SMALL}
  }

  @media screen and (max-width: 480px) {
    ${({ size }) => sizeStyles.SMALL}
  }

  &:focus {
    border: 2px solid ${getStyledColor('teal', 600)};
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
  }
`;

interface OptionProps {
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
}

export const Option = styled.option<OptionProps>`
  border-radius: 20px;
  color: ${getStyledColor('gray', 1200)};

  ${({ size }) => sizeStyles[size]}

  @media screen and (max-width: 1400px) {
    ${({ size }) => size === 'LARGE' && sizeStyles.MEDIUM}
  }

  @media screen and (max-width: 768px) {
    ${({ size }) => size === 'LARGE' && sizeStyles.SMALL}
    ${({ size }) => size === 'MEDIUM' && sizeStyles.SMALL}
  }

  @media screen and (max-width: 480px) {
    ${({ size }) => sizeStyles.SMALL}
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  max-width: ${pixelToRem(600)};
  min-height: 200px;
  padding: 15px 20px;
  background-color: ${getStyledColor('gray', 500)};
  color: ${getStyledColor('gray', 1200)};
  border: 3px solid rgba(0, 0, 0, 0);
  border-radius: 20px;
  resize: none;
  outline: none;
  line-height: 150%;
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1400px) {
    max-width: ${pixelToRem(500)};
    padding: 10px 15px;
    border: 2px solid rgba(0, 0, 0, 0);
  }

  @media screen and (max-width: 768px) {
    max-width: ${pixelToRem(400)};
    padding: 8px 12px;
  }

  @media screen and (max-width: 480px) {
    max-width: ${pixelToRem(300)};
    padding: 6px 10px;
  }

  &:focus {
    border: 3px solid ${getStyledColor('teal', 600)};
    box-shadow: 0 0 8px rgba(0, 128, 128, 0.2);
  }

  &::placeholder {
    color: ${getStyledColor('gray', 900)};
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${getStyledColor('gray', 700)};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${getStyledColor('gray', 500)};
  }
`;

export const Table = styled.table`
  max-width: ${pixelToRem(1500)};
  min-width: ${pixelToRem(100)};
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1400px) {
    max-width: ${pixelToRem(900)};
  }
`;
export const Theader = styled.thead`
  height: 40px;
  font-weight: 700;
  background-color: ${getStyledColor('teal', 900)};
  color: ${getStyledColor('white', 'high')};
  @media screen and (max-width: 1400px) {
    height: 20px;
    font-weight: 700;
  }
`;
export const Tbody = styled.tbody`
  height: 100%;
`;
export const Tcolumn = styled.th`
  font-size: ${pixelToRem(16)};
  text-align: center;
  padding: 10px 15px;
  white-space: nowrap;
  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(13)};
    text-align: center;
    padding: 5px 10px;
  }
`;
export const Trow = styled.tr`
  height: 45px;
  td {
    background-color: ${getStyledColor('gray', 100)};
  }
  &:nth-child(2n + 1) td {
    background-color: ${getStyledColor('gray', 300)};
  }
  @media screen and (max-width: 1400px) {
    height: 30px;
  }
`;
export const Tcell = styled.td`
  height: inherit;
  font-size: ${pixelToRem(14)};
  text-align: center;
  padding: 10px 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  & button {
    background-color: inherit;
  }
  @media screen and (max-width: 1400px) {
    padding: 5px 20px;
    font-size: ${pixelToRem(12)};
  }
`;

export const EditIcon = styled(FaPenToSquare)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('blue', 900)};
  }
  &:active {
    color: ${getStyledColor('blue', 1000)};
  }
  margin-right: 20px;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    font-size: 15px;
  }
`;

export const TrashIcon = styled(FaRegTrashCan)`
  font-size: 20px;
  transition: color 0.15s ease;
  color: ${getStyledColor('cool_gray', 700)};
  &:hover {
    color: ${getStyledColor('red', 900)};
  }
  &:active {
    color: ${getStyledColor('red', 1000)};
  }
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    font-size: 15px;
  }
`;

export const Pagination = styled.nav`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const PaginationNumber = styled.button<{ $isCurrentPage?: boolean }>`
  padding: 8px 12px;
  background-color: ${(props) => (props.$isCurrentPage ? getStyledColor('teal', 1000) : '#fff')};
  border-radius: 4px;
  transition: background-color 0.2s ease;
  color: ${(props) => (props.$isCurrentPage ? getStyledColor('white', 'high') : 'black')};
  &:hover {
    color: ${getStyledColor('white', 'high')};
    background-color: ${getStyledColor('teal', 900)};
  }

  &:active {
    color: ${getStyledColor('white', 'high')};
    background-color: ${getStyledColor('teal', 1000)};
  }
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #fff;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;
