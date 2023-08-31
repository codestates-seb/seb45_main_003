import styled from "styled-components";

const MainTitle = styled.div`
  color: #222;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 100px; /* 108.696% */
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = (): JSX.Element => {
  return (
    <>
      <ContentBox>
        <MainTitle>THE PRICE YOU WANT</MainTitle>
      </ContentBox>
    </>
  );
};

export default Main;
