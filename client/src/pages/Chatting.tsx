// import ChattingList from "../components/chatting/ChattingList";
import Img1 from "../assets/images/chatting/ProfilrImg.svg";
// import ChatRoom from "../components/chatting/ChatRoom";
import ChattingListFrom from "../components/chatting/ChattingListFrom";
import { styled } from "styled-components";
import StartChatRoom from "../components/chatting/StartChatRoom";
import { currentChatRoomIdState } from "../components/chatting/chatState";
import { useRecoilValue } from "recoil";
import ChatRoom from "../components/chatting/ChatRoom";

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

  return (
    <>
      <Container>
        <ChattingListFrom imgSrc={Img1} />
        {chatRoomId ? <ChatRoom /> : <StartChatRoom />}
      </Container>
    </>
  );
};

export default Chatting;
