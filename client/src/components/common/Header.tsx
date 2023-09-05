// import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
import HeaderLogin from "../header/HeaderLogin"; // 로그인 시 표시할 헤더
import HeaderLogout from "../header/HeaderLogout"; // 로그아웃 시 표시할 헤더
import { useValidateToken } from "../../hooks/useValidateToken";

const MainHeader: React.FC = () => {
  const user = useRecoilValue(loginState);
  useValidateToken();

  console.log(user);

  return <>{user ? <HeaderLogin /> : <HeaderLogout />}</>;
};

export default MainHeader;
