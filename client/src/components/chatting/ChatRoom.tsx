import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import * as Webstomp from "webstomp-client";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentChatRoomIdState, chatState } from "./chatState";
import MessageBubble from "./MessageBubble";
import ChatRoomHttp from "./ChatRoomHttp";
import FormatTimeOrDate from "./FormatTimeOrDate";
import { webSocketConnectionState } from "./chatState";
import moment from "moment";

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
interface MessageData {
  body: {
    content: string;
    senderId: number | null; // 수정된 부분
    createdAt?: string;
  }; // 필요한 다른 필드
}
// console.log(MessageBubble);

const ChatRoom = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const roomId = chatRoomId; // 실제 방 ID를 얻는 방법으로 대체하세요
  const [, setIsConnected] = useRecoilState(webSocketConnectionState);
  const [, setChatList] = useRecoilState(chatState);
  const currentTime = moment().format("YYYY년 MM월 DD일 a hh시 mm분");

  // 로컬 스토리지에서 userId 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("Id");
  // console.log(userIdFromLocalStorage);

  // 문자열을 숫자로 변환합니다. 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;

  useEffect(() => {
    // 이전 메시지를 초기화합니다.
    setMessages([]);

    if (roomId) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          // 소켓 연결 확인 로그
          console.log("Connected to the WebSocket server");
          setIsConnected(true); // 연결되면 상태를 true로 변경
          // ...

          // 채팅 구독 메세지를 화면에 띄어줌
          stompClient.subscribe(`/topic/chat/${roomId}`, (message) => {
            const messageData: MessageData = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setChatList((prevChatList) => [...prevChatList, messageData]); // 이 부분을 추가
          });
          // console.log(stompClient);
        },
        (error) => {
          console.error("STOMP protocol error:", error); // 에러 로깅
          setIsConnected(false); // 에러가 발생하면 상태를 false로 변경
        },
      );

      setClient(stompClient);

      // 소켓 닫기 확인 로그
      return () => {
        stompClient.disconnect(() => {
          console.log("Disconnected from the WebSocket server");
          setIsConnected(false); // 닫기가 발생하면 상태를 false로 변경
        });
      };
    }
  }, [roomId]);

  useEffect(() => {
    const element = document.querySelector(".chatBox");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  // InPut 내용을 소켓으로 Send
  const handleSendMessage = (message: string) => {
    console.log("handleSendMessage called with message:", message);
    if (client && client.connected) {
      client.send(`/app/chat/${roomId}`, JSON.stringify({ content: message, senderId: Id }), {});
      console.log("Message sent:", message);
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
              owner={message.body.senderId === Id ? "user" : "other"}
              message={message.body.content}
              time={FormatTimeOrDate(message.body.createdAt || null) || "Unknown time"}
            />
          ))}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
