import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";

export const useWebSocketConnection = (roomId: string | null) => {
  const [client, setClient] = useState<Webstomp.Client | null>(null);

  useEffect(() => {
    if (roomId) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stompClient = Webstomp.over(socket);

      stompClient.connect(
        {},
        () => {
          console.log("Connected to the WebSocket server");
          setClient(stompClient);
        },
        (error) => {
          console.error("STOMP protocol error:", error);
        },
      );

      return () => {
        stompClient.disconnect(() => {
          console.log("Disconnected from the WebSocket server");
        });
      };
    }
  }, [roomId]);

  return client;
};
