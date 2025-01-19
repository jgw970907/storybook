import styled from 'styled-components';
import { getStyledColor, pixelToRem } from 'utils';

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const TtileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 2rem;
  border-bottom: 2px solid #000;
`;

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

export const ButtonContainer = styled.div`
  margin-right: 2rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 4px;
  padding: 20px 20px;
`;

interface CommentItemContainerProps {
  $index: number;
}

export const CommentItemContainer = styled.div<CommentItemContainerProps>`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 15px 15px;
  margin: 5px 0;
  border-radius: 5px;
  background-color: #24262b;
`;

export const CommentItemRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

export const CommentButton = styled.button<{ onClick: (commentId: string) => void }>`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${getStyledColor('purple', 300)};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${getStyledColor('blue', 400)};
  }
`;

export const CommentInfo = styled.div`
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: space-between;
`;
export const Hr = styled.hr`
  border: 1px solid #666;
  margin: 10px 0;
`;
export const Pagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${pixelToRem(20)};
  color: black;
`;

export const PaginationButton = styled.button`
  background-color: ${getStyledColor('primary', 500)};
  color: ${getStyledColor('black', 900)};
  font-weight: bold;
  border: none;
  border-radius: ${pixelToRem(4)};
  padding: ${pixelToRem([8, 16])};
  margin: ${pixelToRem([0, 8])};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${getStyledColor('primary', 700)};
  }

  &:disabled {
    background-color: ${getStyledColor('gray', 400)};
    cursor: not-allowed;
  }
`;

export const PaginationNumber = styled.span<{ $isCurrentPage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pixelToRem(32)};
  height: ${pixelToRem(32)};
  margin: ${pixelToRem([0, 8])};
  border-radius: 50%;
  background-color: ${({ $isCurrentPage }) =>
    $isCurrentPage ? getStyledColor('primary', 500) : 'transparent'};
  color: ${({ $isCurrentPage }) =>
    $isCurrentPage ? getStyledColor('black', 500) : getStyledColor('white', 'high')};
  font-weight: ${({ $isCurrentPage }) => ($isCurrentPage ? 'bold' : 'normal')};
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ $isCurrentPage }) =>
      $isCurrentPage ? getStyledColor('primary', 500) : getStyledColor('primary', 300)};
    color: ${getStyledColor('white', 'high')};
  }
`;
