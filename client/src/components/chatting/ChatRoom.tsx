import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import * as Webstomp from "webstomp-client";
import { useRecoilValue } from "recoil";
import { currentChatRoomIdState } from "./chatState";
import MessageBubble from "./MessageBubble";
import ChatRoomHttp from "./ChatRoomHttp";
import moment from "moment-timezone";

const formatTimeOrDate = (createdAt: string | null) => {
  if (!createdAt) {
    return "No message";
  }

  const currentTime = moment().tz("Asia/Seoul");
  const messageTime = moment(createdAt).tz("Asia/Seoul"); // 타임존 설정 추가
  const diffInHours = currentTime.diff(messageTime, "hours");

  if (diffInHours < 24) {
    return messageTime.format("A h:mm");
  } else {
    return messageTime.format("MM-DD");
  }
};

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
    flex-direction: column-reverse;

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  @media (max-width: 64rem) {
    width: 95%; // 상대적인 단위로 변경
  }
`;
interface MessageData {
  body: {
    content: string;
    senderId: number | null; // 수정된 부분
    createdAt?: string;
  }; // 필요한 다른 필드
}
console.log(MessageBubble);

const ChatRoom = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const roomId = chatRoomId; // 실제 방 ID를 얻는 방법으로 대체하세요

  // 로컬 스토리지에서 userId 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("Id");
  console.log(userIdFromLocalStorage);

  // 문자열을 숫자로 변환합니다. 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;

  useEffect(() => {
    if (roomId) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          // 소켓 연결 확인 로그
          console.log("Connected to the WebSocket server");

          // 채팅 구독 메세지를 화면에 띄어줌
          stompClient.subscribe(`/app/chat/${roomId}`, (message) => {
            const messageData: MessageData = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, messageData]);
          });
          console.log(stompClient);
        },
        (error) => {
          console.error("STOMP protocol error:", error); // 에러 로깅
          console.log(`STOMP error: ${error}`);
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
  }, [roomId, Id]);

  //topic/chat/${roomId} 으로 경로 지정하면 실시간 뜸 -> 메세지 안보내짐
  //메세지 보내는 경로 /app/chat/${roomId} -> 실시간 안뜸

  // InPut 내용을 소켓으로 Send
  const handleSendMessage = (message: string): void => {
    console.log("handleSendMessage called with message:", message);
    if (client && client.connected) {
      const createdAt: string = new Date().toISOString();
      client.send(
        `/app/chat/${roomId}`,
        JSON.stringify({ content: message, senderId: Id, createdAt }),
        {},
      );
      console.log("Message sent:", message);
      setMessages((prevMessages: MessageData[]) => [
        ...prevMessages,
        { body: { content: message, senderId: Id, createdAt } },
      ]);
    }
  };

  return (
    <>
      <Container>
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          {" "}
          <ChatRoomHttp />
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              owner={message.body.senderId === Id ? "user" : "other"}
              message={message.body.content}
              time={formatTimeOrDate(message.body.createdAt || null) || "Unknown time"}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
