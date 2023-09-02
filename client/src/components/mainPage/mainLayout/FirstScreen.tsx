import styled from "styled-components";
import Carousel from "../carousel/Carousel";

const MainBox = styled.div`
  justify-content: center;
  width: 1920px;
  height: 849px;
  flex-shrink: 0;
`;

// THE PRICE YOU WANT 타이틀 영역

const MainTitle = styled.div`
  margin-top: 3.625rem;
  color: #222;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 100px; /* 108.696% */
  width: calc(100% - 3rem);
`;
const SecondTitle = styled.div`
  color: #222;
  font-family: Pretendard Variable;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 80px; /* 166.667% */
`;

const FirstScreen = (): JSX.Element => {
  return (
    <>
      <MainBox>
        <MainTitle>THE PRICE YOU WANT</MainTitle>
        <SecondTitle>중고 경매 서비스 WonPrice</SecondTitle>
        <Carousel />
      </MainBox>
    </>
  );
};
export default FirstScreen;
