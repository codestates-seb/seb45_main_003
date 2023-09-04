import { atom } from "recoil";

export const dropDownState = atom<boolean>({
  key: "dropDownState",
  default: false,
});

export const toSignup = atom<boolean>({
  key: "toSignup",
  default: true,
});

export const profileTabState = atom<string>({
  key: "profileTabState",
  default: "profile",
});
