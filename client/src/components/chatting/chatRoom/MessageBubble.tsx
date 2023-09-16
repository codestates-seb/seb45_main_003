// 말풍선 컴포넌트
import styled from "styled-components";
// import { getUserId } from "../../../util/auth";

const BubbleWrapper = styled.div<{ owner: "user" | "other" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ owner }) => (owner === "user" ? "flex-end" : "flex-start")};
  margin: 0.5rem;

  text-align: start;

  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  .isReadTime {
    display: flex;
  }
  .unRead {
    font-size: 0.625rem;
    color: #222222;
    margin-top: 0.25rem;
    padding: 0.25rem;
  }
`;

const Bubble = styled.div<{ owner: "user" | "other" }>`
  max-width: 60%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ owner }) => (owner === "user" ? "#FFCD57" : "#FFCD57")};
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
  isRead?: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ owner, message, time, isRead }) => {
  // const Id = getUserId();
  return (
    <BubbleWrapper owner={owner}>
      <Bubble owner={owner}>{message}</Bubble>
      <div className="isReadTime">
        <div className="unRead">{owner === "user" ? (isRead ? "" : "1") : ""}</div>
        <Time>{time}</Time>
      </div>
    </BubbleWrapper>
  );
};

export default MessageBubble;
