import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import * as Webstomp from "webstomp-client";
import { useRecoilValue } from "recoil";
import { currentChatRoomIdState } from "./chatState";

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

const ChatRoom = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const roomId = chatRoomId; // 실제 방 ID를 얻는 방법으로 대체하세요

  // 로컬 스토리지에서 Token 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("accessToken");
  console.log(userIdFromLocalStorage);

  // 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Token = userIdFromLocalStorage || null;

  useEffect(() => {
    if (chatRoomId !== null) {
      // 웹소켓 연결 및 구독
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          console.log("Connected to the WebSocket server");

          // 여기에서 토큰을 전송합니다.
          stompClient.send("/topic/auth", JSON.stringify({ token: Token }), {});
          console.log(stompClient.send);

          stompClient!.subscribe(`/topic/chat/${roomId}`, (message) => {
            console.log(`Received message: ${message.body}`);
            // 여기에 메시지를 받았을 때의 로직을 추가
          });
        },
        (error) => {
          console.log(`STOMP error: ${error}`);
        },
      );

      setClient(stompClient);
      // 정리 함수
      return () => {
        if (stompClient && stompClient.connected) {
          stompClient.disconnect(() => {
            console.log("Disconnected from the WebSocket server");
          });
        }
      };
    }
  }, [roomId]); // currentChatRoomId가 변경될 때마다 웹소켓을 다시 연결

  const handleSendMessage = (message: string) => {
    if (client && client.connected) {
      client.send(`/topic/chat/${roomId}`, JSON.stringify({ content: message }), {});
    }
  };

  return (
    <>
      <Container>
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <MessageBubble />
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
