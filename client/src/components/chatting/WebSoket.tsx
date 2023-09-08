interface MessageData {
  content: string;
  sender?: string;
  recipient?: string;
  // 필요한 다른 필드
}
import React, { useState, useEffect } from "react";

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);

    ws.onmessage = (event: MessageEvent) => {
      const messageData: MessageData = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      console.log(messageData);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message.content}</div>
      ))}
    </div>
  );
};

export default ChatComponent;
