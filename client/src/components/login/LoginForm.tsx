import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { styled } from "styled-components";
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

const LogInForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();
  //로그인 시도 함수
  const submitLogin = async (body: LoginData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/login`, body);
    if (!response) {
      setError("formError", {
        message: "이메일 또는 비밀번호가 잘못 작성되었습니다.",
      });
    } else {
      try {
        const headers = response.headers;
        const getToken = async () => {
          const accessToken = headers["Authorization"].toString();
          const refreshToken = headers["Refresh"].toString();
          localStorage.setItem("accessToekn", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        };
        getToken();
      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }
  };

  return (
    <StyledLoginForm onSubmit={handleSubmit(submitLogin)}>
      <label htmlFor="email"></label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "이메일을 입력해주세요.",
        })}
      />
      {errors.email && <div>{errors.email?.message}</div>}
      <label htmlFor="password"></label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
        })}
      />
      {errors.password && <div>{errors.password?.message}</div>}
      <Button type={"submit"} disabled={isSubmitting} buttonText={"로그인"} />
    </StyledLoginForm>
  );
};

export default LogInForm;
