import { atom } from "recoil";

// export const dropDownState = atom<boolean>({
//   key: "dropDownState",
//   default: false,
// });

export const toSignup = atom<boolean>({
  key: "toSignup",
  default: true,
});

export interface User {
  name: string;
  email: string;
  // ... other fields
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});

// atoms.ts
import { DropdownState } from "../components/header/DropdownState";

export const dropDownState = atom({
  key: "dropDownState",
  default: DropdownState.None,
});
