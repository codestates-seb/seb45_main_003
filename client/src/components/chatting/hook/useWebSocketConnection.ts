import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";

interface MessageData {
  body: {
    content: string;
    senderId: number | null; // 수정된 부분
    createdAt?: string;
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

          stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const messageData: MessageData = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setChatList((prevChatList) => [...prevChatList, messageData]);
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
