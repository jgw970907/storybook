import React, { useState } from 'react';
import styled from 'styled-components';
import { getStyledColor } from 'utils';
import { useQueryClient } from 'react-query';
import queryKeys from 'queries/queryKeys';
import usePaginationStore from '../../../admin/dev5/store/pagenationStore';

const DropDownObject = {
  최신순: 'ASC',
  '오래된 순': 'DESC',
  //   '조회수 순': 'VIEWCOUNT',
  //   '좋아요 순': 'LIKECOUNT',
};
const DropDown = () => {
  const { order, setOrder } = usePaginationStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setOrder(DropDownObject[item]);
    setIsOpen(false);
  };
  return (
    <S.container>
      <button onClick={toggleDropdown}>{selectedItem ? selectedItem : 'Select an option'}</button>

      {isOpen && (
        <ul>
          {Object.keys(DropDownObject).map((key) => (
            <S.item key={key} onClick={() => handleItemClick(key)}>
              {key}
            </S.item>
          ))}
        </ul>
      )}
    </S.container>
  );
};

export default DropDown;

const S = {
  container: styled.div`
    position: relative;
    display: inline-block;
    width: 200px;
    height: 50px;
    display: flex;
    justify-content: center;
    & > button {
      background-color: ${getStyledColor('orange', 500)};
      color: black;
      padding: 16px;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
    background-color: ${getStyledColor('gray', 500)};
    & > ul {
      position: absolute;
      top: 60px;
      width: 100%;
      background-color: ${getStyledColor('red', 500)};
      list-style-type: none;
      padding: 0;
      margin: 0 auto;
      z-index: 10;
    }
  `,
  item: styled.li`
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    margin: 0 auto;
    &:hover {
      background-color: ${getStyledColor('orange', 500)};
    }
  `,
};
