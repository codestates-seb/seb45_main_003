// useUser.ts
import { useSetRecoilState } from "recoil";
import { loginState, User } from "../atoms/atoms";

export function useUserActions() {
  const setLogin = useSetRecoilState(loginState);

  const login = (userData: User) => {
    // 로그인 로직 (API 호출 등)
    setLogin(true); // 로그인 상태를 true로 설정
    console.log(userData.name, userData.email);
  };

  const logout = () => {
    // 로그아웃 로직 (API 호출, 토큰 제거 등)
    setLogin(false); // 로그아웃 상태를 false로 설정
  };

  return { login, logout };
}
