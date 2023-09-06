import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms"; // 필요한 Recoil 상태를 가져옵니다.
import { chatListState } from "./chatListState";
import moment from "moment";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export type Chat = {
  chatRoomId: number;
  memberId: number;
  productId: number;
  deletedAt: string;

  chatRoom: {
    memberId: number;
    deletedAt: string;
  };
  message: string;
};

const Container = styled.button`
  display: flex;
  padding: 0.75rem 0.5rem;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;

  width: 100%;

  flex-direction: column;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 0.0625rem solid var(--cool-gray-20, #dde1e6);
  border-radius: 0.375rem;
  justify-content: space-between;

  .chatRoom {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    /* background-color: #3871a3; */
    align-items: center; // chatRoom 내부의 모든 아이템을 수직으로 중앙 정렬
  }
  .createdAt {
    justify-content: end;
    font-size: 0.3125rem;
    text-align: center;
    align-self: flex-end; // createdAt 텍스트를 수직으로 중앙 정렬
  }
`;
const ChattingListData: React.FC = () => {
  const [chatList, setChatList] = useRecoilState<Chat[]>(chatListState); // 타입을 명시합니다.
  const isLoggedIn = useRecoilValue(loginState);
  const navigate = useNavigate();

  const handleRoomClick = (chatRoomId: number) => {
    navigate(`/room/${chatRoomId}`);
  };
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
          setChatList(response.data);
        } catch (error) {
          console.log("Failed to fetch chat list:", error);
        }
      };
      fetchData();
    }
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 useEffect를 실행합니다.

  return (
    <>
      <ul>
        {chatList.map((chat, index) => (
          <Container key={index} onClick={() => handleRoomClick(chat.chatRoomId)}>
            {" "}
            {/* 수정된 부분 */}
            <li key={index}>
              <div className="chatRoom">
                {/* chat의 구조에 따라 수정된 부분 */}
                <div>{chat.chatRoomId}</div>
                <div>Member ID: {chat.memberId}</div>
                <div className="createdAt">
                  {moment(chat.chatRoom.deletedAt).format("YYYY-MM-DD")} {/* 수정된 부분 */}
                </div>
              </div>
            </li>
          </Container>
        ))}
      </ul>
    </>
  );
};
export default ChattingListData;
