// import { styled } from "styled-components";
// import ChatInput from "./ChatInput";
// import MessageBubble from "./MessageBubble";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 90%; // 상대적인 단위로 변경
//   height: 43.6875rem;
//   padding: 1.5rem 1rem;

//   justify-content: end;

//   border-radius: 0.375rem;
//   border: 1px solid #e0e0e0;
//   background: #f7f7f7;
//   /* background-color: aqua; */

//   .chatBox {
//     overflow-y: auto; /* 내용이 넘칠 경우 스크롤 표시 */

//     &::-webkit-scrollbar {
//       width: 0px;
//     }
//     /* &::-webkit-scrollbar-thumb {
//       border-radius: 6px;
//       background: #ccc;
//     } */
//   }
//   @media (max-width: 64rem) {
//     width: 95%; // 상대적인 단위로 변경
//   }
// `;

// const ChatRoom = (): JSX.Element => {
//   // 사용자가 메시지를 보내면 호출되는 함수
//   const handleSendMessage = (message: string) => {
//     console.log("User sent a message:", message);
//     // 이곳에서 실제로 메시지를 보내는 로직을 구현할 수 있습니다.
//   };

//   return (
//     <>
//       <Container>
//         <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
//           <MessageBubble />
//         </div>
//         <ChatInput onSendMessage={handleSendMessage} />
//       </Container>
//     </>
//   );
// };
// export default ChatRoom;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";
import * as Webstomp from "webstomp-client";
import { useRecoilValue } from "recoil";
import { currentChatRoomIdState } from "./chatState";

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
  /* background-color: aqua; */

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

const ChatRoom = () => {
  const chatRoomId = useRecoilValue(currentChatRoomIdState);
  const [client, setClient] = useState<Webstomp.Client | null>(null);
  const roomId = chatRoomId; // 실제 방 ID를 얻는 방법으로 대체하세요

  useEffect(() => {
    if (chatRoomId !== null) {
      // 웹소켓 연결 및 구독
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          console.log("Connected to the WebSocket server");
          stompClient.subscribe(`/topic/chat/${chatRoomId}`, (message) => {
            console.log(`Received message: ${message.body}`);
            // 여기에 메시지를 받았을 때의 로직을 추가
          });
        },
        (error) => {
          console.log(`STOMP error: ${error}`);
        },
      );

      setClient(stompClient);
    }
  }, [chatRoomId]); // currentChatRoomId가 변경될 때마다 웹소켓을 다시 연결

  // useEffect(() => {
  //   const socket = new WebSocket("ws://아마존서버/ws");
  //   const stompClient = Webstomp.over(socket);

  //   stompClient.connect(
  //     {},
  //     () => {
  //       console.log("WebSocket 서버에 연결되었습니다.");

  //       stompClient.subscribe(`/topic/chat/${roomId}`, (message: Webstomp.Message) => {
  //         if (message.body) {
  //           console.log(`받은 메시지: ${message.body}`);
  //           // 메시지를 받았을 때의 로직을 추가하세요
  //         }
  //       });
  //     },
  //     (error: Webstomp.Frame | CloseEvent) => {
  //       console.log(`STOMP 오류: ${error}`);
  //     },
  //   );

  //   setClient(stompClient);

  //   return () => {
  //     if (client && client.connected) {
  //       client.disconnect();
  //     }
  //   };
  // }, [client]);

  const handleSendMessage = (message: string) => {
    if (client && client.connected) {
      client.send(`/topic/chat/${roomId}`, JSON.stringify({ content: message }), {});
    }
  };

  return (
    <>
      <Container>
        <div className="chatBox" style={{ display: "flex", flexDirection: "column" }}>
          <MessageBubble />
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </Container>
    </>
  );
};

export default ChatRoom;
