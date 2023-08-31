import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { styled } from "styled-components";

interface SignupForm {
  name: string;
  email: string;
  confirmcode: string;
  password: string;
  checkpassword: string;
  phone: string;
  formError: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const StyledSignupForm = styled.form`
  width: 48.3125rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
`;

const SignupForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<SignupForm>();

  const submitSignup = async (data: SignupData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/members`, data);
    if (!response) {
      setError("formError", {
        message: "이메일 또는 비밀번호가 잘못 작성되었습니다.",
      });
    }
  };

  let servercode: string;

  const reqConfirmCode = async () => {
    servercode = await axios.post(`${process.env.REACT_APP_API_URL}/email/auth/send`);
  };

  return (
    <StyledSignupForm onSubmit={handleSubmit(submitSignup)}>
      <label htmlFor="name">성함</label>
      <input
        id="name"
        type="text"
        placeholder="성함"
        {...register("name", {
          required: "성함을 작성해주세요.",
        })}
      />
      {errors.name && <div>{errors.name?.message}</div>}
      <label htmlFor="email">Email</label>
      <div>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "이메일을 작성해주세요.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
              message: "이메일 형식에 맞게 작성해주세요.",
            },
          })}
        />
        <Button type={"button"} disabled={false} buttonText={"인증요청"} onClick={reqConfirmCode} />
      </div>
      {errors.email && <div>{errors.email?.message}</div>}
      <label htmlFor="confirmcode">인증코드</label>
      <div>
        <input
          id="confirmcode"
          type="text"
          placeholder="인증코드"
          {...register("confirmcode", {
            required: "이메일로 전송된 인증코드를 입력해주세요.",
            validate: {
              check: (value) => {
                if (value === servercode) {
                  return "인증코드가 일치하지 않습니다.";
                }
              },
            },
          })}
        />
        <Button
          type={"button"}
          disabled={false}
          buttonText={"인증하기"} /*버튼에 인증하는 이벤트 필요*/
        />
      </div>
      {errors.confirmcode && <div>{errors.confirmcode?.message}</div>}
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "비밀번호를 입력해주세요.",
          minLength: {
            value: 8,
            message: "8자리 이상의 비밀번호를 사용해주세요.",
          },
          pattern: {
            value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9])/,
            message: "비밀번호는 숫자, 특수문자, 영문을 조합해주세요.",
          },
        })}
      />
      {errors.password && <div>{errors.password?.message}</div>}
      <label htmlFor="chekcpassword">비밀번호 확인</label>
      <input
        id="checkpassword"
        type="password"
        placeholder="비밀번호 확인"
        {...register("checkpassword", {
          required: "비밀번호를 확인해주세요.",
          validate: (value: string) => {
            if (value !== getValues("password")) {
              return "비밀번호가 일치하지 않습니다.";
            }
          },
        })}
      />
      {errors.checkpassword && <div>{errors.checkpassword?.message}</div>}
      <label htmlFor="phone">핸드폰 번호</label>
      <input
        id="phone"
        type="text"
        placeholder="-를 제외한 번호를 입력해주세요."
        {...register("phone", {
          required: "핸드폰 번호를 작성해주세요.",
          pattern: {
            value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
            message: "휴대폰 번호로 적어주세요.",
          },
        })}
      />
      {errors.phone && <div>{errors.phone?.message}</div>}
      <Button type="submit" disabled={isSubmitting} buttonText={"회원가입"} />
    </StyledSignupForm>
  );
};

export default SignupForm;
