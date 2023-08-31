import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "../common/Button";
import { styled } from "styled-components";
//폼에서 사용하는 데이터
interface SignupForm {
  name: string;
  email: string;
  confirmcode: string;
  password: string;
  checkpassword: string;
  phone: string;
  formError: string;
}
//실제로 보내는 데이터
interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const StyledSignupForm = styled.form`
  width: 28.125rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.5rem;
  .withButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.6875rem;
  }
  #email {
    flex: 1 0 21.875rem;
  }
  #confirmcode {
    flex: 1 0 21.875rem;
  }
`;

const SignupForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm<SignupForm>();
  //폼에 작성된 데이터들을 서버로 전송하는 함수
  const submitSignup = async (data: SignupData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/members`, data);
    if (!response) {
      setError("formError", {
        message: "잘못 작성된 부분이 있습니다.",
      });
    }
  };
  //인증코드를 보내달라는 요청 함수
  const reqConfirmCode = async (data: string) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/email/auth/send`, {
      email: data,
    });
  };
  //사용자가 작성한 인증코드를 서버에서 검증하게 보내주는 함수
  const testConfirmCode = async (data: SignupForm) => {
    await axios.get(`${process.env.REACT_APP_API_URL}/email/auth`, {
      data: {
        email: data.email,
        authCode: data.confirmcode,
      },
    });
  };
  //Todo: 이메일이 인증되면 이메일을 바꿀 수 없게 email input 비활성화, buttonText를 buttontext로 수정
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
      <div className="withButton">
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
        <Button
          type={"button"}
          disabled={false}
          buttonText={"인증요청"}
          onClick={() => reqConfirmCode(getValues("email"))}
        />
      </div>
      {errors.email && <div>{errors.email?.message}</div>}
      <label htmlFor="confirmcode">인증코드</label>
      <div className="withButton">
        <input
          id="confirmcode"
          type="text"
          placeholder="인증코드"
          {...register("confirmcode", {
            required: "이메일로 전송된 인증코드를 입력해주세요.",
          })}
        />
        <Button
          type={"button"}
          disabled={false}
          buttonText={"인증하기"}
          onClick={() => testConfirmCode(getValues())}
        />
      </div>
      {errors.confirmcode && <div>{errors.confirmcode?.message}</div>}
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        placeholder="비밀번호는 8자리 이상의 숫자, 특수문자, 영문을 조합해주세요."
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
      <Button type={"submit"} disabled={isSubmitting} buttonText={"회원가입"} />
    </StyledSignupForm>
  );
};

export default SignupForm;
