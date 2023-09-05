import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../atoms/atoms";
//폼에서 사용하는 데이터
interface LoginForm {
  email: string;
  password: string;
  formError: string;
}
//실제로 보내는 데이터
interface LoginData {
  email: string;
  password: string;
}

const StyledLoginForm = styled.form`
  width: 18.75rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  gap: 0.5rem;
`;
//errormessage 빨간색
const LogInForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  //로그인 시도 함수
  const submitLogin = async (body: LoginData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/login`, body);
      if (response.status === 200) {
        const headers = response.headers;
        const accessToken = headers["authorization"];
        const refreshToken = headers["refresh"];
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("formError", {
            message: "이메일 또는 비밀번호가 잘못 작성되었습니다.",
          });
        }
      }
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit(submitLogin)}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "이메일을 입력해주세요.",
        })}
      />
      {errors.email && <div>{errors.email?.message}</div>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
        })}
      />
      {errors.password && <div>{errors.password?.message}</div>}
      <Button type="submit" disabled={isSubmitting} text="로그인" design="black" />
    </StyledLoginForm>
  );
};

export default LogInForm;
