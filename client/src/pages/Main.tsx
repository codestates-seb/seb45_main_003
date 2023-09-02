// 메인
import styled from "styled-components";
// import { ReactComponent as MySvgBackground } from "../assets/images/Background.svg";
import Carousel from "../components/mainPage/carousel/Carousel";
import EffectCard from "../components/mainPage/effectCards/EffectCards";
import Header from "../components/common/Header";
// import FirstScreen from "../components/mainLayout/FirstScreen";

// 전체 Main 컨텐츠 배츠 영역
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  .CardBox {
    display: flex;
    flex-direction: row;
    margin-left: 25rem;
    padding-top: 6.25rem;
    align-items: center;
    width: calc(100% - 3rem);

    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .Text1 {
        display: flex;
        width: 28rem;
        height: 10rem;
        flex-direction: column;
        justify-content: start;
        flex-shrink: 0;

        /* background-color: aqua; */

        color: #222;
        font-family: Pretendard Variable;
        font-size: 60px;
        font-style: normal;
        font-weight: 800;
        line-height: 80px; /* 133.333% */
        padding-left: 9.3125rem;
      }

      .Text2 {
        color: #616161;
        font-family: Pretendard Variable;
        font-size: 36px;
        font-style: normal;
        font-weight: 800;
        line-height: 58px; /* 161.111% */

        padding-left: 12.9375rem;
        padding-top: 2.625rem;
      }
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
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
  line-height: 80px;
  margin-bottom: 3.125rem;
`;

// const Back = styled.div`
//   display: flex;
//   justify-content: center;
//   background-position: 0 center;
//   background-size: 100% 600px;
// `;

const Main = (): JSX.Element => {
  return (
    <>
      <Header />
      <ContentBox>
        <MainTitle>THE PRICE YOU WANT</MainTitle>
        <SecondTitle>중고 경매 서비스 WonPrice</SecondTitle>
        {/* <FirstScreen /> */}

        <div className="Box">
          <Carousel />
        </div>
        <div className="CardBox">
          <EffectCard />
          {/* 순차 적으로 컨텐츠 배치 1 */}
          <div className="TextBox1">
            <div className="Text1">원하는 상품을 Won하는 Price에</div>
            <div className="Text2">
              뭐라 적어야 하긴 하는데 <br />
              뭐라고 적어야 할지생각이 안남 <br /> 뭔가 엄청난 소개 문구
            </div>
          </div>
        </div>
        {/* 순차 적으로 컨텐츠 배치 2 */}
        <div className="TextBox2">
          <div className="Text1">원하는 상품을 Won하는 Price에</div>
          <div className="Text2">
            뭐라 적어야 하긴 하는데 <br />
            뭐라고 적어야 할지생각이 안남 <br /> 뭔가 엄청난 소개 문구
          </div>
        </div>
      </ContentBox>
    </>
  );
};

export default Main;
