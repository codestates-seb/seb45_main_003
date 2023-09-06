import { styled } from "styled-components";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; // 상대적인 단위로 변경
  height: 40.625rem;
  padding: 1.5rem 1rem;

  justify-content: end;

  border-radius: 0.375rem;
  border: 1px solid #e0e0e0;
  background: #f7f7f7;
  background-color: aqua;

  .chatBox {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
  }
  @media (max-width: 64rem) {
    width: 95%; // 상대적인 단위로 변경
  }
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
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          <MessageBubble owner="user" message="안녕하세요!" time="12:00 PM" />
          <MessageBubble owner="other" message="안녕하세요! 만나서 반가워요." time="12:01 PM" />
          <MessageBubble owner="user" message="어떻게 지내세요?" time="12:02 PM" />
          <MessageBubble owner="user" message="안녕하세요!" time="12:00 PM" />
          <MessageBubble owner="other" message="안녕하세요! 만나서 반가워요." time="12:01 PM" />
          <MessageBubble owner="user" message="어떻게 지내세요?" time="12:02 PM" />
          <MessageBubble owner="user" message="안녕하세요!" time="12:00 PM" />
          <MessageBubble owner="other" message="안녕하세요! 만나서 반가워요." time="12:01 PM" />
          <MessageBubble owner="user" message="어떻게 지내세요?" time="12:02 PM" />
          <MessageBubble owner="user" message="어떻게 지내세요?" time="12:02 PM" />
          <MessageBubble owner="user" message="안녕하세요!" time="12:00 PM" />
          <MessageBubble owner="other" message="안녕하세요! 만나서 반가워요." time="12:01 PM" />
          <MessageBubble owner="user" message="어떻게 지내세요?" time="12:02 PM" />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};
export default ChatRoom;
