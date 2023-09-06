import React, { useState, KeyboardEvent, ChangeEvent, FC } from "react";
import styled from "styled-components"; // 수정된 부분
import SendIcon from "@mui/icons-material/Send";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import Button from "../../components/common/Button";

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  max-height: 3.75rem;
  .chat-input-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; /* 중앙 정렬 */
    background: #fff;
    width: fit-content;
    padding: 0.625rem 1rem;
    border-radius: 0.375rem;
    border: 0.0625rem solid #e0e0e0;
    background: #fff;

    width: calc(100% - 3rem);
  }

  .input {
    width: calc(100% - 3rem);
    max-width: 46.625rem;
    background: #fff;
    margin: 0 1rem;
    border: none;
    background: none;
    outline: none; /* 이 부분을 추가 */
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
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const Button = styled.button`
  width: calc(100% - 3rem);
  max-width: 7.125rem;
  display: inline-flex;
  /* padding: 0.9375rem 0.75rem; */
  justify-content: center;
  align-items: center;
  gap: 0.375rem;

  border-radius: 0.375rem;
  border: 0.0625rem solid #e0e0e0;
  background: #fff;

  color: #222;
  font-family: Pretendard Variable;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25rem; /* 125% */

  .text {
    display: inline; /* 기본적으로 텍스트를 보이게 설정 */
  }

  /* 버튼 너비가 200px 이하로 줄어들면 텍스트를 숨김 */
  @media (max-width: 6.25rem) {
    .text {
      display: none;
    }
  }

  &:hover {
    color: #ffffff; // 텍스트의 호버 색상 (필요하다면)
    background-color: #ffb300;
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;
interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState<string>("");

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
        {/* <Button type="button" $text="Send" onClick={() => handleSendMessage} $design="black" /> */}
        <button onClick={() => handleSendMessage} className="SendButton">
          <SendIcon />
        </button>
      </div>
      <Button>
        <span className="text">거래 완료</span> {/* 이 부분 수정 */}
        <CheckCircleOutlineIcon />
      </Button>
    </Container>
  );
};

export default ChatInput;
