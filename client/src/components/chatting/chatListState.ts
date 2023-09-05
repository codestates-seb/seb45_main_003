// chatListState.ts
import { atom } from "recoil";

export type Chat = {
  chatParticipantId: number;
  memberId: number;
  chatRoom: {
    chatRoomId: number;
    productId: number;
    status: string;
    createdAt: string;
  };
};

export const chatListState = atom<Chat[]>({
  key: "chatListState",
  default: [],
});
