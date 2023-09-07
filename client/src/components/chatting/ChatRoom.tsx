import { styled } from "styled-components";

const Container = styled.div`
  width: calc(100% - 3rem);
  height: 43.6875rem;
  padding: 1.5rem 1rem;

  border-radius: 6px;
  border: 1px solid #e0e0e0;
  background: #f7f7f7;
`;

const ChatRoom = (): JSX.Element => {
  return (
    <>
      <Container>
        <h1>ChatRoom</h1>
      </Container>
    </>
  );
};
export default ChatRoom;
