import { styled } from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";

const Container = styled.div`
  display: flex;
  width: 1920px;
  height: 91px;
  padding: 0px 240px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0;
  border-bottom: 1px solid #e0e0e0;
`;

const HeaderBox = styled.div`
  padding-left: 12px;
  padding-right: 12px;

  width: 1416px;
  height: 91px;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: aqua;
`;

const LogoBox = styled.div`
  height: 32px;
  width: 225px;
  flex: 1;
`;

const LogInButton = styled.div`
  height: 24px;
  width: 112px;
  color: var(--text, #212121);
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px; /* 150% */
  letter-spacing: 0.2px;
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
        </HeaderBox>
      </Container>
    </>
  );
};

export default Header;
