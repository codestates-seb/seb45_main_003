// chatState.ts
import { atom } from "recoil";

export type ChatList = {
  chatRoomId: number;
  memberId: number;
  productId: number;
  deletedAt: string;
  path: string | undefined;

  chatRoom: {
    memberId: number;
    name: string;
    deletedAt: string;
    path: string;
  };
  message: {
    messageId: number;
    content: string;
    createdAt: string;
  };
};

export const chatListState = atom<ChatList[]>({
  key: "chatListState",
  default: [],
});

export type Message = {
  messageId: number;
  senderId: number;
  content: string;
  createdAt: string;
};

export const chatRoomState = atom<ChatList[]>({
  key: "chatRoomState",
  default: [],
});

export const chatRoomIdState = atom({
  key: "chatRoomIdState",
  default: 0, // default value
});

export const currentChatRoomIdState = atom<number | null>({
  key: "currentChatRoomId",
  default: null,
});

export const webSocketConnectionState = atom({
  key: "webSocketConnection",
  default: false, // 초기값은 연결되지 않은 상태
});

export interface MessageItem {
  messageId: number | null;
  content: string;
  senderId: number | null;
  createdAt?: string;
}

export interface MessageData {
  messageList: MessageItem[];
  sequence: number;
}

export const chatState = atom<MessageItem[]>({
  key: "chatState",
  default: [],
});
