import axios from "axios";
import { useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  formError: string;
}
interface LoginData {
  username: string;
  password: string;
}

const LogInForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginForm>();

  const submitLogin = async (data: LoginData) => {
    const response = await axios.post("url", data);
    if (!response) {
      setError("formError", {
        message: "이메일 또는 비밀번호가 잘못 작성되었습니다.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitLogin)}>
      <h1>로그인</h1>
      <label htmlFor="email"></label>
      <input
        id="email"
        type="email"
        placeholder="Email"
        {...register("username", {
          required: "이메일을 입력해주세요.",
        })}
      />
      {errors ? <div>{errors.username?.message}</div> : null}
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
      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default LogInForm;
