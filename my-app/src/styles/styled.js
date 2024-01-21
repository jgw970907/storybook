import { styled } from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';
export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  & > span {
    margin-right: 10px;
  }
`;
export const PaginationContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  display: flex;
  justify-content: center;
`;
export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  padding: 0 10px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  background-color: ${getStyledColor('orange', 300)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor('orange', 600)};
    color: ${getStyledColor('orange', 400)};
  }
`;
export const ResetButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  background-color: ${getStyledColor('red', 500)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor('red', 600)};
    color: ${getStyledColor('red', 400)};
  }
`;

export const Title = styled.h2`
  font-size: ${pixelToRem(32)};
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  margin-bottom: 16px;
`;

export const Container = styled.div`
  color: rgba(89, 80, 61, 1);
  min-width: 1000px;
  background-color: ${getStyledColor('orange', 300)};
  border-radius: 4px;
  padding: 24px 35px;
  position: relative;
  padding-bottom: 100px;
  box-shadow: 1px 1px 4px 2px ${getStyledColor('cool_gray', 500)};
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const HeaderTitle = styled.h2`
  font-size: ${pixelToRem(32)};
  font-weight: 700;
`;
// TABLE
export const Table = styled.table`
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
`;
export const Theader = styled.thead`
  font-weight: 700;
  background-color: ${getStyledColor('orange', 500)};
`;
export const Tbody = styled.tbody``;
export const Tcolumn = styled.th`
  text-align: center;
  padding: 20px 25px;
  white-space: none;
`;
export const Trow = styled.tr`
  td {
    background-color: ${getStyledColor('orange', 100)};
  }
  &:nth-child(2n + 1) td {
    background-color: ${getStyledColor('gray', 300)};
  }
`;
export const Tcell = styled.td`
  font-size: ${pixelToRem(14)};
  text-align: center;
  padding: 10px 25px;
  white-space: none;
`;
export const TcellTitle = styled.td`
  font-size: ${pixelToRem(14)};
  text-align: left;
  padding: 10px 25px;
  white-space: none;
  &:hover {
    color: ${getStyledColor('blue', 500)};
    cursor: pointer;
  }
`;
export const TcellButton = styled.td`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${pixelToRem(14)};
  padding: 10px 25px;
  white-space: none;
`;

export const ModalButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  background-color: ${getStyledColor('orange', 500)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor('orange', 600)};
    color: ${getStyledColor('orange', 400)};
  }
`;
export const StyledLoader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
export const BoardWriteButton = styled.button`
  width: 100px;
  height: 40px;
  border: 1px solid ${getStyledColor('cool_gray', 400)};
  border-radius: 4px;
  background-color: ${getStyledColor('orange', 300)};
  font-size: ${pixelToRem(14)};
  font-weight: 700;
  &:hover {
    background-color: ${getStyledColor('orange', 600)};
    color: ${getStyledColor('orange', 400)};
  }
`;
