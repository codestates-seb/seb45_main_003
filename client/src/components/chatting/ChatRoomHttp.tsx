import axios from "axios";
import { currentChatRoomIdState } from "./chatState";
import { useRecoilValue } from "recoil";
import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import FormatTimeOrDate from "./FormatTimeOrDate";

interface Message {
  messageId: number;
  senderId: number | null; // 수정된 부분
  content: string;
  createdAt: string;
}

const ChatRoomHttp: React.FC = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  // const { chatRoomId } = useParams<{ chatRoomId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  console.log(chatRoomId);

  // 로컬 스토리지에서 userId 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("Id");
  console.log(userIdFromLocalStorage);

  // 문자열을 숫자로 변환합니다. 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`);
        console.log(fetchMessages);

        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
    // const intervalId = setInterval(fetchMessages, 50000); // 5초마다 메시지를 새로 가져옵니다.
    const intervalId = setInterval(fetchMessages, 3600000); // 1시간마다 메시지를 새로 가져옵니다.

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌을 제거합니다.
    };
  }, [chatRoomId]); // chatRoomId를 의존성으로 추가

  return (
    <div>
      {messages.length === 0 ? (
        <div>{/* <NoMessages /> */}</div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.messageId}
            owner={message.senderId === Id ? "user" : "other"}
            message={message.content}
            time={FormatTimeOrDate(message.createdAt)}
          />
        ))
      )}
    </div>
  );
};

export default ChatRoomHttp;
