import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../../atoms/atoms"; // 필요한 Recoil 상태를 가져옵니다.
import FormatTimeOrDate from "../hook/FormatTimeOrDate";
import useFetchChatList from "../hook/useFetchChatList"; // 커스텀 훅을 임포트합니다.
import { currentChatRoomIdState, totalUnreadMessagesState } from "../recoil/chatState";

// interface
interface ChatList {
  chatRoomId: number;
  memberId: number;
  productId: number;
  deletedAt: string | null;
  path: string | undefined;
  unReadMessage: number;
  createdAt: string;

  chatRoom: {
    memberId: number;
    name: string;
    deletedAt: string | null;
    path: string | undefined;
  };
  message: {
    messageId: number;
    content: string;
    createdAt: string | null;
  } | null;
}
interface MyError {
  message: string;
  // 다른 필드들...
}
// 스타일
const TotalUnread = styled.div`
  position: static;
  display: flex;
  &:hover {
    color: #ffcd57;
  }
  .notification-bar {
    display: flex;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 12px;
    background: #ffb300;
    color: var(--default-white, #fff);
    text-align: center;
    justify-content: center;
    align-items: center;
    font-family: Roboto;
    font-size: 0.6875rem;
    font-weight: 700;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const ChatList = styled.div`
  height: 34.375rem;
  overflow-y: auto;
  /* 내용이 넘칠 경우 스크롤 표시 */

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Container = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0;
  border: none;
  border-radius: 0.375rem;
  /* box-shadow: 1px 6px 3px 4px rgba(0, 0, 0, 0.25); */
  min-width: 11.875rem;
  min-height: 3rem;
  background: #f7f7f7;

  .ProfileImg {
    border-radius: 24.556px;
    height: 1.5rem;
    width: 1.5rem;
  }

  /* hover 상태일 때의 스타일 */
  &:hover {
    background: #ffcd57;
  }

  .chatRoom {
    padding: 0.75rem 0.5rem;
  }
  .idDate {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.3125rem;
    color: var(--cool-gray-90, #21272a);
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-weight: 500;
    .profile {
      display: flex;
      flex-direction: row;
      gap: 20px;
    }
  }
  .memberId {
    color: var(--cool-gray-90, #21272a);
    font-family: Pretendard Variable;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
  }
  .messageAt {
    padding-top: 0.625rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    padding-left: 0.625rem;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .message {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: 500;
      color: #616161;
    }
  }
  .createdAt {
    color: #616161;
    font-family: Pretendard Variable;
    font-size: 0.625rem;
    font-weight: 500;
  }
  .unReadMessage {
    display: flex;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 12px;
    background: #ffb300;
    color: var(--default-white, #fff);
    text-align: center;
    justify-content: center;
    align-items: center;
    font-family: Roboto;
    font-size: 0.6875rem;
    font-weight: 700;
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
  }
`;

const Box = styled.div`
  padding: 0;
  .input {
    padding: 0;
    border: none;
    outline: none;
    width: 100%;
    font-size: 0.9375rem;
    &:hover,
    &:focus {
      border: none;
      outline: none;
    }
  }
`;

// 기능
const ChattingListData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [, setCurrentChatRoomId] = useRecoilState(currentChatRoomIdState);
  const isLoggedIn = useRecoilValue(loginState);
  const { chatList, error, isLoading } = useFetchChatList(isLoggedIn); // 커스텀 훅을 사용합니다.
  const navigate = useNavigate();
  // State for storing the total number of unread messages.
  const [totalUnreadMessages, setTotalUnreadMessages] = useRecoilState(totalUnreadMessagesState);
  // 새로운 채팅이 추가된 채팅방의 ID를 저장하는 상태 변수
  useEffect(() => {
    const total = chatList.reduce((acc, chat) => acc + (chat.unReadMessage || 0), 0);
    setTotalUnreadMessages(total);
  }, [chatList]);

  useEffect(() => {
    console.log("Chat list has been updated:", chatList);
  }, [chatList]);

  // 채팅방 필터링
  const filteredChatList = chatList.filter((chat) => {
    return (
      chat.chatRoom?.name?.toString().includes(searchTerm) && chat.deletedAt === null // deletedAt이 null인 경우만 포함
    );
  });

  const sortedChatList = filteredChatList.sort((a, b) => {
    const roomTimeA = new Date(a.createdAt).getTime();
    const roomTimeB = new Date(b.createdAt).getTime();

    const messageTimeA = a.message ? new Date(a.message.createdAt || "").getTime() : 0;
    const messageTimeB = b.message ? new Date(b.message.createdAt || "").getTime() : 0;

    if (messageTimeA === 0 && messageTimeB === 0) {
      // 둘 다 메시지가 없을 경우, 채팅방의 createdAt으로 정렬하고 상단에 위치
      return roomTimeB - roomTimeA;
    } else if (messageTimeA === 0) {
      // 첫 번째 채팅방에 메시지가 없을 경우
      return -1;
    } else if (messageTimeB === 0) {
      // 두 번째 채팅방에 메시지가 없을 경우
      return 1;
    } else {
      // 둘 다 새 메시지가 있을 경우, 메시지의 createdAt으로 정렬
      return messageTimeB - messageTimeA;
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoomClick = (chatRoomId: number, productId: number) => {
    setCurrentChatRoomId(chatRoomId);
    navigate(`/chat/${chatRoomId}/?productId=${productId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as MyError).message}</div>;

  // sortedChatList가 undefined이거나 비어 있는지 확인
  const firstChat = sortedChatList && sortedChatList.length > 0 ? sortedChatList[0] : null;

  return (
    <>
      <div className="some-container">
        {firstChat ? (
          <div key={firstChat.chatRoomId} className="ProfileBox">
            <img className="ProfileImg" src={firstChat.path || "default_image_path_here"} alt="" />
            <TotalUnread>
              <NotificationsIcon />
              {totalUnreadMessages > 0 && (
                <div className="notification-bar">{totalUnreadMessages}</div>
              )}
            </TotalUnread>
          </div>
        ) : (
          <div>채팅을 찾을수 없습니다.</div>
        )}
      </div>
      <div className="SearchBar">
        <SearchIcon />
        <Box>
          <input
            className="input"
            type="text"
            placeholder="Search for chat rooms..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </Box>
      </div>
      <ul>
        {/* 채팅방 리스트 항목 */}
        <ChatList>
          {sortedChatList.map((chat) => (
            <Container
              key={chat.chatRoomId}
              onClick={() => handleRoomClick(chat.chatRoomId, chat.productId)}
            >
              <li key={chat.chatRoomId}>
                <div className="chatRoom">
                  <div className="idDate">
                    <div className="profile">
                      <img
                        className="ProfileImg"
                        src={chat?.chatRoom?.path || "default_image_path_here"}
                        alt=""
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          objectFit: "fill",
                        }}
                      />
                      <div className="memberId">{chat.chatRoom.name}</div>
                    </div>
                    {chat.unReadMessage > 0 && (
                      <div className="unReadMessage">{chat.unReadMessage}</div>
                    )}
                  </div>
                  <div className="messageAt">
                    <div className="message">
                      {chat.message ? chat.message.content : "채팅을 시작해보세요!"}
                    </div>
                    <div className="createdAt">
                      {FormatTimeOrDate(chat.message ? chat.message.createdAt : null)}
                    </div>
                  </div>
                </div>
              </li>
            </Container>
          ))}
        </ChatList>
      </ul>
    </>
  );
};

export default ChattingListData;
