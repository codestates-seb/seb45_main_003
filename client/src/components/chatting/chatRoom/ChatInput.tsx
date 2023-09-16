import React, { useState, KeyboardEvent, ChangeEvent, FC, useEffect } from "react";
import styled from "styled-components"; // 수정된 부분
import SendIcon from "@mui/icons-material/Send";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { COLOR } from "../../../constants/color";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatState, currentChatRoomIdState, MessageItem, MessageData } from "../recoil/chatState";
import ChatButtons from "./button/ChatButtons";
import axios from "axios";
import { getUserId } from "../../../util/auth";

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  max-height: 3.75rem;
  padding: 0 1.875rem;

  .chat-input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center; /* 중앙 정렬 */
    background: #fff;
    width: fit-content;
    padding: 0.625rem 1rem;
    border-radius: 0.375rem;
    border: 0.0625rem solid #e0e0e0;
    background: #fff;

    width: calc(100% - 3rem);

    &:hover,
    &:focus {
      border: 1px solid ${COLOR.primary};
      outline: 1px solid ${COLOR.primary};
    }
  }

  .input {
    width: calc(100% - 3rem);
    max-width: 46.625rem;
    background: #fff;
    margin: 0 1rem;
    border: none;
    background: none;
    outline: none; /* 이 부분을 추가 */

    &:hover,
    &:focus {
      border: none;
      outline: none;
    }

    .this-page .input:focus {
      outline: none;
    }
  }
  .AddButton,
  .SendButton {
    border: none;
    background: none;
    padding: 0;
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  /* @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  } */
`;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [initialStatus, setInitialStatus] = useState("ACTIVE"); // 초기 상태 설정
  const [message, setMessage] = useState<string>("");
  const [, setChatList] = useRecoilState<MessageItem[]>(chatState);
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const memberId = getUserId();

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
        if (response.data && response.data.status) {
          setInitialStatus(response.data.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchMessages();
  }, [chatRoomId, memberId]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleSendClick = () => {
    if (message.trim() === "") return;

    // 실제 메시지를 보내는 로직
    onSendMessage(message);

    // 새로운 메시지를 chatList에 추가
    const newMessage: MessageItem = {
      content: message,
      senderId: null, // 여기에 실제 사용자 ID를 넣을 수 있습니다.
      createdAt: new Date().toISOString(),
      messageId: null, // 이 값도 실제 메시지 ID로 변경할 수 있습니다.
    };
    setChatList((prevChatList) => [...prevChatList, newMessage]);

    // 입력 필드 초기화
    setMessage("");
  };

  return (
    <Container>
      <div className="chat-input-container">
        <button className="AddButton">
          <AddToPhotosIcon />
        </button>

        <input
          className="input"
          type="text"
          placeholder="Hello...."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendClick} className="SendButton">
          <SendIcon />
        </button>
      </div>
      <ChatButtons roomId={chatRoomId} initialStatus={initialStatus} />
    </Container>
  );
};

export default ChatInput;
