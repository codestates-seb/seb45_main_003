import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 12px 8px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  background-color: #3871a3;
  text-align: center;
`;

const ChattingList = (): JSX.Element => {
  return (
    <>
      <Container></Container>
    </>
  );
};

export default ChattingList;
