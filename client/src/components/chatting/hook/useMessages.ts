import { useState } from "react";

interface MessageData {
  body: {
    content: string;
    senderId: number | null;
    createdAt?: string;
  };
}

export const useMessages = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  return [messages, setMessages] as const;
};
