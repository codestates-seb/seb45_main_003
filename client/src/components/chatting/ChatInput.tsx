import React, { useState, KeyboardEvent, ChangeEvent, FC } from "react";
import { styled } from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// import Button from "../../components/common/Button";

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
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
  }

  .input {
    flex-shrink: 0;
    width: 46.625rem;
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
`;

const Button = styled.button`
  display: inline-flex;
  padding: 0.9375rem 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;

  border-radius: 0.375rem;
  border: 0.0625rem solid #e0e0e0;
  background: #fff;

  color: #222;
  font-family: Pretendard Variable;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */

  &:hover {
    color: #ffffff; // 텍스트의 호버 색상 (필요하다면)
    background-color: #ffb300;
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
        거래 완료
        <CheckCircleOutlineIcon />
      </Button>
    </Container>
  );
};

export default ChatInput;
