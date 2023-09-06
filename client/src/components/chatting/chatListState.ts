// chatListState.ts
import { atom } from "recoil";

export type Chat = {
  chatRoomId: number;
  memberId: number;
  productId: number;
  deletedAt: string;

  chatRoom: {
    memberId: number;
    deletedAt: string;
  };
  message: string;
};

export const chatListState = atom<Chat[]>({
  key: "chatListState",
  default: [],
});
