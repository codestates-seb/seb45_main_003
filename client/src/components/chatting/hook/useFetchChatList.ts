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

  // 닫은 채팅방에서 온 알림은 카운팅 제외
  useEffect(() => {
    const total = chatList.reduce((acc, chat) => {
      // deletedAt이 null인 경우만 unReadMessage를 더함
      if (chat.deletedAt === null) {
        return acc + (chat.unReadMessage || 0);
      }
      return acc;
    }, 0);
    setTotalUnreadMessages(total);
  }, [chatList]);

  return { chatList, error, isLoading, totalUnreadMessages };
};

export default useFetchChatList;
