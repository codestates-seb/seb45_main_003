import axios from "axios";
import React, { useState, useEffect } from "react";
// import ChatEnd from "./ChatEnd";
import styled from "styled-components"; // 수정된 부분
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getUserId } from "../../../../util/auth";

const Button = styled.button`
  display: flex;
  height: 3.5419rem;
  width: 7.125rem;
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
  line-height: 20px; /* 125% */
  .IconClose {
    color: #ffb300;
  }
  .Icon {
    color: #ffb300;
  }
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
    .Icon {
      color: #ffffff; // 텍스트의 호버 색상 (필요하다면)
    }
    .IconClose {
      color: #ffffff; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

interface ChatButtonsProps {
  roomId: string | number | null;
  initialStatus: string;
}

const ChatButtons: React.FC<ChatButtonsProps> = ({ roomId, initialStatus }) => {
  const [status, setStatus] = useState<string>(initialStatus); // 초기 상태는 initialStatus로 설정
  const memberId = getUserId();

  const handleTradeComplete = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/completed/${roomId}`,
      );
      setStatus(response.data.status);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDeleteComplete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/chat/${roomId}`, {
        params: { memberId: Number(memberId) },
      });
      setStatus(response.data.status);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  return (
    <div>
      {status === "ACTIVE" ? (
        <Button>
          <span onClick={handleTradeComplete}>거래 완료</span>
          <CheckCircleOutlineIcon className="Icon" />
        </Button>
      ) : (
        <Button>
          <span onClick={handleDeleteComplete}>채팅 종료</span>
          <CheckCircleOutlineIcon className="IconClose" />
        </Button>
      )}
    </div>
  );
};

export default ChatButtons;
