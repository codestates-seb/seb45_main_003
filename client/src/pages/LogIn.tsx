import { styled } from "styled-components";
import login from "../assets/images/Login/login.png";
import signup from "../assets/images/Login/signup.png";
import Button from "../components/common/Button";
import LogInForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";
import { COLOR } from "../constants/color";
import { useLocation, useNavigate } from "react-router-dom";

const BackgroundContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  .signUp {
    height: 50rem;
  }
  .login {
    height: 30rem;
  }
  @media (max-width: 64rem) {
    width: 100%;
    padding: 1rem 0;
  }

  @media (max-width: 48rem) {
    width: 100%;
    img {
      display: none;
    }
  }
`;

const PageContentContainer = styled.div`
  padding: 2rem 1.25rem 2rem 1.25rem;
  border: 1px solid ${COLOR.gray_300};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 1.5rem;

  .bottomContainer {
    border-top: 0.0625rem solid ${COLOR.gray_300};
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .guide {
      width: 224px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: 0.75rem;
      .guideTitle {
        text-align: center;
      }
    }
  }
  @media (max-width: 48rem) {
    min-width: 20rem;
    padding: 0;
    border: none;
  }
`;

const LogIn = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginPageForm = new URLSearchParams(location.search).get("mode");
  const navigateSignup = () => {
    navigate(`/login?mode=signup`);
  };
  const navigateLogin = () => {
    navigate(`/login?mode=login`);
  };

  return (
    <BackgroundContainer>
      {loginPageForm === "login" && <img src={login} className="login" />}
      {loginPageForm === "signup" && <img src={signup} className="signUp" />}
      {loginPageForm === "login" && (
        <PageContentContainer>
          <h2>로그인</h2>
          <LogInForm />
          <div className="bottomContainer">
            <div className="guide">
              <div className="guideTitle">서비스를 처음 방문하셨나요?</div>
              <Button
                type={"button"}
                $text={"회원가입"}
                onClick={navigateSignup}
                $design={"black"}
              />
            </div>
          </div>
        </PageContentContainer>
      )}
      {loginPageForm === "signup" && (
        <PageContentContainer>
          <h2>회원가입</h2>
          <SignupForm />
          <div className="bottomContainer">
            <div className="guide">
              <div className="guideTitle">이미 계정이 있으신가요?</div>
              <Button type={"button"} $text={"로그인"} onClick={navigateLogin} $design={"black"} />
            </div>
          </div>
        </PageContentContainer>
      )}
    </BackgroundContainer>
  );
};

export default LogIn;
