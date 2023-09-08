import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { useModal } from "../../hooks/useModal";
import Button from "../common/Button";
import Modal from "../common/Modal";
import PostListTab from "./postListTab";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
import { authInstance, defaultInstance } from "../../interceptors/interceptors";
import { useLocation } from "react-router-dom";
import ProfileImgRegisterForm from "./profileImgForm";

interface Profile {
  memberId: number;
  name: string;
  email: string;
  phone: string;
  postCount: number;
  tradeCount: number;
}

interface modifyProfileForm {
  passwordCheck: string;
  newPassword: string;
  images: string;
  image: string;
}

const ProfileContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: calc(100% - 14rem);
  .topContainer {
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid ${COLOR.darkText};
    .menuTitle {
      font-size: ${FONT_SIZE.font_32};
      font-weight: bold;
    }
  }
  .profileInfoContainer {
    padding: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    gap: 2rem;
    .imgContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      gap: 0.5rem;
      .profileImg {
        border-radius: 6px;
        width: 9.375rem;
        height: 9.375rem;
      }
    }
    .labelContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      .infoLabel {
        text-align: end;
        font-size: ${FONT_SIZE.font_16};
        font-weight: bold;
        padding: 0.5rem 0.75rem;
      }
    }
    .infoContainer {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      .info {
        font-size: ${FONT_SIZE.font_16};
        padding: 0.5rem 0.75rem;
      }
    }
  }
`;
const StyledModal = styled.form`
  width: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  gap: 16px;
  .modalInputContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: 0.5rem;
    .ButtonContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 1rem;
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
  }
  .modalButtonContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
`;

const ProfileContent = (): JSX.Element => {
  const [profile, setProfile] = useState<Profile>({
    memberId: 0,
    name: "",
    email: "",
    phone: "",
    postCount: 0,
    tradeCount: 0,
  });
  // const Id = window.location.search
  const loginUserId = localStorage.getItem("Id");
  const location = useLocation();
  const Id = location.pathname.slice(9);
  const [pass, setPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    getValues,
  } = useForm<modifyProfileForm>();
  const isLogin = useRecoilValue(loginState);
  const { toggleModal, closeModal, isOpen } = useModal();
  // 추후 Id는 주소에 있는 id로 가져오게 변경해야함
  const getProfile = async () => {
    try {
      const res = await defaultInstance.get(`/members/${Id}`);
      setProfile(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const modifyPassword = async (body: modifyProfileForm) => {
    try {
      const res = await authInstance.patch(`/members/${Id}`, { password: body.newPassword });
      setProfile(res.data);
      alert("변경되었습니다.");
      resetModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const validatePassword = async (body: string) => {
    try {
      const res = await authInstance.post(`/members/auth/password`, { password: body });
      if (res.status === 200) {
        setPass(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setPass(false);
          setError("passwordCheck", {
            message: "틀린 비밀번호입니다.",
          });
        }
      }
    }
  };
  const [modifyImgMode, setModifyImgMode] = useState(false);
  const setModifyMode = () => {
    setModifyImgMode(!modifyImgMode);
  };
  const resetModal = () => {
    setValue("newPassword", "");
    setValue("passwordCheck", "");
    setPass(false);
    toggleModal();
  };
  useEffect(() => {
    getProfile();
  }, [isLogin]);
  if (profile.name !== "") {
    return (
      <ProfileContentContainer>
        <div className="topContainer">
          <p className="menuTitle">프로필</p>
          {loginUserId === Id && (
            <Button
              type="button"
              $text="비밀번호 변경"
              onClick={() => toggleModal()}
              $design="black"
            />
          )}
        </div>
        <div className="profileInfoContainer">
          <div className="imgContainer">
            {!modifyImgMode ? (
              <>
                <img className="profileImg"></img>
                {loginUserId === Id && (
                  <Button
                    type="button"
                    $text="이미지 변경"
                    $design="black"
                    onClick={() => setModifyMode()}
                  />
                )}
              </>
            ) : (
              <>
                <ProfileImgRegisterForm setMode={setModifyImgMode} mode={modifyImgMode} />
              </>
            )}
          </div>
          <div className="labelContainer">
            <label className="infoLabel">성함</label>
            <label className="infoLabel">이메일</label>
            <label className="infoLabel">작성글 갯수</label>
            <label className="infoLabel">거래완료 횟수</label>
          </div>
          <ul className="infoContainer">
            <li className="info">{profile.name}</li>
            <li className="info">{profile.email}</li>
            <li className="info">{profile.postCount} 개</li>
            <li className="info">{profile.tradeCount} 회</li>
          </ul>
        </div>
        <PostListTab />
        <Modal isOpen={isOpen} closeModal={closeModal} toggleModal={resetModal}>
          <StyledModal onSubmit={handleSubmit(modifyPassword)}>
            <div className="modalInputContainer">
              <label htmlFor="passwordCheck">비밀번호</label>
              <input
                id="passwordCheck"
                type="password"
                placeholder="기존 비밀번호를 확인해야 변경 가능합니다."
                className={errors.passwordCheck && !pass ? "errorInput" : "input"}
                {...register("passwordCheck", {
                  required: "현재 비밀번호를 입력해주세요.",
                })}
              ></input>
              <div className="ButtonContainer">
                {errors.passwordCheck && !pass && (
                  <div className="errormessage">{errors.passwordCheck?.message}</div>
                )}
                {pass && <div className="successmessage">확인되었습니다.</div>}
                <Button
                  type="button"
                  $text="비밀번호 확인"
                  $design="black"
                  onClick={() => validatePassword(getValues("passwordCheck"))}
                />
              </div>
              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                id="newPassword"
                type="password"
                placeholder="새 비밀번호"
                disabled={!pass}
                className={errors.newPassword ? "errorInput" : "input"}
                {...register("newPassword", {
                  required: "새로운 비밀번호를 입력해주세요.",
                })}
              ></input>
              {errors.newPassword && (
                <div className="errormessage">{errors.newPassword?.message}</div>
              )}
            </div>
            <div className="modalButtonContainer">
              <Button type="submit" $text="확인" $design="black" disabled={isSubmitting} />
            </div>
          </StyledModal>
        </Modal>
      </ProfileContentContainer>
    );
  } else {
    return <></>;
  }
};

export default ProfileContent;
