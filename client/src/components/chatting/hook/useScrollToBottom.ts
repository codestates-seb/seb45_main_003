import { useEffect } from "react";

export const useScrollToBottom = (messages: string[]) => {
  useEffect(() => {
    const element = document.querySelector(".chatBox");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);
};
