import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem';
import { Outlet, useNavigate } from 'react-router-dom';
import { getStyledColor } from 'utils';
import { NavbarReadonly } from 'types';

const NavbarSize: NavbarReadonly = {
  HEIGHT: 56,
};

const Navigation = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollPosRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const prevScrollPos = prevScrollPosRef.current;
    setIsVisible(prevScrollPos > currentScrollPos || currentScrollPos < NavbarSize.HEIGHT * 2);
    prevScrollPosRef.current = currentScrollPos;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const logoClick = () => {
    navigate('/');
  };

  return (
    <>
      <NavigationWrapper $isVisible={isVisible} $height={NavbarSize.HEIGHT}>
        <Logo>
          <Title onClick={logoClick}>StoryBook</Title>
        </Logo>
        <NavigationItem />
      </NavigationWrapper>
      <Outlet />
    </>
  );
};

export default Navigation;

const NavigationWrapper = styled.div<{ $isVisible: boolean; $height: number }>`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: ${({ $height }) => $height && `${$height}px`};
  @media screen and (max-width: 1400px) {
    height: ${({ $height }) => $height && `${$height - 15}px`};
  }
  padding-left: 30px;
  padding-right: 10%;
  transition:
    top 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  top: ${({ $isVisible, $height }) => ($isVisible ? '0' : `-${$height}px`)};
  opacity: ${({ $isVisible }) => ($isVisible ? '1' : '0')};
  background-color: ${getStyledColor('primary', 900)};
  z-index: 2;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: white;
  cursor: pointer;

  img {
    height: 48px;
    object-fit: contain;
    margin-top: 5px;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  @media screen and (max-width: 1400px) {
    font-size: 20px;
  }
`;
