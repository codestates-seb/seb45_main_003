import { styled } from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import DropdownMenuButton from "../DropdownMenu/DropdownMenu";

const Container = styled.div`
  display: flex;
  width: auto;
  height: 91px;
  padding: 0rem 15rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderBox = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;

  width: 88.5rem;
  height: 5.6875rem;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: aqua;
`;

const LogoBox = styled.div`
  height: 2rem;
  width: 14.0625rem;
  flex: 1;
`;

const LogInButton = styled.div`
  height: 1.5rem;
  width: 7rem;
  color: var(--text, #212121);
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 150% */
  letter-spacing: 0.0125rem;
`;

const DropDown = styled.div`
  width: 25.256px;
  height: 24px;
  flex-shrink: 0;
  /* background-color: black; */
  margin-right: 0.7338rem;
  margin-left: 2.3125rem;
`;

const clickMe = () => {
  document.location.href = "/login";
};

const Header = (): JSX.Element => {
  return (
    <>
      <Container>
        <HeaderBox>
          <LogoBox>
            <Logo />
          </LogoBox>
          <LogInButton onClick={clickMe}>로그인/회원가입</LogInButton>
          <DropDown>
            <DropdownMenuButton />
          </DropDown>
        </HeaderBox>
      </Container>
    </>
  );
};

export default Header;
