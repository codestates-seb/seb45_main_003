import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import Button from "../common/Button";
import PostListTab from "./postListTab";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface profileData {
  name: string;
  phone: string;
  password: string;
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
    .profileImg {
      border-radius: 6px;
    }
    .labelContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      justify-content: center;
      align-items: stretch;
      .info {
        font-size: ${FONT_SIZE.font_16};
        padding: 0.5rem 0.75rem;
      }
    }
  }
`;
const Modifyform = styled.form`
  width: 18.75rem;
  padding: 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  gap: 0.5rem;
  .inputContainer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
  }
  .errormessage {
    color: ${COLOR.invalid};
  }
  .errorInput {
    border-color: ${COLOR.invalid};
  }
`;

const ProfileContent = (): JSX.Element => {
  const [modifyMode, setModifyMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<profileData>();
  const [profile, setProfile] = useState(null);
  const getProfile = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/members/{member-id}`);
    setProfile(res.data);
  };
  const submitModifiedProfile = async (body: profileData) => {
    const res = await axios.patch(`${process.env.REACT_APP_API_URL}/members/{member-id}`, body);
    if (res.status === 200) {
      setModifyMode(!modifyMode);
      getProfile();
    }
  };
  useEffect(() => {
    getProfile();
  }, [profile]);
  return (
    <ProfileContentContainer>
      <div className="topContainer">
        <p className="menuTitle">프로필</p>
        <Button
          type="button"
          text="변경"
          design="black"
          onClick={() => setModifyMode(!modifyMode)}
        />
      </div>
      {!modifyMode ? (
        <div className="profileInfoContainer">
          <img className="profileImg"></img>
          <div className="labelContainer">
            <label className="infoLabel">성함</label>
            <label className="infoLabel">이메일</label>
            <label className="infoLabel">작성글 갯수</label>
            <label className="infoLabel">거래완료 횟수</label>
          </div>
          <ul className="infoContainer">
            <li className="info">사용자 성함</li>
            <li className="info">사용자 이메일</li>
            <li className="info">사용자 작성글 갯수</li>
            <li className="info">사용자 거래완료 횟수</li>
          </ul>
        </div>
      ) : (
        <Modifyform onSubmit={handleSubmit(submitModifiedProfile)}>
          <div className="inputContainer">
            <label htmlFor="email">성함</label>
            <input
              id="name"
              type="text"
              placeholder="name"
              className={errors.name ? "errorInput" : "input"}
              {...register("name", {
                required: "이름을 입력해주세요.",
              })}
            />
          </div>
          {errors.name && <div className="errormessage">{errors.name?.message}</div>}
          <div className="inputContainer">
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
          </div>
          {errors.password && <div className="errormessage">{errors.password?.message}</div>}
          <Button type="submit" disabled={isSubmitting} text="저장" design="black" />
        </Modifyform>
      )}
      <PostListTab />
    </ProfileContentContainer>
  );
};

export default ProfileContent;
