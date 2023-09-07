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
          <MainTitle>THE PRICE YOU WANT</MainTitle>
          <SecondTitle>중고 경매 서비스 WonPrice</SecondTitle>
          {/* 순차 적으로 컨텐츠 배치  : 캐러셀 슬라이드 */}
          <div className="Box">
            <Carousel />
          </div>
          {/* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드*/}
          <FirstScreen />
          {/* 순차 적으로 컨텐츠 배치 : 기능 소개 1*/}
          <SecondScreen
            text1="기능 소개1"
            text2="뭐라 적어야 하긴 하는데 <br /> 뭐라고 적어야 할지 생각이 안남 <br /> 뭔가 엄청난 소개 문구"
            imgSrc={Img1}
          />
          <ThirdScreen
            text1="기능 소개2"
            text2="뭐라 적어야 하긴 하는데 <br /> 뭐라고 적어야 할지 생각이 안남 <br /> 뭔가 엄청난 소개 문구"
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
