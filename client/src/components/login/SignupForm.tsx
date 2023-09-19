import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toSignup } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { useModal } from "../../hooks/useModal";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { defaultInstance } from "../../interceptors/interceptors";
import { FONT_SIZE } from "../../constants/font";

//폼에서 사용하는 데이터
interface SignupForm {
  name: string;
  email: string;
  confirmcode: string;
  password: string;
  checkpassword: string;
  formError: string;
}
//실제로 보내는 데이터
interface SignupData {
  name: string;
  email: string;
  password: string;
}

const StyledSignupForm = styled.form`
  width: 28.125rem;
  padding-bottom: 0.5rem;
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
    flex: 1 0 18.75rem;
  }
  #confirmcode {
    flex: 1 0 18.75rem;
  }
  .errormessage {
    color: ${COLOR.invalid};
  }
  .successmessage {
    color: ${COLOR.valid};
  }
  .errorInput {
    border-color: ${COLOR.invalid};
  }
  @media (max-width: 48rem) {
    padding: 0;
    width: 100%;

    #confirmcode {
      width: calc(100% - 5.6531rem - 0.6875rem);
      flex: none;
    }
    #email {
      width: calc(100% - 5.6531rem - 0.6875rem);
      flex: none;
    }
  }
`;
const StyledModal = styled.div`
  width: 22.0625rem;
  height: 11.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 2.3125rem;
  .modalTitleContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    .modalTitle {
      font-size: ${FONT_SIZE.font_20};
      font-weight: bold;
    }
  }
  .modalButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;
//readonly 일때 인풋 백그라운드 변화필요
const SignupForm = (): JSX.Element => {
  const [success, setSuccess] = useState({
    req: false,
    confirm: false,
  });
  const [sendMessage, setSendMessage] = useState("");
  const [lock, setLock] = useState(false);
  const codeWait = () => {
    setTimeout(() => {
      setLock(false);
    }, 30000);
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
    clearErrors,
  } = useForm<SignupForm>();
  const { toggleModal, isOpen, closeModal } = useModal();
  //폼에 작성된 데이터들을 서버로 전송하는 함수
  const submitSignup = async (data: SignupData) => {
    try {
      const response = await defaultInstance.post(`/members`, data);
      if (response.status === 201) {
        toggleModal();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError("formError", {
            message: "잘못 작성된 부분이 있습니다.",
          });
        }
      }
    }
  };
  //인증코드를 보내달라는 요청 함수
  const reqConfirmCode = async (data: string) => {
    //새로고침 방지
    event?.preventDefault();
    clearErrors("email");
    setSendMessage("인증코드를 보내는 중입니다.");
    try {
      const response = await defaultInstance.post(`/email/auth/send`, {
        email: data,
      });
      if (response.status === 200) {
        //인증코드 전송시 안내문 제공
        setSendMessage("");
        setSuccess({ ...success, req: true });
        setLock(true);
        codeWait();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError("email", {
            message: "이미 등록된 이메일입니다.",
          });
          setSendMessage("");
        }
      }
    }
  };
  //사용자가 작성한 인증코드를 서버에서 검증하게 보내주는 함수
  const testConfirmCode = async (data: SignupForm) => {
    //새로고침 방지
    event?.preventDefault();
    clearErrors("confirmcode");
    try {
      const response = await defaultInstance.post(`/email/auth`, {
        email: data.email,
        authCode: data.confirmcode,
      });
      if (response.status === 200) {
        //인증성공시 인증코드 작성란과 이메일 작성란을 비활성화
        setSuccess({ ...success, confirm: true });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("confirmcode", {
            message: "인증코드가 다릅니다.",
          });
        }
      }
    }
  };

  const [loginPageForm, setloginPageForm] = useRecoilState(toSignup);
  //로그인 컴포넌트로 변환하는 함수
  const changeform = () => {
    setloginPageForm(!loginPageForm);
  };
  return (
    <>
      <StyledSignupForm onSubmit={handleSubmit(submitSignup)}>
        <label htmlFor="name">성함</label>
        <input
          id="name"
          type="text"
          placeholder="성함"
          className={errors.name ? "errorInput" : "input"}
          {...register("name", {
            required: "성함을 작성해주세요.",
          })}
        />
        {errors.name && <div className="errormessage">{errors.name?.message}</div>}
        <label htmlFor="email">Email</label>
        <div className="withButton">
          <input
            id="email"
            type="email"
            placeholder="Email"
            readOnly={success.confirm}
            className={errors.email ? "errorInput" : "input"}
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
            type="button"
            $text="인증요청"
            onClick={() => reqConfirmCode(getValues("email"))}
            $design="yellow"
            disabled={lock}
          />
        </div>
        {errors.email && <div className="errormessage">{errors.email?.message}</div>}
        {success.req && <div className="successmessage">인증코드를 전송했습니다.</div>}
        {sendMessage !== "" && <div className="successmessage">{sendMessage}</div>}
        <label htmlFor="confirmcode">인증코드</label>
        <div className="withButton">
          <input
            id="confirmcode"
            type="text"
            placeholder="인증코드"
            readOnly={success.confirm}
            className={errors.confirmcode ? "errorInput" : "input"}
            {...register("confirmcode", {
              required: "이메일로 전송된 인증코드를 입력해주세요.",
            })}
          />
          <Button
            type="button"
            $text="인증하기"
            onClick={() => testConfirmCode(getValues())}
            $design="yellow"
          />
        </div>
        {errors.confirmcode && <div className="errormessage">{errors.confirmcode?.message}</div>}
        {success.confirm && <div className="successmessage">인증되었습니다.</div>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호는 8자리 이상의 숫자, 특수문자, 영문을 조합해주세요."
          className={errors.password ? "errorInput" : "input"}
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
        {errors.password && <div className="errormessage">{errors.password?.message}</div>}
        <label htmlFor="chekcpassword">비밀번호 확인</label>
        <input
          id="checkpassword"
          type="password"
          placeholder="비밀번호 확인"
          className={errors.checkpassword ? "errorInput" : "input"}
          {...register("checkpassword", {
            required: "비밀번호를 확인해주세요.",
            validate: (value: string) => {
              if (value !== getValues("password")) {
                return "비밀번호가 일치하지 않습니다.";
              }
            },
          })}
        />
        {errors.checkpassword && (
          <div className="errormessage">{errors.checkpassword?.message}</div>
        )}
        <Button type="submit" disabled={isSubmitting} $text="회원가입" $design="black" />
      </StyledSignupForm>
      <Modal isOpen={isOpen} closeModal={closeModal} toggleModal={toggleModal}>
        <StyledModal>
          <div className="modalTitleContainer">
            <p className="modalTitle">회원가입 성공</p>
          </div>
          <div className="modalMessageContainer">
            <p className="modalText">새로운 회원이 되신것을 환영합니다.</p>
          </div>
          <div className="modalButtonContainer">
            <Button type="button" $text="확인" onClick={() => changeform()} $design="black" />
          </div>
        </StyledModal>
      </Modal>
    </>
  );
};

export default SignupForm;
