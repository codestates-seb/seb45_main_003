import { atom } from "recoil";

export const dropDownState = atom<boolean>({
  key: "dropDownState",
  default: false,
});
