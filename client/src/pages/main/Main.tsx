// 메인
import Carousel from "../../components/mainPage/carousel/Carousel";
import FirstScreen from "../../components/mainPage/mainLayout/FirstScreen";
import SecondScreen from "../../components/mainPage/mainLayout/SecondScreen";
import { BackGround, ContentBox, MainTitle, SecondTitle } from "./MainStyle";

import background from "../../assets/images/main/background.png";
import Img1 from "../../assets/images/main/image-3.png";
import ThirdScreen from "../../components/mainPage/mainLayout/ThirdScreen";

const Main = (): JSX.Element => {
  return (
    <>
      <BackGround style={{ backgroundImage: `url(${background})` }}>
        <ContentBox>
          <MainTitle data-aos="flip-left" data-aos-offset="0" data-aos-duration="1000">
            THE PRICE YOU WANT
          </MainTitle>
          <SecondTitle
            data-aos="flip-left"
            data-aos-offset="0"
            data-aos-delay="700"
            data-aos-duration="1200"
          >
            중고 경매 서비스 WonPrice
          </SecondTitle>
          {/* 순차 적으로 컨텐츠 배치  : 캐러셀 슬라이드 */}
          <div className="Box">
            <Carousel />
          </div>
          {/* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드*/}
          <FirstScreen />
          {/* 순차 적으로 컨텐츠 배치 : 기능 소개 1*/}
          <SecondScreen
            text1="실시간 경매"
            text2="실시간으로 입찰가가 갱신되는<br>박진감 넘치는 경매를<br>체험해 보세요."
            imgSrc={Img1}
          />
          <ThirdScreen
            text1="채팅"
            text2="낙찰 또는 즉시구매에<br>성공한 구매자와 판매자가<br>실시간 채팅을 할 수 있습니다."
            imgSrc={Img1}
          />
          <SecondScreen
            text1="기능 소개3"
            text2="뭐라 적어야 하긴 하는데 <br /> 뭐라고 적어야 할지 생각이 안남 <br /> 뭔가 엄청난 소개 문구"
            imgSrc={Img1}
          />
        </ContentBox>
      </BackGround>
    </>
  );
};

export default Main;
