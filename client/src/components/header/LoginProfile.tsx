//드롭다운 메뉴 아이템
import styled from "styled-components";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import { red } from "@mui/material/colors";

const ItemBox = styled.div`
  /* max-width: 15.0625rem;
  height: 4.3125rem; */
  align-self: stretch;
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 1.0625rem 1.8125rem 1.125rem 4.125rem;

  /* background-color: aqua; */
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
  display: flex;
  width: 241px;
  flex-direction: column;
  align-items: flex-start;
`;

// 프롭스 타입 정의
interface ProfileListProps {
  icon: JSX.Element; // 아이콘 컴포넌트
  text: string; // 텍스트
  count: number; // 카운트
  linkTo: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ icon, text, count, linkTo }) => {
  return (
    <>
      <ItemBox>
        <StyledLink className="Button" to={linkTo}>
          {" "}
          <div className="IconImg">{icon}</div> {/* 아이콘 렌더링 */}
          <div className="Text">{text}</div> {/* 텍스트 렌더링 */}
          <div className="count">{count}</div> {/* 카운트 렌더링 */}
        </StyledLink>{" "}
      </ItemBox>
    </>
  );
};

// 사용 예시
const ProfileButton = () => {
  return (
    <Container>
      <ProfileList
        icon={<FavoriteIcon />} // 아이콘 컴포넌트
        text="찜" // 텍스트
        count={10} // 카운트
        linkTo="/member/:id"
      />
      <ProfileList
        icon={<PersonIcon />} // 아이콘 컴포넌트
        text="Profile" // 텍스트
        count={10} // 카운트
        linkTo="/member/:id"
      />
      <ProfileList
        icon={<ChatBubbleIcon />} // 아이콘 컴포넌트
        text="Messages" // 텍스트
        count={10} // 카운트
        linkTo="/chat/:id"
      />
    </Container>
  );
};
export default ProfileButton;
