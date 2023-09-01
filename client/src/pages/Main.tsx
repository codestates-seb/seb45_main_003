import styled from "styled-components";
import { ReactComponent as MySvgBackground } from "../assets/images/Background.svg";
import Carousel from "../components/Carousel/Carousel";
import EffectCard from "../components/EffectCards/EffectCards";

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

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

const Back = styled.div`
  padding-top: 74.25rem;
  display: flex;
  justify-content: center;
`;

const Main = (): JSX.Element => {
  return (
    <>
      <ContentBox>
        <MainTitle>THE PRICE YOU WANT</MainTitle>
        <SecondTitle>중고 경매 서비스 WonPrice</SecondTitle>
        <Carousel />
        <EffectCard />
        <Back>
          <MySvgBackground style={{ position: "absolute", zIndex: -1 }} />
        </Back>
      </ContentBox>
    </>
  );
};

export default Main;
