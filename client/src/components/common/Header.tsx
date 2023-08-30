import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { dropDownState } from "../../atoms/atoms";
import MenuItem from "../DropdownMenu/MeunItem";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useRef } from "react";

const StyledBorder = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

const StyledHeader = styled.header`
  .ButtonStyle {
    border: none;
    background: none;
  }
  .header-wrapper {
    padding: 1.25rem;
    width: 100%;
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
  }

  .sidebar {
    border-radius: 6px;
    /* border: 1px solid var(--cool-gray-20, #dde1e6); */
    background: #ffffff;
    margin: 0.375rem;
    max-width: 22rem;
    width: 25%;
    display: flex;
    justify-content: center;
    /* padding: 3rem 2.125rem 4.9375rem 2.1875rem; */

    position: absolute;
    top: 4.8125rem;
    right: 0;
  }
`;

const Header = (): JSX.Element => {
  const [dropdown, setDropdown] = useRecoilState(dropDownState);
  const sidebarRef = useRef<HTMLElement | null>(null); // HTML Element의 타입을 명시

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // 빈 의존성 배열

  return (
    <>
      <StyledBorder>
        <StyledHeader>
          <div className="header-wrapper">
            <Link to="/">
              <Logo />
            </Link>
            <div className="header-right">
              <Link to="/login">로그인 / 회원가입</Link>
              <button className="ButtonStyle" onClick={onClickHandler}>
                <MenuIcon />
              </button>
            </div>
            {dropdown && (
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

export default Header;
