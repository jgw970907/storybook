import styled from 'styled-components';

export const Align = styled.div<{ direction: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => direction};
`;
