// useFetchChatList.js
// import { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { chatListState, totalUnreadMessagesState } from "../recoil/chatState";
import { useQuery } from "react-query";
import { useEffect } from "react";

const useFetchChatList = (isLoggedIn: boolean) => {
  const [chatList, setChatList] = useRecoilState(chatListState);
  const [totalUnreadMessages, setTotalUnreadMessages] = useRecoilState(totalUnreadMessagesState);

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
  const { error, isLoading } = useQuery("chatList", fetchChatList, {
    refetchInterval: 30000, // 30초마다 다시 가져옴
    enabled: isLoggedIn, // 로그인 상태일 때만 활성화

    onError: (err) => {
      console.log("An error occurred:", err);
    },

    onSuccess: (data) => {
      setChatList(data);
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
