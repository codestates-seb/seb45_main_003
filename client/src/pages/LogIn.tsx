import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { styled } from "styled-components";
import login from "../assets/images/Login/login.png";
import signup from "../assets/images/Login/signup.png";
import { loginState, toSignup } from "../atoms/atoms";
import Button from "../components/common/Button";
import LogInForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";
import { COLOR } from "../constants/color";

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const PageContentContainer = styled.div`
  padding: 3rem 1.25rem 3rem 1.25rem;
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

  #socialButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 0.75rem;
  }

  .labelContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: "";
      top: 0.5rem;
      width: 3.125rem;
      height: 0.0625rem;
      background-color: ${COLOR.darkText};
    }
    &:after {
      content: "";
      top: 0.5rem;
      width: 3.125rem;
      height: 0.0625rem;
      background-color: ${COLOR.darkText};
    }
    .socialLabel {
      padding: 0.5rem 0.75rem;
    }
  }
`;

const LogIn = (): JSX.Element => {
  const [loginPageForm, setloginPageForm] = useRecoilState(toSignup);
  const changeform = () => {
    setloginPageForm(!loginPageForm);
  };
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState);
  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }
  }, [isLogin]);
  return (
    <BackgroundContainer>
      {loginPageForm ? <img src={login} /> : <img src={signup} />}
      {loginPageForm ? (
        <PageContentContainer>
          <h2>로그인</h2>
          <LogInForm />
          <div className="labelContainer">
            <label htmlFor="socialButtonContainer" className="socialLabel">
              소셜 로그인
            </label>
          </div>
          <div id="socialButtonContainer">
            <Button type="button" $text={"구글 로그인"} $design={"yellow"} />
            <Button type="button" $text={"카카오 로그인"} $design={"yellow"} />
          </div>
          <div className="bottomContainer">
            <div className="guide">
              <div className="guideTitle">서비스를 처음 방문하셨나요?</div>
              <Button type={"button"} $text={"회원가입"} onClick={changeform} $design={"black"} />
            </div>
          </div>
        </PageContentContainer>
      ) : (
        <PageContentContainer>
          <h2>회원가입</h2>
          <SignupForm />
          <div className="bottomContainer">
            <div className="guide">
              <div className="guideTitle">이미 계정이 있으신가요?</div>
              <Button type={"button"} $text={"로그인"} onClick={changeform} $design={"black"} />
            </div>
          </div>
        </PageContentContainer>
      )}
    </BackgroundContainer>
  );
};

export default LogIn;
