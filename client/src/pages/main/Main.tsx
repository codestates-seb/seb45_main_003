// 메인
import Carousel from "../../components/mainPage/carousel/Carousel";
import FirstScreen from "../../components/mainPage/mainLayout/FirstScreen";
import SecondScreen from "../../components/mainPage/mainLayout/SecondScreen";
import { BackGround, ContentBox, MainTitle, SecondTitle } from "./MainStyle";

import Auction from "../../assets/images/main/Auction.gif";
import Chat from "../../assets/images/main/Chat.gif";
import Profile from "../../assets/images/main/Profile.gif";
import background from "../../assets/images/main/background.png";
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
            imgSrc={Auction}
          />
          <ThirdScreen
            text1="실시간 채팅"
            text2="낙찰 또는 즉시구매에<br>성공한 구매자와 판매자가<br>실시간 채팅을 할 수 있습니다."
            imgSrc={Chat}
          />
          <SecondScreen
            text1="프로필 페이지"
            text2="경매 현황, 찜 목록 등<br>서비스를 이용하면서 필요한<br>다양한 상황을 조회할 수 있습니다."
            imgSrc={Profile}
          />
        </ContentBox>
      </BackGround>
    </>
  );
};

export default Main;
