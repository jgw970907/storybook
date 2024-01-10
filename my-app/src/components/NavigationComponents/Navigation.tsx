import styled from "styled-components";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <NavContainer>
      <Logo>웹프로젝트</Logo>
      <LinkContainer>
        <Link to="/">메인</Link>
        <Link to="/signup">회원가입</Link>
        <Link to="/login">로그인</Link>
      </LinkContainer>
    </NavContainer>
  );
};

export default Navigation;

const NavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #285fa8;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
`;
const Logo = styled.div`
  font-size: 30px;
  color: white;
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1rem;
  color: white;
  justify-content: space-between;
  align-items: center;
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    color: #243648;
  }
`;
