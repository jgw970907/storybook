import styled, { keyframes, css } from 'styled-components';
import { pixelToRem, getStyledColor } from 'utils';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const WrapperModal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  align-items: center;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    padding: 0;
  }
`;

export const Presentation = styled.div`
  z-index: 1200;
  position: absolute;
`;

export const ModalClose = styled.div`
  position: absolute;
  right: ${pixelToRem(20)};
  top: ${pixelToRem(20)};
  cursor: pointer;
  z-index: 1000;
  color: ${getStyledColor('white', 'high')};
  font-size: ${pixelToRem(30)};

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(24)};
    right: ${pixelToRem(15)};
    top: ${pixelToRem(15)};
  }
`;

export const Modal = styled.div`
  position: absolute;
  width: 90%;
  max-height: 80%;

  box-shadow:
    0 ${pixelToRem(11)} ${pixelToRem(15)} 0 rgba(0, 0, 0, 0.2),
    0 ${pixelToRem(9)} ${pixelToRem(46)} 0 rgba(0, 0, 0, 0.12),
    0 ${pixelToRem(24)} ${pixelToRem(38)} 0 rgba(0, 0, 0, 0.14);

  overflow: hidden;
  border-radius: ${pixelToRem(8)};
  transition: all 400ms ease-in-out 2s;
  animation: ${fadeIn} 0.2s ease;
  overflow-y: scroll;
  align-items: center;
  background-color: ${getStyledColor('black', 100)};

  & p {
    color: ${getStyledColor('white', 'high')};
  }

  &::-webkit-scrollbar {
    width: ${pixelToRem(5)};
  }

  &::-webkit-scrollbar-thumb {
    background: ${getStyledColor('teal', 900)};
    border-radius: ${pixelToRem(20)};
  }

  &::-webkit-scrollbar-track {
    background: ${getStyledColor('teal', 700)};
  }

  @media screen and (max-width: ${pixelToRem(1400)}) {
    overflow-y: scroll !important;
  }
`;

export const ModalPosterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalImgAndCotent = styled.div`
  display: flex;

  @media screen and (max-width: ${pixelToRem(768)}) {
    flex-direction: column;
  }
`;

export const ModalPosterImgContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  gap: ${pixelToRem(30)};
  justify-content: center;
  align-items: center;
  padding: ${pixelToRem(20)};
  padding-bottom: ${pixelToRem(30)};

  @media screen and (max-width: ${pixelToRem(1400)}) {
    width: ${pixelToRem(500)};
    margin: ${pixelToRem([80, 40, 0, 40])};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    width: 100%;
    margin: ${pixelToRem([60, 20, 0, 20])};
  }
`;

export const ImageBtn = styled.button`
  width: ${pixelToRem(50)};
  height: ${pixelToRem(50)};
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    width: ${pixelToRem(40)};
    height: ${pixelToRem(40)};
    svg {
      width: ${pixelToRem(20)};
      height: ${pixelToRem(20)};
    }
  }

  &:hover {
    background-color: #d0d0d0;
  }

  svg {
    width: ${pixelToRem(24)};
    height: ${pixelToRem(24)};
  }
`;

export const ImagePointerWrapper = styled.div`
  width: 100%;
  height: ${pixelToRem(20)};
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  gap: ${pixelToRem(5)};
`;

export const ImagePointer = styled.div<{ currentIndex: number; index: number }>`
  width: ${pixelToRem(52)};
  height: ${pixelToRem(51)};
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${pixelToRem(2)} solid transparent;
  border-radius: ${pixelToRem(5)};
  transition:
    border-color 0.3s ease,
    opacity 0.3s ease;

  ${({ currentIndex, index }) =>
    currentIndex === index
      ? `
    border-color: #00ffcc; 
    opacity: 1;
  `
      : `
    opacity: 0.5; 
  `}

  & > img {
    width: ${pixelToRem(50)};
    height: ${pixelToRem(50)};
    border-radius: ${pixelToRem(5)};
  }
`;

export const ModalPosterImg = styled.img`
  object-fit: contain;
  width: ${pixelToRem(320)};
  height: ${pixelToRem(400)};

  box-shadow:
    ${pixelToRem(1)} ${pixelToRem(1)} ${getStyledColor('black', 700)},
    ${pixelToRem(2)} ${pixelToRem(2)} ${getStyledColor('white', 'medium')},
    ${pixelToRem(3)} ${pixelToRem(3)} ${getStyledColor('black', 700)},
    ${pixelToRem(4)} ${pixelToRem(4)} ${getStyledColor('white', 'medium')},
    ${pixelToRem(5)} ${pixelToRem(5)} ${getStyledColor('black', 700)},
    ${pixelToRem(6)} ${pixelToRem(6)} ${getStyledColor('white', 'medium')},
    ${pixelToRem(7)} ${pixelToRem(7)} ${getStyledColor('black', 700)},
    ${pixelToRem(8)} ${pixelToRem(8)} ${getStyledColor('black', 700)};

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(14)};
    width: ${pixelToRem(280)};
    height: ${pixelToRem(360)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    width: ${pixelToRem(240)};
    height: ${pixelToRem(320)};
  }

  @media screen and (max-width: ${pixelToRem(480)}) {
    width: ${pixelToRem(200)};
    height: ${pixelToRem(280)};
  }
`;

export const ModalContent = styled.div`
  width: 100%;
  padding: ${pixelToRem(40)};
  color: white;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    padding-right: ${pixelToRem(30)};
    padding-top: ${pixelToRem(30)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    padding-right: ${pixelToRem(20)};
    padding-top: ${pixelToRem(20)};
  }
`;

export const ModalOverview = styled.div`
  font-size: ${pixelToRem(18)};
  line-height: 2;
  font-weight: 300;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(14)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    font-size: ${pixelToRem(12)};
  }
`;

export const ModalTitle = styled.h2`
  padding: 0;
  font-size: ${pixelToRem(30)};
  margin: ${pixelToRem([60, 0, 44, 0])};
  white-space: nowrap;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(20)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    font-size: ${pixelToRem(14)};
  }
`;

export const ModalSubject = styled.div`
  border-left: ${pixelToRem(10)} solid ${getStyledColor('primary', 500)};
  padding: 1rem;
  border-bottom: ${pixelToRem(2)} solid ${getStyledColor('primary', 500)};
  font-size: ${pixelToRem(20)};
  font-weight: 500;
  color: white;
  margin: ${pixelToRem([20, 30, 0, 30])};

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(16)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    font-size: ${pixelToRem(14)};
  }
`;

export const ModalIntroduce = styled.div`
  line-height: 140%;
  color: white;
  margin: ${pixelToRem([20, 30, 0, 30])};

  @media screen and (max-width: ${pixelToRem(1400)}) {
    font-size: ${pixelToRem(13)};
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    font-size: ${pixelToRem(12)};
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CommentSection = styled.div`
  background-color: #fefefe;
  margin: ${pixelToRem([20, 30, 0, 30])};
  padding: ${pixelToRem(20)};
  border: ${pixelToRem(1)} solid #888;
  width: 80%;

  @media screen and (max-width: ${pixelToRem(1400)}) {
    width: 90%;
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    width: 100%;
  }
`;

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const HeartButton = styled.button<{
  $liked: boolean | undefined;
  $status: string;
}>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  position: absolute;
  right: ${pixelToRem(20)};
  top: ${pixelToRem(10)};
  align-items: center;
  justify-content: center;
  transform: scale(1.2);
  color: ${(props) => (props.$liked ? 'red' : 'black')};

  &:hover {
    color: ${(props) => (props.$liked ? 'darkred' : 'grey')};
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    font-size: ${pixelToRem(24)};

    &:hover {
      transform: scale(1.1);
      transition: transform 0.2s;
    }

    animation: ${(props) =>
      props.$status === 'loading'
        ? css`
            ${pulseAnimation} 1s 2
          `
        : 'none'};
  }

  @media screen and (max-width: ${pixelToRem(1400)}) {
    right: ${pixelToRem(30)};
    top: ${pixelToRem(8)};
    svg {
      font-size: ${pixelToRem(20)};
    }
  }

  @media screen and (max-width: ${pixelToRem(768)}) {
    right: ${pixelToRem(30)};
    top: ${pixelToRem(6)};
    svg {
      font-size: ${pixelToRem(18)};
    }
  }
`;
