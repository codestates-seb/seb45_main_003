import { StyledMain } from "../../../pages/main/MainStyle";
import EffectCard from "../effectCards/EffectCards";

const FirstScreen = (): JSX.Element => {
  return (
    <>
      <StyledMain>
        <div className="EffectCard">
          <EffectCard />
          {/* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드*/}
          <div className="TextBox1">
            <div className="GrandTitle">
              원하는 상품을 <br /> Won하는 Price에
            </div>
            <div className="Text2">
              뭐라 적어야 하긴 하는데 <br />
              뭐라고 적어야 할지생각이 안남 <br /> 뭔가 엄청난 소개 문구
            </div>
          </div>
        </div>
      </StyledMain>
    </>
  );
};
export default FirstScreen;
