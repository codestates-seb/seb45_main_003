import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import Button from "../common/Button";
import PostListTab from "./postListTab";

const ProfileContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
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

const ProfileContent = (): JSX.Element => {
  return (
    <ProfileContentContainer>
      <div className="topContainer">
        <p className="menuTitle">프로필</p>
        <Button type="button" text="변경" design="black" />
      </div>
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
      <PostListTab />
    </ProfileContentContainer>
  );
};

export default ProfileContent;
