import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";

interface MessageData {
  body: {
    content: string;
    senderId: number | null; // 수정된 부분
    createdAt?: string;
  }; // 필요한 다른 필드
}

const useStomp = (roomId: number | null) => {
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);

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

          // 채팅 구독 메세지를 화면에 띄어줌
          stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const messageData = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, messageData]);
          });
        },
        (error) => {
          console.error("STOMP protocol error:", error);
        },
      );

      setClient(stompClient);

      // 소켓 닫기 확인 로그
      return () => {
        stompClient.disconnect(() => {
          console.log("Disconnected from the WebSocket server");
        });
      };
    }
  }, [roomId]);

  return { client, messages };
};

export default useStomp;
