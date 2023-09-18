import styled from "styled-components";
import { ReactComponent as StartChat } from "../../../assets/images/chatting/NoMessages.svg";

const Container = styled.div`
  display: flex;
  width: 69rem;
  height: 43.6875rem;
  padding: 1.5rem 1rem;

  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;
  /* border: 1px solid #e0e0e0; */
  /* background: #f7f7f7; */
  /* background-color: aqua; */

  .chatBox {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */

    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  @media (max-width: 64rem) {
    width: 95%; // 상대적인 단위로 변경
  }
`;

const StartChatRoom = () => {
  return (
    <>
      <Container>
        <StartChat />
      </Container>
    </>
  );
};

export default StartChatRoom;
