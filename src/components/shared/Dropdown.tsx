import useOnclickOutside from 'hooks/useOnclickOutside';
import React, { useCallback, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

const DropdownObject: { [key: string]: string } = {
  DESC: '최신순',
  ASC: '오래된순',
  CLICKS: '조회순',
};

interface DropdownProps {
  order: string;
  setOrder: React.Dispatch<React.SetStateAction<'DESC' | 'ASC' | 'CLICKS'>>;
}

const Dropdown: React.FC<DropdownProps> = ({ order, setOrder }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(DropdownObject[order]);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useOnclickOutside(ref, handleOutsideClick);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item: string) => {
    setSelectedItem(DropdownObject[item]);
    setOrder(item as 'DESC' | 'ASC' | 'CLICKS');
    setIsOpen(false);
  };

  return (
    <S.Container ref={ref}>
      <S.Button onClick={toggleDropdown} disabled={status === 'loading'}>
        {selectedItem}
      </S.Button>
      {isOpen && (
        <S.List>
          {Object.keys(DropdownObject).map((key) => (
            <S.Item key={key} onClick={() => handleItemClick(key)}>
              {DropdownObject[key]}
            </S.Item>
          ))}
        </S.List>
      )}
    </S.Container>
  );
};

export default Dropdown;

const Show = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const S = {
  Container: styled.div`
    position: relative;
  `,

  Button: styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: ${pixelToRem(80)};
    height: ${pixelToRem(40)};
    padding: ${pixelToRem(10)} ${pixelToRem(10)};
    border-radius: 4px;
    background-color: ${getStyledColor('white', 'high')};
    font-weight: 700;
    font-size: ${pixelToRem(14)};
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    &:hover {
      color: ${getStyledColor('white', 'high')};
      background-color: ${getStyledColor('purple', 800)};
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    &:focus {
      color: ${getStyledColor('white', 'high')};
      background-color: ${getStyledColor('primary', 600)};
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
  `,
  List: styled.ul`
    position: absolute;
    top: 50px;
    left: calc(50% - 50px);
    background-color: ${getStyledColor('white', 'medium')};
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 4px;
    animation: ${Show} 0.3s ease forwards;
    @media screen and (max-width: 1400px) {
      left: calc(50% - 40px);
    }
  `,
  Item: styled.li`
    width: ${pixelToRem(100)};
    padding: 14px 20px;
    text-align: center;
    transition:
      background-color 0.07s ease,
      color 0.07s ease;
    cursor: pointer;
    background-color: ${getStyledColor('white', 'high')};
    &:hover {
      color: ${getStyledColor('white', 'high')};
      background-color: ${getStyledColor('primary', 800)};
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    @media screen and (max-width: 1400px) {
      width: ${pixelToRem(80)};
      padding: 10px 16px;
      font-size: ${pixelToRem(12)};
      text-align: center;
    }
  `,
};
