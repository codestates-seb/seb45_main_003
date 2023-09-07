import { styled } from "styled-components";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%; // 상대적인 단위로 변경
  height: 43.6875rem;
  padding: 1.5rem 1rem;

  justify-content: end;

  border-radius: 0.375rem;
  border: 1px solid #e0e0e0;
  background: #f7f7f7;
  background-color: aqua;

  .chatBox {
    overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */

    &::-webkit-scrollbar {
      width: 0px;
    }
    /* &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: #ccc;
    } */
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

// import axios from "axios";
// import MessageBubble from "./MessageBubble";
// import ChatInput from "./ChatInput";
// import styled from "styled-components";
// import { useRecoilValue } from "recoil";
// import { loginState } from "../../atoms/atoms";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 90%; // 상대적인 단위로 변경
//   height: 40.625rem;
//   padding: 1.5rem 1rem;

//   justify-content: end;

//   border-radius: 0.375rem;
//   border: 1px solid #e0e0e0;
//   background: #f7f7f7;
//   background-color: aqua;

//   .chatBox {
//     overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */
//   }
//   @media (max-width: 64rem) {
//     width: 95%; // 상대적인 단위로 변경
//   }
// `;

// interface Message {
//   memberId: string;
//   message: string;
//   time: string;
// }

// const ChatRoom: React.FC = () => {
//   const { chatRoomId } = useParams<{ chatRoomId: string }>();
//   const isLoggedIn = useRecoilValue(loginState);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handleSendMessage = (message: string) => {
//     console.log("User sent a message:", message);
//     // 여기서 메시지를 전송하는 API 호출을 할 수 있습니다.
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       // 로그인 상태가 true일 때만 API 호출을 합니다.
//       const fetchData = async () => {
//         const accessToken = localStorage.getItem("accessToken");

//         if (!accessToken) {
//           console.log("No access token found");
//           return;
//         }

//         try {
//           const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });

//           setMessages(response.data); // 받아온 데이터를 상태로 설정합니다.
//         } catch (error) {
//           console.log("Failed to fetch chat data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [chatRoomId, isLoggedIn]); // chatRoomId 또는 로그인 상태가 변경되면 다시 데이터를 불러옵니다.

//   return (
//     <Container>
//       <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
//         {messages.map((msg, index) => (
//           <MessageBubble
//             key={index}
//             memberId={msg.memberId}
//             message={msg.message}
//             time={msg.time}
//           />
//         ))}
//       </div>
//       <ChatInput onSendMessage={handleSendMessage} />
//     </Container>
//   );
// };

// export default ChatRoom;
