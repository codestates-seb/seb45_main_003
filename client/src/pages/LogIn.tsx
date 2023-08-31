import LogInForm from "../components/login/LoginForm";
import SignupForm from "../components/login/SignupForm";
import Button from "../components/common/Button";
import { useRecoilState } from "recoil";
import { toSignup } from "../atoms/atoms";

const LogIn = (): JSX.Element => {
  const [loginPageForm, setloginPageForm] = useRecoilState(toSignup);
  const changeform = () => {
    setloginPageForm(!loginPageForm);
  };
  return (
    <div>
      {loginPageForm ? (
        <div>
          <h1>로그인</h1>
          <LogInForm />
          <fieldset>
            <legend>소셜 로그인</legend>
          </fieldset>
          <div>
            <div>서비스를 처음 방문하셨나요?</div>
            <Button disabled={false} type={"button"} buttonText={"회원가입"} onClick={changeform} />
          </div>
        </div>
      ) : (
        <div>
          <h1>회원가입</h1>
          <SignupForm />
          <div>
            <div>이미 계정이 있으신가요?</div>
            <Button disabled={false} type={"button"} buttonText={"로그인"} onClick={changeform} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LogIn;
