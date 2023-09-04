// useUser.ts
import { useSetRecoilState } from "recoil";
import { userState, User } from "../atoms/atoms";

export function useUserActions() {
  const setUser = useSetRecoilState(userState);

  const login = (userData: User) => {
    // 로그인 로직 (API 호출 등)
    setUser(userData);
  };

  const logout = () => {
    // 로그아웃 로직
    setUser(null);
  };

  return { login, logout };
}
