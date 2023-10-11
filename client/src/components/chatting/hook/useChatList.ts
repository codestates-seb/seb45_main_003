// useChatList.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ChatListData {
  // 채팅 리스트의 데이터 구조를 정의하세요.
}

export const useChatList = () => {
  const fetchChatList = async (): Promise<ChatListData[]> => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    const response = await axios.get<ChatListData[]>(`${process.env.REACT_APP_API_URL}/chat`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery<ChatListData[], Error>(
    ["chatList"],
    fetchChatList,
    {
      refetchInterval: 1000,
    },
  );

  return { data, error, isLoading, refetch };
};
