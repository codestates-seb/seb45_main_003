import { StyledMain } from "../../../pages/main/MainStyle";
import EffectCard from "../effectCards/EffectCards";

const FirstScreen = (): JSX.Element => {
  return (
    <>
      <StyledMain>
        <div className="EffectCard">
          <EffectCard />
          {/* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드*/}
          <div className="TextBox1" data-aos="fade-up" data-aos-duration="1200">
            <div className="GrandTitle">Tech Stack</div>
            <div className="Text2">
              <p>카드를 드래그 해보세요. </p> <p>한장씩 넘기면서 사용한 기술을 볼 수 있습니다.</p>
            </div>
          </div>
        </div>
      </StyledMain>
    </>
  );
};
export default FirstScreen;
