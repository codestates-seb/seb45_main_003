import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { DropdownState } from "../components/header/DropdownState";

const { persistAtom } = recoilPersist();

export const toSignup = atom<boolean>({
  key: "toSignup",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
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

// 컨텐츠 100vh 유지를 위한 헤더,푸터 높이 저장
export const headerHeightState = atom<number>({
  key: "headerHeightState",
  default: 0,
});

export const footerHeightState = atom<number>({
  key: "footerHeightState",
  default: 0,
});
