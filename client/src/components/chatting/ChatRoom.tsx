import { styled } from "styled-components";
import ChatInput from "./ChatInput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
  height: 43.6875rem;
  padding: 1.5rem 1rem;

  justify-content: end;

  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: #f7f7f7;
  background-color: aqua;

  /* .inputBar {
    align-items: center;
    background-color: aqua;
    width: calc(100% - 3rem);
  } */
`;

const ChatRoom = (): JSX.Element => {
  // 사용자가 메시지를 보내면 호출되는 함수
  const handleSendMessage = (message: string) => {
    console.log("User sent a message:", message);
    // 이곳에서 실제로 메시지를 보내는 로직을 구현할 수 있습니다.
  };

  return (
    <>
      <Container>
        <div className="InputBar">
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </Container>
    </>
  );
};
export default ChatRoom;
