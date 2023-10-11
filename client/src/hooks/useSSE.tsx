import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect } from "react";

interface UseSSE<T> {
  url: string;
  callback: (newData: T[]) => void;
}

const useSSE = <T,>({ url, callback }: UseSSE<T>) => {
  useEffect(() => {
    const eventSource = new EventSourcePolyfill(url, {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });

    eventSource.addEventListener("message", (event) => {
      const newData = JSON.parse(event.data);
      callback(newData);
    });

    eventSource.addEventListener("error", (error) => {
      console.error("SSE Error:", error);
    });

    return () => {
      eventSource.close();
    };
  }, [url, callback]);
};

export default useSSE;
