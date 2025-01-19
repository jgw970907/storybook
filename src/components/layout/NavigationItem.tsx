import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { logout } from 'api/auth';
import { useUserStore } from 'store/useUserStore';
import { getStyledColor, pixelToRem } from 'utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMakeTemplate } from 'queries/gpt';
import { Button } from 'components/shared';
const NavigationItem = () => {
  const location = useLocation();
  const { isLogin, user } = useUserStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { mutate, status } = useMakeTemplate();
  const handleCreateTemplate = () => {
    if (window.confirm('스토리를 만들겠습니까?')) {
      mutate();
    }
  };
  const handleSelectChange = (value: string) => {
    if (value === 'storybook') {
      navigate('/gptpage');
    } else if (value === 'gpt') {
      navigate('/gptpage/prompt');
    }
    setIsDropdownOpen(false);
  };

  return (
    <Wrapper>
      {!isLogin && (
        <>
          <LinkStyle to="/review" $isActive={location.pathname === '/review'}>
            <Text>책 리뷰</Text>
          </LinkStyle>
          <LinkStyle
            to="/"
            $isActive={location.pathname === '/' || location.pathname.startsWith('/gptpage')}
          >
            <Text>스토리북</Text>
          </LinkStyle>
          <LinkStyle to="/login" $isActive={location.pathname === '/login'}>
            <Text>로그인</Text>
          </LinkStyle>
          <LinkStyle to="/signup" $isActive={location.pathname === '/signup'}>
            <Text>회원가입</Text>
          </LinkStyle>
        </>
      )}
      {isLogin && (
        <>
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
            <LinkStyle to="/admin" $isActive={location.pathname === '/admin'}>
              <Text>관리자</Text>
            </LinkStyle>
          )}

          <LinkStyle to="/review" $isActive={location.pathname === '/review'}>
            <Text>책 리뷰</Text>
          </LinkStyle>
          <DropdownWrapper
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <DropdownToggle>
              <LinkStyle
                to="/"
                $isActive={location.pathname === '/' || location.pathname.startsWith('/gptpage')}
              >
                <Text>스토리북</Text>
              </LinkStyle>
            </DropdownToggle>
            <DropdownMenu $isOpen={isDropdownOpen}>
              <DropdownItem onClick={() => handleSelectChange('storybook')}>스토리북</DropdownItem>
              <DropdownItem>
                <Button onClick={handleCreateTemplate} status={status}>
                  {' '}
                  스토리 만들기
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
          <LinkStyle to="/mypage" $isActive={location.pathname === '/mypage'}>
            <Text>마이페이지</Text>
          </LinkStyle>

          <Logout onClick={() => logout()}>로그아웃</Logout>
        </>
      )}
    </Wrapper>
  );
};

export default NavigationItem;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
  gap: 25px;

  @media screen and (max-width: 1400px) {
    width: auto;
    gap: ${pixelToRem(10)};
  }
`;

const LinkStyle = styled(Link)<{ $isActive: boolean }>`
  width: auto;
  text-decoration: none;
  color: ${(props) =>
    props.$isActive ? getStyledColor('blue', 800) : getStyledColor('gray', 1000)};
`;

const Text = styled.div`
  height: 100%;
  color: inherit;
  font-size: ${pixelToRem(16)};
  transition: color 0.2s ease;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    color: ${getStyledColor('gray', 200)};
  }

  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(12)};
  }
  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(10)};
  }
`;
const Logout = styled.button`
  height: 100%;
  color: ${getStyledColor('gray', 1000)};
  background-color: inherit;
  transition: color 0.2s ease;
  font-weight: 500;
  white-space: nowrap;

  &:hover {
    color: ${getStyledColor('gray', 200)};
  }

  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(12)};
    align-self: flex-end;
  }
  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(12)};
  }
  @media screen and (max-width: 768px) {
    font-size: ${pixelToRem(10)};
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  height: 41px;
  line-height: 41px;
`;

const DropdownToggle = styled.div`
  height: 100%;
  color: ${getStyledColor('gray', 1000)};
  font-size: ${pixelToRem(16)};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${getStyledColor('gray', 200)};
  }

  @media screen and (max-width: 1400px) {
    font-size: ${pixelToRem(12)};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 41px;
  left: -50px;
  background-color: ${getStyledColor('orange', 700)};
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.$isOpen ? '0' : '-20px')});
  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    visibility 0.3s;
`;

const DropdownItem = styled.div`
  color: ${getStyledColor('white', 'high')};
  padding: 6px 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${getStyledColor('orange', 800)};
  }
`;
