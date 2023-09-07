// 새로 합친 코드

// import React, { useEffect, useRef } from "react";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { headerHeightState, userState } from "../../atoms/atoms";
// import HeaderLogin from "../header/HeaderLogin"; // 로그인 시 표시할 헤더
// import HeaderLogout from "../header/HeaderLogout"; // 로그아웃 시 표시할 헤더

// const MainHeader: React.FC = () => {
//   //헤더 높이 구하기
//   const headerRef = useRef<HTMLDivElement | null>(null);
//   const setHeaderHeight = useSetRecoilState(headerHeightState);

//   useEffect(() => {
//     if (headerRef.current !== null) {
//       setHeaderHeight(headerRef.current?.clientHeight);
//     }
//   }, [setHeaderHeight]);

//   const user = useRecoilValue(userState);

//   return <div ref={headerRef}>{user ? <HeaderLogin /> : <HeaderLogout />}</div>;
// };

// export default MainHeader;

// 기존 코드
// import { useRecoilValue } from "recoil";
// import { loginState } from "../../atoms/atoms";
// import HeaderLogin from "../header/HeaderLogin"; // 로그인 시 표시할 헤더
// import HeaderLogout from "../header/HeaderLogout"; // 로그아웃 시 표시할 헤더
// import { useValidateToken } from "../../hooks/useValidateToken";

// const MainHeader: React.FC = () => {
//   const user = useRecoilValue(loginState);
//   useValidateToken();

//   console.log(user);

//   return <>{user ? <HeaderLogin /> : <HeaderLogout />}</>;
// };

// export default MainHeader;

//수정 코드
import React, { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headerHeightState, loginState } from "../../atoms/atoms"; // loginState 추가
import HeaderLogin from "../header/HeaderLogin"; // 로그인 시 표시할 헤더
import HeaderLogout from "../header/HeaderLogout"; // 로그아웃 시 표시할 헤더

const MainHeader: React.FC = () => {
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

  return <div ref={headerRef}>{isLoggedIn ? <HeaderLogin /> : <HeaderLogout />}</div>;
};

export default MainHeader;
