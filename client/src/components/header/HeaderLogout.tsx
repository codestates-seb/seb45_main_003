import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { dropDownState, toSignup } from "../../atoms/atoms";
import MenuItem from "../mainPage/dropdownMenu/MenuItem";
import { DropdownState } from "./DropdownState";

// 헤더 하단으 경계 스타일
const StyledBorder = styled.div`
  border-bottom: 1px solid #e0e0e0;
`;

// 헤더의 주 스타일
const StyledHeader = styled.header`
  .ButtonStyle {
    border: none;
    background: none;
  }
  .header-wrapper {
    width: calc(100% - 3rem);
    padding: 1.25rem 0;
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
    margin: 0.375rem;
    max-width: 22rem;
    width: 25%;
    display: flex;
    justify-content: center;

    position: absolute;
    top: 4.8125rem;
    right: 0;
  }
`;

// 로그아웃 상태의 헤더 컴포넌트
const HeaderLogout = (): JSX.Element => {
  // Recoil을 사용하여 드롭다운의 상태를 관리
  const [dropdown, setDropdown] = useRecoilState(dropDownState);
  // 드롭다운 외부 클릭을 감지하기 위한 ref
  const sidebarRef = useRef<HTMLElement | null>(null); // HTML Element의 타입을 명시

  // 드롭다운 토글 핸들러
  const onClickHandler = () => {
    setDropdown((prevState) =>
      prevState === DropdownState.None ? DropdownState.Profile : DropdownState.None,
    );
  };

  // 외부 클릭 이벤트를 처리하여 드롭다운을 닫는 로직
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setDropdown(DropdownState.None); // 수정된 부분
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    // 클린업: 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []); // 빈 의존성 배열
  const setIsSignup = useSetRecoilState(toSignup);
  return (
    <>
      <StyledBorder>
        <StyledHeader>
          <div className="header-wrapper">
            {/* 로고 */}
            <Link to="/">
              <Logo />
            </Link>
            <div className="header-right">
              {/* 로그인/회원가입 링크와 메뉴 아이콘 */}
              {/* <Link to="/login">로그인 / 회원가입</Link> */}
              <Link to="/login" onClick={() => setIsSignup(true)}>
                로그인
              </Link>
              <Link to="/login" onClick={() => setIsSignup(false)}>
                회원가입
              </Link>
              <button className="ButtonStyle" onClick={onClickHandler}>
                <MenuIcon />
              </button>
            </div>
            {/* 드롭다운 메뉴 */}
            {dropdown ? (
              <aside className="sidebar" ref={sidebarRef}>
                <MenuItem />
              </aside>
            ) : null}
          </div>
        </StyledHeader>
      </StyledBorder>
    </>
  );
};

export default HeaderLogout;
