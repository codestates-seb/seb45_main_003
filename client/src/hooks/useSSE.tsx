import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect } from "react";
import { PostType } from "../components/post/List";

interface UseSSE {
  url: string;
  callback: (newData: PostType[]) => void;
}

const useSSE = ({ url, callback }: UseSSE) => {
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
  }, [url]);
};

export default useSSE;
