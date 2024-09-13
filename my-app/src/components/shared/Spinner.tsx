import { styled, keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const Spin = styled(FaSpinner)`
  animation: ${spinAnimation} 1s linear infinite;
`;
const Spinner = ({ width }: { width?: string; height?: string }) => {
  return <Spin size={width || '2rem'} color="gray" />;
};
export default Spinner;
