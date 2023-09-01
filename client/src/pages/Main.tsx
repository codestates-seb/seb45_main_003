import styled from "styled-components";
import { ReactComponent as MySvgBackground } from "../assets/images/Background.svg";
import Carousel from "../components/carousel/Carousel";
import EffectCard from "../components/effectCards/EffectCards";
// import FirstScreen from "../components/mainLayout/FirstScreen";


// 전체 Main 컨텐츠 배츠 영역
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .CardBox {
    display: flex;
    flex-direction: row;
    margin-left: 6.25rem;
    padding-top: 6.25rem;
    align-items: center;

    /* background-color: #b1701c; */

    .Text1 {
      display: flex;
      width: 28rem;
      height: 10rem;
      flex-direction: column;
      justify-content: center;
      flex-shrink: 0;

      /* background-color: aqua; */

      color: #222;
      font-family: Pretendard Variable;
      font-size: 60px;
      font-style: normal;
      font-weight: 800;
      line-height: 80px; /* 133.333% */
      padding-left: 149px;
    }
  }
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

const Back = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = (): JSX.Element => {
  return (
    <>
      <ContentBox>
        <MainTitle>THE PRICE YOU WANT</MainTitle>
        <SecondTitle>중고 경매 서비스 WonPrice</SecondTitle>
        {/* <FirstScreen /> */}
        <Back>
          <MySvgBackground style={{ position: "absolute", zIndex: -1, paddingTop: "18.75rem" }} />
        </Back>

        <Carousel />
        <div className="CardBox">
          <EffectCard />
          <div className="Text1">원하는 상품을 Won하는 Price에</div>
        </div>
      </ContentBox>
    </>
  );
};

export default Main;
