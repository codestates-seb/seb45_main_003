import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { styled } from "styled-components";

interface LoginForm {
  email: string;
  password: string;
  formError: string;
}
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

  const submitLogin = async (data: LoginData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/members/login`, data);
    if (!response) {
      setError("formError", {
        message: "이메일 또는 비밀번호가 잘못 작성되었습니다.",
      });
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
      {errors ? <div>{errors.email?.message}</div> : null}
      <label htmlFor="password"></label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
        })}
      />
      {errors ? <div>{errors.password?.message}</div> : null}
      <Button type={"submit"} disabled={isSubmitting} buttonText={"로그인"} />
    </StyledLoginForm>
  );
};

export default LogInForm;
