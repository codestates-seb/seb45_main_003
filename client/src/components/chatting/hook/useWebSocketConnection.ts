import axios from "axios";
import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";
import { getUserId } from "../../../util/auth";

interface MessageData {
  body: {
    content: string;
    senderId: number | null;
    createdAt?: string;
    messageId?: number | null;
    memberId?: number | null;
  }; // 필요한 다른 필드
}

// 커스텀 훅의 타입 정의
interface UseWebSocketConnectionProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageData[]>>;
  setChatList: React.Dispatch<React.SetStateAction<MessageData[]>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useWebSocketConnection = (
  roomId: string | number | null,
  { setMessages, setChatList, setIsConnected }: UseWebSocketConnectionProps,
) => {
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const memberId = getUserId();

  useEffect(() => {
    // 이전 메시지를 초기화합니다.
    setMessages([]);

    if (roomId) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          console.log("Connected to the WebSocket server");
          setIsConnected(true);

          stompClient.subscribe(`/topic/chat/${roomId}`, async (message) => {
            const messageData: MessageData = JSON.parse(message.body);

            // 이전 메시지를 저장합니다.
            setMessages((prevMessages) => [...prevMessages, messageData]);

            // 채팅 목록을 업데이트합니다.
            setChatList((prevChatList) => [...prevChatList, messageData]);
            console.log(Number(memberId));
            console.log(messageData.body.messageId);

            // 백엔드 서버에 HTTP POST 요청을 보냅니다.
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/chat/sequence/${roomId}`,
              {
                memberId: Number(memberId),
                messageId: messageData.body.messageId,
              },
            );
            if (axios.isAxiosError(response)) {
              console.log("Failed to update message read status.", response);
            } else {
              console.log("Message read status updated successfully.", response);
            }
          });
        },
        (error) => {
          console.error("STOMP protocol error:", error);
          setIsConnected(false);
        },
      );

      setClient(stompClient);

      return () => {
        stompClient.disconnect(() => {
          console.log("Disconnected from the WebSocket server");
          setIsConnected(false);
        });
      };
    }
  }, [roomId, setMessages, setChatList, setIsConnected]);

  return client;
};
