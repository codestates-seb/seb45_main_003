import axios from "axios";
import React, { useState, useEffect } from "react";
// import ChatEnd from "./ChatEnd";
import styled from "styled-components"; // 수정된 부분
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getUserId } from "../../../../util/auth";
import { useModal } from "../../../../hooks/useModal";
import { ReactComponent as Sun } from "../../../../assets/images/chatting/Sun.svg";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5625rem;
  width: 45.5625rem;
  height: 20.5625rem;
  flex-shrink: 0;
  border-radius: 6px;
  border: 0.0625rem solid #e0e0e0;
  background: #f7f7f7;
  .ModalText {
    color: #222;
    font-family: Pretendard Variable;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    flex-direction: row;
    .textColor {
      color: #ffb300;
    }
  }
  .ModalTextS {
    color: #bdbdbd;
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .ModalButton {
    display: flex;
    flex-direction: row;
    gap: 2.5rem;
    .ButtonModal {
      background-color: #ffb300;
      color: #fff;
      &:hover {
        color: #222;
        background-color: #ffb300;
      }
    }
  }
`;

const Button = styled.button`
  display: flex;
  height: 3.5419rem;
  width: 7.125rem;
  min-width: 7.125rem;
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
  const { isOpen, toggleModal } = useModal();

  const handleTradeComplete = async () => {
    toggleModal(); // 모달을 열고
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
      {isOpen && (
        <ModalContainer>
          <ModalContent>
            <Sun />
            <div className="ModalText">
              <div className="ModalText">
                거래를 <div className="textColor">&nbsp; 완료</div>하고 후기를 작성 하시겠습니까?
              </div>
            </div>
            <div className="ModalTextS">후기는 후기작성 페이지에서 재 작성 가능합니다.</div>
            <div className="ModalButton">
              <Button className="ButtonModal" onClick={toggleModal}>
                나중에 하기
              </Button>
              <Button className="ButtonModal" onClick={toggleModal}>
                확인
              </Button>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
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
