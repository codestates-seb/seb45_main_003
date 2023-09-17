import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { chatListState, totalUnreadMessagesState } from "../recoil/chatState";

const useFetchChatList = (isLoggedIn: boolean) => {
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [totalUnreadMessages, setTotalUnreadMessages] = useRecoilState(totalUnreadMessagesState);
  const previousChatList = useRef(null); // 이전 chatList를 저장할 ref

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

  // 로그인 상태일 때 폴링
  const { error, isLoading } = useQuery(["chatList"], fetchChatList, {
    refetchInterval: 30000, // 30초마다 다시 가져옴
    enabled: isLoggedIn, // 로그인 상태일 때만 활성화

    onError: (err) => {
      console.log("An error occurred:", err);
    },

    onSuccess: (data) => {
      // 깊은 비교를 사용하여 이전 데이터와 현재 데이터가 다른지 확인
      if (JSON.stringify(previousChatList.current) !== JSON.stringify(data)) {
        setChatList(data);
        previousChatList.current = data; // 이전 데이터를 업데이트
      }
    },
  });

  // Compute total number of unread messages
  useEffect(() => {
    const total = chatList.reduce((acc, chat) => acc + (chat.unReadMessage || 0), 0);
    setTotalUnreadMessages(total);
  }, [chatList]);

  return { chatList, error, isLoading, totalUnreadMessages };
};

export default useFetchChatList;
