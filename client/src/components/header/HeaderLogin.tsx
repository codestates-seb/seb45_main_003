import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { dropDownState } from "../../atoms/atoms";
import React, { useEffect, useRef } from "react";
import ProfileButton from "./LoginProfile";
import MenuItem from "../mainPage/dropdownMenu/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { DropdownState } from "./DropdownState";

// 최 상단 헤더 Bottom 라인
const StyledBorder = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

// 헤더 컨텐츠 영역
const StyledHeader = styled.header`
  .ButtonStyle {
    border: none;
    background: none;
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

// Header 컴포넌트 반환 영역
const HeaderLogin = (): JSX.Element => {
  const [dropdown, setDropdown] = useRecoilState(dropDownState);
  const sidebarRef = useRef<HTMLElement | null>(null);

  const showProfile = () => {
    setDropdown(DropdownState.Profile);
  };

  const showMenu = () => {
    setDropdown(DropdownState.Menu);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setDropdown(DropdownState.None); // 수정된 부분
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <StyledBorder>
        <StyledHeader>
          <div className="header-wrapper">
            <Link to="/">
              <Logo />
            </Link>
            <div className="header-right">
              <Link to="/login">로그아웃</Link>
              <button className="ButtonStyle" onClick={showProfile}>
                <PersonIcon />
              </button>
              <button className="ButtonStyle" onClick={showMenu}>
                <MenuIcon />
              </button>
            </div>
            {dropdown === DropdownState.Profile && (
              <aside className="sidebar" ref={sidebarRef}>
                <ProfileButton />
              </aside>
            )}
            {dropdown === DropdownState.Menu && (
              <aside className="sidebar" ref={sidebarRef}>
                <MenuItem />
              </aside>
            )}{" "}
          </div>
        </StyledHeader>
      </StyledBorder>
    </>
  );
};

export default HeaderLogin;
