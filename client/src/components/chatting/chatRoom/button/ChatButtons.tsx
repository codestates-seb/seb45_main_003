import axios from "axios";
import React, { useState, useEffect } from "react";
// import ChatEnd from "./ChatEnd";
import styled from "styled-components"; // 수정된 부분
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getAuthToken, getUserId } from "../../../../util/auth";
import { useModal } from "../../../../hooks/useModal";
import { ReactComponent as Sun } from "../../../../assets/images/chatting/Sun.svg";
import { ReactComponent as CloseButton } from "../../../../assets/images/chatting/Close.svg";
import { useChatList } from "../../hook/useChatList";
import { useNavigate, useLocation } from "react-router-dom";

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
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5625rem;
  width: 45.5625rem;
  height: 340px;
  flex-shrink: 0;
  border-radius: 0.375rem;
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
      margin-bottom: 1.4375rem;
      background-color: #ffb300;
      color: #fff;
      &:hover {
        color: #222;
        background-color: #ffb300;
      }
    }
  }
  .ButtonModalEnd {
    color: #fff;
    background-color: #f44336;

    &:hover {
      color: #222;
      background-color: #f44336;
    }
  }
  .CloseButton {
    border: none;
    background: none;
  }
  .Close {
    margin-left: 43.1875rem;
  }
  .Sun {
    width: 5.125rem;
    height: 5.125rem;
  }
  .ModalTitle {
    color: #222;
    font-family: Pretendard Variable;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    display: flex;
    flex-direction: row;
    margin-bottom: 60px;
    .textColor {
      color: #ffb300;
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
  const Token = getAuthToken();
  const { isOpen, toggleModal } = useModal();
  const { refetch } = useChatList(); // refetch 함수를 가져옴
  const [isAnotherModalOpen, setAnotherModalOpen] = useState(false);
  const [isChatEndModalOpen, setChatEndModalOpen] = useState(false);
  const [isTradeCancelledModalOpen, setTradeCancelledModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");

  const Id = getUserId();

  const closeModal = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/completed/${roomId}`,
      );
      setStatus(response.data.status);
      setAnotherModalOpen(false); // 다른 모달을 닫습니다.
      navigate(`/review/${Id}?productId=${productId}`); // 페이지 이동
    } catch (error) {
      console.error("An error occurred:", error);
      refetch(); // 데이터를 리패치
    }
  };

  const ModalButton = async () => {
    toggleModal(); // 기존 모달을 닫습니다.
    setAnotherModalOpen(false); // AnotherModal도 닫습니다.
    if (isOpen) {
      // 모달이 열려있다면 닫힐 것이므로
      refetch(); // 데이터를 리패치
    }
  };

  const ModalButton2 = async () => {
    setAnotherModalOpen(false); // AnotherModal도 닫습니다.
    if (isOpen) {
      // 모달이 열려있다면 닫힐 것이므로
      refetch(); // 데이터를 리패치
    }
  };

  const handleTradeComplete = async () => {
    try {
      toggleModal(); // 기존에 열려있던 모달을 닫습니다.

      // 다른 모달을 띄우기 위해 상태를 변경합니다.
      setAnotherModalOpen(true);
    } catch (error) {
      console.error("An error occurred:", error);
      refetch(); // 데이터를 리패치
    }
  };

  const handleDeleteComplete = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/chat/${roomId}`, {
        headers: {
          Authorization: Token,
        },
      });
      console.log("Successful response:", response); // 성공한 응답을 콘솔에 출력
      setStatus(response.data.status);
      setChatEndModalOpen(true); // 채팅 종료 모달을 열기
    } catch (error) {
      console.error("An error occurred:", error);
      refetch(); // 데이터를 리패치
    }
  };

  const closeAnotherModal = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/completed/${roomId}`,
      );
      setStatus(response.data.status);
      setAnotherModalOpen(false); // 다른 모달을 닫습니다.
    } catch (error) {
      console.error("An error occurred:", error);
      refetch(); // 데이터를 리패치
    }
  };

  //거래 파기 모달
  const handleTradeCancel = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/chat/completed/${roomId}`,
      );
      setStatus(response.data.status);
      ModalButton();
      setTradeCancelledModalOpen(true); // 거래 파기 모달을 엽니다.
    } catch (error) {
      console.error("An error occurred:", error);
      refetch(); // 데이터를 리패치
    }
  };

  //거래 파기 모달
  const TradeCancelledModal = (
    <ModalContainer>
      <ModalContent>
        <Sun className="Sun" />

        <div className="ModalText">거래가 파기 되었습니다.</div>
        <Button
          className="ButtonModal"
          onClick={() => {
            setTradeCancelledModalOpen(false); // 모달을 닫습니다.
          }}
        >
          확인
        </Button>
      </ModalContent>
    </ModalContainer>
  );

  // 거래 완료 모달
  const AnotherModal = (
    <ModalContainer>
      <ModalContent>
        <button className="CloseButton" onClick={ModalButton2}>
          <CloseButton className="Close" />
        </button>
        <Sun className="Sun" />
        <div className="ModalText">
          <div className="ModalText">
            거래를 <div className="textColor">&nbsp; 완료</div>하고 후기를 작성 하시겠습니까?
          </div>
        </div>
        <div className="ModalTextS">후기는 후기작성 페이지에서 재 작성 가능합니다.</div>
        <div className="ModalButton">
          <Button className="ButtonModal" onClick={closeAnotherModal}>
            나중에 하기
          </Button>
          <Button className="ButtonModal" onClick={closeModal}>
            확인
          </Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );

  //채팅 종료 모달
  const ChatEndModal = (
    <ModalContainer>
      <ModalContent>
        <Sun className="Sun" />
        <div className="ModalTitle">채팅이 종료되었습니다.</div>
        <div className="ModalButton">
          <Button
            className="ButtonModal"
            onClick={() => {
              setChatEndModalOpen(false); // 모달을 닫습니다.
              window.location.href = "/"; // 메인 페이지로 이동
            }}
          >
            확인
          </Button>
          <Button
            className="ButtonModal"
            onClick={() => {
              setChatEndModalOpen(false); // 모달을 닫습니다.
              window.location.href = "/chat/id"; // 메인 페이지로 이동
            }}
          >
            채팅 페이지로
          </Button>
        </div>
      </ModalContent>
    </ModalContainer>
  );

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  return (
    <div>
      {isOpen && (
        <ModalContainer>
          <ModalContent>
            <button className="CloseButton" onClick={toggleModal}>
              <CloseButton className="Close" />
            </button>
            <Sun className="Sun" />
            <div className="ModalText">
              <div className="ModalText">
                거래가 <div className="textColor">&nbsp; 완료</div>되었습니까?
              </div>
            </div>
            <div className="ModalTextS">거래 현황을 선택해 주십시오.</div>
            <div className="ModalButton">
              <Button className="ButtonModalEnd" onClick={handleTradeCancel}>
                거래 파기
              </Button>
              <Button className="ButtonModal" onClick={handleTradeComplete}>
                거래 완료
              </Button>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
      {isTradeCancelledModalOpen && TradeCancelledModal}
      {isAnotherModalOpen && AnotherModal}
      {status === "ACTIVE" ? (
        <Button onClick={ModalButton}>
          <span>거래 종료</span>
          <CheckCircleOutlineIcon className="Icon" />
        </Button>
      ) : (
        <Button onClick={handleDeleteComplete}>
          <span>채팅 종료</span>
          <CheckCircleOutlineIcon className="IconClose" />
        </Button>
      )}
      {isChatEndModalOpen && ChatEndModal}
    </div>
  );
};

export default ChatButtons;
