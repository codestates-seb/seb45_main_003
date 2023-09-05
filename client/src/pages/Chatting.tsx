// import ChattingList from "../components/chatting/ChattingList";
import Img1 from "../assets/images/chatting/ProfilrImg.svg";
import ChatRoom from "../components/chatting/ChatRoom";
import ChattingListFrom from "../components/chatting/ChattingListFrom";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2.5rem 0.9375rem;
  align-items: center;
  gap: 2.25rem;
  align-self: stretch;
  background-color: #3871a3;
  text-align: center;
`;

const Chatting = (): JSX.Element => {
  return (
    <>
      <Container>
        <ChattingListFrom imgSrc={Img1} />
        <ChatRoom />
      </Container>
    </>
  );
};

export default Chatting;
