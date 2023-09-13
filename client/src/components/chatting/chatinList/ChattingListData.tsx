import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue, RecoilState } from "recoil";
import { loginState } from "../../../atoms/atoms"; // 필요한 Recoil 상태를 가져옵니다.
import { chatListState } from "../recoil/chatState";
import styled from "styled-components";
import { currentChatRoomIdState } from "../recoil/chatState";
import FormatTimeOrDate from "../hook/FormatTimeOrDate";
import { useQuery } from "react-query";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
// import { webSocketConnectionState } from "../recoil/chatState";

interface ChatList {
  chatRoomId: number;
  memberId: number;
  productId: number;
  deletedAt: string | null;
  path: string | undefined;
  unReadMessage: number;
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
  /* &::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 100vw;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb300;
    border-radius: 100vw;
    border: 0.2rem solid #ffffff;
  } */
`;

const Container = styled.button`
  width: 100%;
  margin-bottom: 1.875rem;
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

const ChattingListData: React.FC = () => {
  // const isConnected = useRecoilValue(webSocketConnectionState); // 웹소켓 연결 상태

  const [chatList, setChatList] = useRecoilState(chatListState as RecoilState<ChatList[]>);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [, setCurrentChatRoomId] = useRecoilState(currentChatRoomIdState);
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();
  // State for storing the total number of unread messages.
  const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);

  // 모든 알림 갯수
  useEffect(() => {
    const total = chatList.reduce((acc, chat) => acc + (chat.unReadMessage || 0), 0);
    setTotalUnreadMessages(total);
  }, [chatList]);

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태가 true일 때만 API 호출을 합니다.
      const fetchData = async () => {
        // 로컬 스토리지에서 토큰을 가져옵니다.
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          console.log("No access token found");
          return;
        }

        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat`, {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 헤더에 토큰을 추가합니다.
            },
          });
          // console.log(response.data);
          setChatList(response.data);
        } catch (error) {
          console.log("Failed to fetch chat list:", error);
        }
      };
      fetchData();
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 useEffect를 실행합니다.

  useEffect(() => {
    console.log("Chat list has been updated:", chatList);
  }, [chatList]);

  const fetchChatList = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  // const { error, isLoading } = useQuery("chatList", fetchChatList, {
  //   refetchInterval: isConnected ? 5000 : undefined, // 웹소켓 연결 상태에 따라 폴링 간격을 설정 5초 설정
  //   enabled: isLoggedIn && isConnected, // 로그인과 웹소켓 연결이 모두 되어 있을 때만 쿼리 활성화

  //   onError: (err) => {
  //     console.log("An error occurred:", err);
  //   },
  //   onSuccess: (data) => {
  //     setChatList(data);
  //   },
  // });

  const { error, isLoading } = useQuery("chatList", fetchChatList, {
    refetchInterval: 5000, // Always refetch at an interval of 5 seconds
    enabled: isLoggedIn, // Only enable query when logged in

    onError: (err) => {
      console.log("An error occurred:", err);
    },
    onSuccess: (data) => {
      setChatList(data);
    },
  });

  // 채팅방 필터링
  const filteredChatList = chatList.filter((chat) => {
    return chat.chatRoom?.name?.toString().includes(searchTerm);
  });

  // 최신 메시지 기준으로 채팅방 정렬
  const sortedChatList = filteredChatList.sort((a, b) => {
    const timeA = a.message?.createdAt || "";
    const timeB = b.message?.createdAt || "";
    return new Date(timeB).getTime() - new Date(timeA).getTime();
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoomClick = (chatRoomId: number) => {
    setCurrentChatRoomId(chatRoomId);
    navigate(`/chat/${chatRoomId}`);
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
            <Container key={chat.chatRoomId} onClick={() => handleRoomClick(chat.chatRoomId)}>
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
