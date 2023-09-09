import { useEffect, useState } from "react";
import * as Webstomp from "webstomp-client";

const useStomp = (roomId: number) => {
  const [client, setClient] = useState<Webstomp.Client | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://your-server-address/ws`);
    const stompClient = Webstomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("Connected to STOMP");
      },
      (error) => {
        console.error("STOMP protocol error:", error);
      },
    );

    setClient(stompClient);

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from STOMP");
        });
      }
    };
  }, [roomId]);

  return client;
};

export default useStomp;
