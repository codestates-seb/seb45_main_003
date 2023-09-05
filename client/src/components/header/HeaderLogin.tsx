import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { dropDownState } from "../../atoms/atoms"; // loginState 추가
import React, { useEffect, useRef } from "react";
import ProfileButton from "./LoginProfile";
import MenuItem from "../mainPage/dropdownMenu/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { DropdownState } from "./DropdownState";
// import axios from "axios";

// 최 상단 헤더의 하단 경계선 스타일
const StyledBorder = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

// 헤더의 주요 스타일
const StyledHeader = styled.header`
  .ButtonStyle {
    border: none;
    background: none;
    &:hover {
      /* background-color: #ffb300; // 원하는 호버 색상 */
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  .header-wrapper {
    width: calc(100% - 3rem);
    padding: 1.25rem;
    max-width: 90rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background: gray; */
    position: relative;
  }

  .header-right {
    display: flex;
    gap: 2.25rem;
    justify-content: center;
    align-items: center;
  }

  // 최 상단으로 배치 z-index: 2;
  .sidebar {
    z-index: 2;
    border-radius: 6px;
    /* border: 1px solid var(--cool-gray-20, #dde1e6); */
    background: #ffffff;
    margin: 0.375rem;
    max-width: 22rem;
    width: 25%;
    display: flex;
    justify-content: center;

    position: absolute;
    top: 4.8125rem;
    right: 0;
  }

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

// 로그인 상태의 헤더 컴포넌트
const HeaderLogin = (): JSX.Element => {
  // 드롭다운 상태를 Recoil로 관리
  const [dropdown, setDropdown] = useRecoilState(dropDownState);

  // 로그인 상태를 Recoil로 관리
  // const setLogin = useSetRecoilState(loginState);

  // 드롭다운을 닫기 위한 ref
  const sidebarRef = useRef<HTMLElement | null>(null);

  // 프로필 드롭다운을 보여주는 함수
  const showProfile = () => {
    setDropdown(DropdownState.Profile);
  };

  // 메뉴 드롭다운을 보여주는 함수
  const showMenu = () => {
    setDropdown(DropdownState.Menu);
  };

  // 드롭다운 외부를 클릭했을 때 드롭다운을 닫는 함수
  const handleOutsideClick = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setDropdown(DropdownState.None); // 수정된 부분
    }
  };

  // 로그아웃 핸들러
  // const handleLogout = async () => {
  //   try {
  //     // 서버에 로그아웃 요청을 보냅니다.
  //     // await axios.delete(`${process.env.REACT_APP_API_URL}/members/login`);
  //     // `${process.env.REACT_APP_API_URL}/members/login`;
  //     // Recoil 상태 업데이트
  //     setLogin(false);

  //     // 로컬 스토리지나 쿠키에서 인증 정보를 제거
  //     // localStorage.removeItem('token');
  //   } catch (error) {
  //     // 로그아웃 실패 처리
  //     console.error("Logout failed:", error);
  //   }
  // };

  // 외부 클릭 이벤트 리스너를 추가/제거
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <StyledBorder>
        {/* 하단 경계선 */}
        <StyledHeader>
          <div className="header-wrapper">
            {/* 로고 */}
            <Link to="/">
              <Logo />
            </Link>
            <div className="header-right">
              {/* 로그아웃 버튼 */}
              {/* <button onClick={handleLogout}>로그아웃</button> */}
              <button className="ButtonStyle" onClick={showProfile}></button>
              {/* 프로필 드롭다운 버튼 */}
              <button className="ButtonStyle" onClick={showProfile}>
                <PersonIcon />
              </button>

              {/* 메뉴 드롭다운 버튼 */}
              <button className="ButtonStyle" onClick={showMenu}>
                <MenuIcon />
              </button>
            </div>
            {/* 프로필 드롭다운 */}
            {dropdown === DropdownState.Profile && (
              <aside className="sidebar" ref={sidebarRef}>
                <ProfileButton />
              </aside>
            )}
            {/* 메뉴 드롭다운 */}
            {dropdown === DropdownState.Menu && (
              <aside className="sidebar" ref={sidebarRef}>
                <MenuItem />
              </aside>
            )}
          </div>
        </StyledHeader>
      </StyledBorder>
    </>
  );
};

export default HeaderLogin;
