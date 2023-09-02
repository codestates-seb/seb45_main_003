// 메인
import styled from "styled-components";
// import { ReactComponent as MySvgBackground } from "../assets/images/Background.svg";
import Carousel from "../../components/mainPage/carousel/Carousel";
import EffectCard from "../../components/mainPage/effectCards/EffectCards";
import Header from "../../components/common/Header";
// import FirstScreen from "../components/mainLayout/FirstScreen";

// 전체 Main 컨텐츠 배츠 영역
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: 0 auto;
  width: calc(100% - 3rem);

  .CardBox {
    display: flex;
    justify-content: center;
    background-color: blue;

    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .Text1 {
        width: 28rem;
        flex-direction: column;
        justify-content: start;
        flex-shrink: 0;

        color: #222;
        font-family: Pretendard Variable;
        font-size: 3.75rem;
        font-style: normal;
        font-weight: 800;
        line-height: 5rem; /* 133.333% */
      }

      .Text2 {
        color: #616161;
        font-family: Pretendard Variable;
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 800;
        line-height: 3.625rem; /* 161.111% */
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
            {/* <div className="Text1">원하는 상품을 Won하는 Price에</div>
            <div className="Text2">
              뭐라 적어야 하긴 하는데 <br />
              뭐라고 적어야 할지생각이 안남 <br /> 뭔가 엄청난 소개 문구
            </div> */}
          </div>
        </div>
      </ContentBox>
    </>
  );
};

export default Main;
