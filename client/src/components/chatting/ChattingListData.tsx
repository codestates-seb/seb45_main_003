import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms"; // 필요한 Recoil 상태를 가져옵니다.
import { chatListState } from "./chatListState";
import moment from "moment";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  align-items: center; // Container의 모든 아이템을 수직으로 중앙 정렬
  gap: 0.5rem;
  align-self: stretch;
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
  const [chatList, setChatList] = useRecoilState(chatListState);
  const isLoggedIn = useRecoilValue(loginState); // 로그인 상태를 가져옵니다.

  // 토큰을 검증하는 로직이 필요하면 여기에 추가할 수 있습니다.

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
          <Container>
            <li key={index}>
              <div className="chatRoom">
                <div>{chat.chatParticipantId}</div>
                <div>Member ID: {chat.memberId}</div>

                {/* moment.js를 사용하여 날짜 형식을 "YYYY-MM-DD"로 변경 */}
                <div className="createdAt">
                  {moment(chat.chatRoom.createdAt).format("YYYY-MM-DD")}
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
