import axios from "axios";
import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";
import { getUserId } from "../../../util/auth";
import { MessageItem } from "../recoil/chatState";

// 커스텀 훅의 타입 정의
interface UseWebSocketConnectionProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageItem[]>>;
  setChatList: React.Dispatch<React.SetStateAction<MessageItem[]>>;
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

      // 헤더에 chatRoomId와 memberId를 포함
      const headers = {
        chatRoomId: String(roomId),
        memberId: String(memberId),
      };

      stompClient.connect(
        headers,
        () => {
          console.log("Connected with headers:", headers);
          console.log("Connected to the WebSocket server");
          setIsConnected(true);

          stompClient.subscribe(`/topic/chat/${roomId}`, async (message) => {
            const messageData = JSON.parse(message.body).body;

            // currentParticipants 값을 체크
            const currentParticipants = messageData.currentParticipants;

            // 모든 메시지를 '읽음'으로 처리하는 경우
            if (currentParticipants === 2) {
              setMessages((prevMessages) => {
                const newMessages = prevMessages.map((msg) => ({
                  ...msg,
                  isRead: true, // 모든 메시지를 '읽음'으로 처리
                }));
                return newMessages;
              });
            }

            // 읽음/안읽음 상태 설정
            let isRead = false; // 안읽음 처리를 기본값으로 설정
            if (currentParticipants === 2) {
              isRead = true; // 읽음 처리
            }

            setMessages((prevMessages) => {
              const newMessages = [...prevMessages, { ...messageData, isRead }];
              console.log("New Messages:", newMessages);
              return newMessages;
            });

            // 채팅 목록을 업데이트합니다.
            setChatList((prevChatList) => [...prevChatList, messageData]);

            // 백엔드 서버에 HTTP POST 요청을 보냅니다.
            const response = await axios.post(
              `${process.env.REACT_APP_API_URL}/chat/sequence/${roomId}`,
              {
                memberId: Number(memberId),
                messageId: messageData.messageId,
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
