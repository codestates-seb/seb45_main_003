// import ChattingList from "../components/chatting/ChattingList";
import Img1 from "../assets/images/chatting/ProfilrImg.svg";
// import ChatRoom from "../components/chatting/ChatRoom";
import ChattingListFrom from "../components/chatting/chatinList/ChattingListFrom";
import { styled } from "styled-components";
import StartChatRoom from "../components/chatting/chatRoom/StartChatRoom";
import { currentChatRoomIdState } from "../components/chatting/recoil/chatState";
import { useRecoilValue } from "recoil";
import ChatRoom from "../components/chatting/chatRoom/ChatRoom";

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
