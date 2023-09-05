// chatListState.ts
import { atom } from "recoil";

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  room: string;
}

export const chatListState = atom<Chat[]>({
  key: "chatListState",
  default: [],
});
