import { useState, useEffect } from "react";
import axios from "axios";
import { MessageData } from "../recoil/chatState";
import { getUserId } from "../../../util/auth";

const useFetchMessages = (chatRoomId: number) => {
  const [messages, setMessages] = useState<MessageData>({ messageList: [], sequence: 0, status });
  const memberId = getUserId();

  useEffect(() => {
    // 컴포넌트가 언마운트되었는지 확인하기 위한 변수
    let isMounted = true;

    // 메시지를 가져오는 함수
    const fetchMessages = async () => {
      try {
        const response = await axios.get<MessageData>(
          `${process.env.REACT_APP_API_URL}/chat/${chatRoomId}`,
          {
            params: {
              memberId: Number(memberId),
            },
          },
        );

        // 컴포넌트가 언마운트되지 않았다면 상태를 업데이트합니다.
        if (isMounted) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    // 최초 한 번 실행
    fetchMessages();

    // 컴포넌트가 언마운트될 때 실행되는 정리 함수
    return () => {
      isMounted = false; // 언마운트 상태를 알림
    };
  }, [chatRoomId, memberId]);

  return messages;
};

export default useFetchMessages;
