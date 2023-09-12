import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentChatRoomIdState, chatState, MessageItem } from "../recoil/chatState";
import MessageBubble from "./MessageBubble";
import ChatRoomHttp from "./ChatRoomHttp";
import FormatTimeOrDate from "../hook/FormatTimeOrDate";
import { webSocketConnectionState } from "../recoil/chatState";
import moment from "moment";
import { useSearchParams } from "react-router-dom";
import { useWebSocketConnection } from "../hook/useWebSocketConnection"; // 커스텀 훅 import
import { useChatList } from "../hook/useChatList"; // Import custom hook

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

  .startText {
    color: #494949;
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0.9375rem;
    .date {
      padding: 0.9375rem;
      font-size: 1rem;
    }
  }

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
// console.log(MessageBubble);

const ChatRoom = () => {
  const { refetch } = useChatList();
  const [searchParams] = useSearchParams();
  const chatRoomIdFromState = useRecoilValue(currentChatRoomIdState);
  const roomId = searchParams.get("roomId") || chatRoomIdFromState;
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [, setIsConnected] = useRecoilState(webSocketConnectionState);
  const [, setChatList] = useRecoilState(chatState);
  const currentTime = moment().format("YYYY년 MM월 DD일 a hh시 mm분");
  const userIdFromLocalStorage = localStorage.getItem("Id");
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;

  const client = useWebSocketConnection(roomId, { setMessages, setChatList, setIsConnected }); // 커스텀 훅 사용

  useEffect(() => {
    const element = document.querySelector(".chatBox");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (client && client.connected) {
      client.send(`/app/chat/${roomId}`, JSON.stringify({ content: message, senderId: Id }), {});
      // Refetch the chat list
      refetch();
    }
  };
  return (
    <>
      <Container>
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          <div className="startText">
            {" 어서오세요! \n 채팅을 시작해 보세요 "}
            <div className="date"> {`- 현재 시간은 ${currentTime} 입니다. -`}</div>
          </div>
          <ChatRoomHttp />
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              owner={message.senderId === Id ? "user" : "other"}
              message={message.content}
              time={FormatTimeOrDate(message.createdAt || null) || "Unknown time"}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
