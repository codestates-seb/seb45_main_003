import { atom } from "recoil";
import { DropdownState } from "../components/header/DropdownState";

export const toSignup = atom<boolean>({
  key: "toSignup",
  default: true,
});

export interface User {
  name: string;
  email: string;
  // ... other fields
}

// 드롭다운 메뉴 상태관리 < 프로필 버튼 & 로그인/로그아웃 버튼 구분 >
export const dropDownState = atom({
  key: "dropDownState",
  default: DropdownState.None,
});

// 로그인 / 로그아웃 상태 헤더 관리

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

// export const dropDownState = atom<boolean>({
//   key: "dropDownState",
//   default: false,
// });
