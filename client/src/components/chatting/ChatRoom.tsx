import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import * as Webstomp from "webstomp-client";
import { useRecoilValue } from "recoil";
import { currentChatRoomIdState } from "./chatState";
import MessageBubble from "./MessageBubble";
import ChetRoomHttp from "./ChetRoomHttp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; // 상대적인 단위로 변경
  height: 43.6875rem;
  padding: 1.5rem 1rem;

  justify-content: end;

  border-radius: 0.375rem;
  border: 1px solid #e0e0e0;
  background: #f7f7f7;
  /* background-color: aqua; */

  .chatBox {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */

    &::-webkit-scrollbar {
      width: 0px;
    }
    /* &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: #ccc;
    } */
  }
  @media (max-width: 64rem) {
    width: 95%; // 상대적인 단위로 변경
  }
`;
interface MessageData {
  content: string;
  sender?: string;
  recipient?: string;
  // 필요한 다른 필드
}

const ChatRoom = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const roomId = chatRoomId; // 실제 방 ID를 얻는 방법으로 대체하세요

  // 로컬 스토리지에서 Token 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("accessToken");
  console.log(userIdFromLocalStorage);

  // 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Token = userIdFromLocalStorage || null;

  useEffect(() => {
    if (roomId) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          console.log("Connected to the WebSocket server");

          stompClient.send("/topic/auth", JSON.stringify({ token: Token }), {});

          stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const messageData: MessageData = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, messageData]);
          });
        },
        (error) => {
          console.log(`STOMP error: ${error}`);
        },
      );

      setClient(stompClient);

      return () => {
        stompClient.disconnect(() => {
          console.log("Disconnected from the WebSocket server");
        });
      };
    }
  }, [roomId, Token]);

  const handleSendMessage = (message: string) => {
    if (client && client.connected) {
      client.send(`/topic/chat/${roomId}`, JSON.stringify({ content: message }), {});
    }
  };

  return (
    <>
      <Container>
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          <ChetRoomHttp />
        </div>
        {messages.map((message, index) => (
          <MessageBubble
            key={index}
            owner={message.sender === Token ? "user" : "other"}
            message={message.content}
            time={message.recipient || "Unknown time"} // 'recipient' 필드가 시간을 나타내는 것이 맞다면 이렇게 사용하세요
          />
        ))}
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
