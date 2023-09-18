import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../../atoms/atoms";
import { CATEGORY } from "../../constants/category";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { getUserId } from "../../util/auth";
import Notifications from "../notification/Notifictaion";

type MobileSidebarProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledMobileSidebar = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  background: ${COLOR.darkText};
  color: ${COLOR.lightText};
  box-sizing: border-box;

  .close_icon {
    margin: 1rem 0 0 auto;
    display: flex;

    path {
      fill: #fff;
    }
  }

  .user_status {
    margin: 1.5rem 0 1rem;
    padding: 0 0 1rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(66, 66, 66, 5);

    & > div {
      display: flex;
      flex-flow: row;
      align-items: center;
      gap: 0.25rem;
    }

    .icon {
      cursor: pointer;
      .notificationListContainer {
        left: unset;
        right: 0;
      }
    }
  }

  .category_title {
    color: #fff;
    font-size: ${FONT_SIZE.font_18};
    font-weight: 700;
    margin: 0 0 0.75rem;
  }

  ul {
    border-bottom: 1px solid rgba(66, 66, 66, 5);
    padding: 0 0 0.5rem 0;

    li {
      padding: 0.5rem 0;
    }
  }
`;

const MobileSidebar = ({ onClose }: MobileSidebarProps) => {
  const isLogin = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState);
  const userId = getUserId();

  const logout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLogin(false);
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <StyledMobileSidebar>
      <CloseIcon
        className="close_icon"
        onClick={() => {
          onClose(false);
        }}
      />
      <div className="user_status">
        <div>
          {isLogin ? (
            <>
              <PersonIcon />
              <Link to={`/member/${userId}`} onClick={handleClose}>
                프로필
              </Link>
              |
              <Link to={`/chat/${userId}`} onClick={handleClose}>
                채팅
              </Link>
              |
              <Link to={`/chat/${userId}`} onClick={() => logout()}>
                로그아웃
              </Link>
            </>
          ) : (
            <Link to="/login" onClick={handleClose}>
              로그인
            </Link>
          )}
        </div>
        {isLogin && <Notifications />}
      </div>
      <p className="category_title">Product Category</p>
      <ul>
        {Object.keys(CATEGORY).map((category) => {
          return (
            <li key={category}>
              <Link to={CATEGORY[category].path} onClick={handleClose}>
                {CATEGORY[category].value}
              </Link>
            </li>
          );
        })}
      </ul>
    </StyledMobileSidebar>
  );
};

export default MobileSidebar;
