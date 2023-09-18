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

  /* @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  } */
`;

interface MobileChatListProps {
  showChatRoom: boolean | null | number;
}

// 수정된 코드
const MobileChatList = styled.div<MobileChatListProps>`
  display: block;

  @media (max-width: 37.5rem) {
    display: ${(props) => (props.showChatRoom ? "none" : "block")};
  }
`;

interface MobileChatRoomProps {
  showChatRoom: boolean | null | number;
}

const MobileChatRoom = styled.div<MobileChatRoomProps>`
  display: block;
  width: 100%; // 기본 너비
  height: 100%; // 기본 높이
  justify-content: center;
  @media (max-width: 37.5rem) {
    display: ${(props) => (props.showChatRoom ? "block" : "none")};
  }
`;

const Chatting = (): JSX.Element => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const { id } = useParams<{ id: string }>(); // URL에서 id 파라미터를 가져옵니다.

  const showChatRoom = chatRoomId && id === chatRoomId.toString();

  return (
    <>
      <Container>
        <MobileChatList showChatRoom={showChatRoom}>
          <ChattingListFrom />
        </MobileChatList>
        {chatRoomId ? (
          id === chatRoomId.toString() ? (
            <MobileChatRoom showChatRoom={showChatRoom}>
              <ChatRoom />
            </MobileChatRoom>
          ) : (
            <MobileChatRoom showChatRoom={showChatRoom}>
              <StartChatRoom />
            </MobileChatRoom>
          )
        ) : (
          <MobileChatRoom showChatRoom={showChatRoom}>
            <StartChatRoom />
          </MobileChatRoom>
        )}
      </Container>
    </>
  );
};

export default Chatting;
