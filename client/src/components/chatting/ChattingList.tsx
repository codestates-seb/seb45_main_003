import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms"; // 필요한 Recoil 상태를 가져옵니다.
import { chatListState } from "./chatListState";

const ChattingList: React.FC = () => {
  console.log(ChattingList);
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
    <div>
      <h1>Chat List</h1>
      <ul>
        {chatList.map((chat) => (
          <li key={chat.id}>
            {chat.name} - {chat.lastMessage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChattingList;
