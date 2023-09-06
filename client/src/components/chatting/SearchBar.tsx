import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

export type Chat = {
  chatParticipantId: number;
  memberId: number;
  chatRoom: {
    chatRoomId: number;
    productId: number;
    status: string;
    createdAt: string;
  };
};

const ChatListComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  // API에서 채팅 데이터를 불러오는 함수
  const fetchChats = async () => {
    try {
      const response = await axios.get<Chat[]>(`${process.env.REACT_APP_API_URL}/chat`); // API URL
      const data = response.data;
      setChats(data);
      setFilteredChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const newFilteredChats = chats.filter(
      (chat) =>
        chat.chatRoom.status.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        chat.chatRoom.createdAt.toLowerCase().includes(newSearchTerm.toLowerCase()),
    );
    setFilteredChats(newFilteredChats);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: "100%",
          fontSize: "1rem",
          padding: "0.4375rem",
          border: "none",
        }}
      />
      <ul>
        {filteredChats.map((chat) => (
          <li key={chat.chatParticipantId}>
            Room ID: {chat.chatRoom.chatRoomId}, Status: {chat.chatRoom.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatListComponent;
