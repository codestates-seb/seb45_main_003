// 채팅룸 컴포넌트
import axios from "axios";
import styled from "styled-components";
import { currentChatRoomIdState, MessageData } from "../recoil/chatState";
import { useRecoilValue } from "recoil";
import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import FormatTimeOrDate from "../hook/FormatTimeOrDate";
import { getUserId } from "../../../util/auth";
import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

const ChatRoomHttp: React.FC = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [messages, setMessages] = useState<MessageData>({ messageList: [], sequence: 0, status });
  const memberId = getUserId();
  const currentTime = moment(messages.createdAt).format("YYYY년 MM월 DD일 a hh시 mm분");

  // 로컬 스토리지에서 userId 값을 가져옵니다.
  const userIdFromLocalStorage = localStorage.getItem("Id");
  // console.log(userIdFromLocalStorage);

  // 문자열을 숫자로 변환합니다. 로컬 스토리지에 값이 없으면 null로 설정합니다.
  const Id = userIdFromLocalStorage ? parseInt(userIdFromLocalStorage, 10) : null;
  useEffect(() => {
    const element = document.querySelector(".chatBox");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get<MessageData>(
          `${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`,
          {
            params: {
              memberId: Number(memberId),
            },
          },
        );
        // console.log(response.data);
        if (response.data && Array.isArray(response.data.messageList)) {
          setMessages(response.data);
        } else {
          console.error("Received data is not an array");
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [chatRoomId, memberId]);
  // console.log(messages);

  return (
    <div>
      <Container>
        <div className="startText">
          {" 어서오세요! \n 채팅을 시작해 보세요 "}
          <div className="date"> {`- 현재 시간은 ${currentTime} 입니다. -`}</div>
        </div>

        {!messages || messages.messageList.length === 0 ? (
          <div>{/* <NoMessages /> */}</div>
        ) : (
          messages.messageList.map((messageItem) => (
            <MessageBubble
              key={messageItem.messageId}
              owner={messageItem.senderId === Id ? "user" : "other"}
              message={messageItem.content}
              time={FormatTimeOrDate(messageItem.createdAt || null)}
              isRead={messageItem.messageId! <= messages.sequence}
            />
          ))
        )}
      </Container>
    </div>
  );
};
export default ChatRoomHttp;
