import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { headerHeightState, loginState } from "../../atoms/atoms"; // loginState 추가
import { useMobile } from "../../hooks/useMobile";
import CategorySelect from "../header/CategorySelect";
import HeaderLogin from "../header/HeaderLogin"; // 로그인 시 표시할 헤더
import HeaderLogout from "../header/HeaderLogout"; // 로그아웃 시 표시할 헤더
import MobileHeader from "../header/MobileHeader";

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 9999;
  background: #fff;
`;

const MainHeader: React.FC = () => {
  const { isMobile } = useMobile();
  // 헤더 높이 구하기
  const headerRef = useRef<HTMLDivElement | null>(null);
  const setHeaderHeight = useSetRecoilState(headerHeightState);

  useEffect(() => {
    if (headerRef.current !== null) {
      setHeaderHeight(headerRef.current?.clientHeight);
    }
  }, [setHeaderHeight]);

  // 로그인 상태 확인
  const isLoggedIn = useRecoilValue(loginState); // loginState 사용

  return (
    <StyledHeader ref={headerRef}>
      {isMobile ? <MobileHeader /> : isLoggedIn ? <HeaderLogin /> : <HeaderLogout />}
      <CategorySelect />
    </StyledHeader>
  );
};

export default MainHeader;
