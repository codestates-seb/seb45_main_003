//드롭다운 메뉴 아이템
import { Logout } from "@mui/icons-material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../atoms/atoms";
import { totalUnreadMessagesState } from "../chatting/recoil/chatState";

const ItemBox = styled.div`
  align-self: stretch;
  width: calc(100% - 3rem);
  padding: 1.0625rem 1.8125rem 1.125rem 1.4375rem;
  border-radius: 0.375rem;
`;

// 버튼 호버 스타일
const StyledLink = styled(Link)`
  &:hover {
    /* background-color: #ffb300; // 원하는 호버 색상 */
    color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .Text {
    justify-content: center;
    flex: 1;
    padding-left: 1.4375rem;
  }
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  width: 15.0625rem;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.375rem;
  /* border: 1px solid #ebebeb; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
`;

// 프롭스 타입 정의
interface ProfileListProps {
  icon: JSX.Element; // 아이콘 컴포넌트
  text: string; // 텍스트
  count: number | string; // 카운트
  linkTo: string;
  onClickfunc?: () => void;
}

const ProfileList: React.FC<ProfileListProps> = ({ icon, text, count, linkTo, onClickfunc }) => {
  const totalUnreadMessages = useRecoilValue(totalUnreadMessagesState);

  return (
    <>
      <ItemBox>
        <StyledLink className="Button" onClick={onClickfunc} to={linkTo}>
          <div className="IconImg">{icon}</div> {/* 아이콘 렌더링 */}
          <div className="Text">{text}</div> {/* 텍스트 렌더링 */}
          {totalUnreadMessages > 0 && <div className="count">{count}</div>}
          {/* 카운트 렌더링 */}
        </StyledLink>{" "}
      </ItemBox>
    </>
  );
};

// 사용 예시
const ProfileButton = () => {
  const setLogin = useSetRecoilState(loginState);
  const profilePath = `/member/${localStorage.getItem("Id")}?menu=profile&tabmenu=sell&page=1`;
  const totalUnreadMessages = useRecoilValue(totalUnreadMessagesState);
  const logout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogin(false);
  };
  return (
    <Container>
      <ProfileList
        icon={<PersonIcon />} // 아이콘 컴포넌트
        text="Profile" // 텍스트
        count={""} // 카운트
        linkTo={profilePath}
      />
      <ProfileList
        icon={<ChatBubbleIcon />} // 아이콘 컴포넌트
        text="Messages" // 텍스트
        count={totalUnreadMessages} // 카운트
        linkTo={`/chat/${localStorage.getItem("Id")}`}
      />
      <ProfileList
        icon={<Logout />}
        text="Log out"
        count={""}
        linkTo={"/"}
        onClickfunc={() => logout()}
      />
    </Container>
  );
};
export default ProfileButton;
