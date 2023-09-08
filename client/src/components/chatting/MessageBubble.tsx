import styled from "styled-components";
// import NoMessages from "../../assets/images/chatting/NoMessages.svg";

const BubbleWrapper = styled.div<{ owner: "user" | "other" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ owner }) => (owner === "user" ? "flex-end" : "flex-start")};
  margin: 0.5rem;
`;

const Bubble = styled.div<{ owner: "user" | "other" }>`
  max-width: 60%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ owner }) => (owner === "user" ? "#FFB300" : "#FFCD57")};
  color: ${({ owner }) => (owner === "user" ? "#222222" : "#222222")};
`;

const Time = styled.span`
  font-size: 0.625rem;
  color: grey;
  margin-top: 0.25rem;
  padding: 0.25rem;
`;

export type MessageBubbleProps = {
  owner: "user" | "other";
  message: string;
  time: string;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ owner, message, time }) => {
  return (
    <BubbleWrapper owner={owner}>
      <Bubble owner={owner}>{message}</Bubble>
      <Time>{time}</Time>
    </BubbleWrapper>
  );
};

export default MessageBubble;
