import ChattingListFrom from "../components/chatting/chatinList/ChattingListFrom";
import { styled } from "styled-components";
import StartChatRoom from "../components/chatting/chatRoom/StartChatRoom";
import { currentChatRoomIdState } from "../components/chatting/recoil/chatState";
import { useRecoilValue } from "recoil";
import ChatRoom from "../components/chatting/chatRoom/ChatRoom";
import { useParams } from "react-router-dom";

// ... 다른 import 문

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2.5rem 0.9375rem;
  align-items: center;
  gap: 2.25rem;
  align-self: stretch;
  /* background-color: #3871a3; */
  text-align: center;

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const Chatting = (): JSX.Element => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옵니다.

  return (
    <>
      <Container>
        <ChattingListFrom />
        {chatRoomId ? (
          id === chatRoomId.toString() ? (
            <ChatRoom />
          ) : (
            <StartChatRoom />
          )
        ) : (
          <StartChatRoom />
        )}{" "}
      </Container>
    </>
  );
};

export default Chatting;
