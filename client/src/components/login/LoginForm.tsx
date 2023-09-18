import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { loginState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import Button from "../common/Button";
import { defaultInstance } from "../../interceptors/interceptors";
import { useState } from "react";

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
  .errormessage {
    color: ${COLOR.invalid};
  }
  .errorInput {
    border-color: ${COLOR.invalid};
  }
`;

const LogInForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const navigate = useNavigate();
  const setLogin = useSetRecoilState(loginState);
  const [errorMessage, setErrorMessage] = useState("");
  //로그인 시도 함수
  const submitLogin = async (body: LoginData) => {
    try {
      const response = await defaultInstance.post(`/members/login`, body);
      if (response.status === 200) {
        const headers = response.headers;
        const accessToken = headers["authorization"];
        const refreshToken = headers["refresh"];
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        //id도 담아주면 id도 저장
        localStorage.setItem("Id", response.data.memberId);
        setLogin(true);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setErrorMessage("등록된 회원이 아닙니다.");
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
        className={errors.email ? "errorInput" : "input"}
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
        className={errors.password ? "errorInput" : "input"}
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
        })}
      />
      {errors.password && <div className="errormessage">{errors.password?.message}</div>}
      {errorMessage.length !== 0 && <div className="errormessage">{errorMessage}</div>}
      <Button type="submit" $text="로그인" $design="black" />
    </StyledLoginForm>
  );
};

export default LogInForm;
