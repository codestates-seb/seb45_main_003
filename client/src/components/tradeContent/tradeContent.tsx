import { styled } from "styled-components";
import { FONT_SIZE } from "../../contstants/font";
import { COLOR } from "../../contstants/color";
import Button from "../common/Button";

const TradeContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: calc(100% - 14rem);
  .topContainer {
    padding: 1.25rem 1rem;
    border-bottom: 3px solid ${COLOR.darkText};
    .menuTitle {
      font-size: ${FONT_SIZE.font_32};
      font-weight: bold;
    }
  }
  .tradeListContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .tradeContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      .leftSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        .infoContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: ${FONT_SIZE.font_16};
          color: ${COLOR.mediumText};
          .postTitle {
            color: ${COLOR.darkText};
            font-size: ${FONT_SIZE.font_20};
            font-weight: bold;
          }
        }
      }
      .rightSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
        .priceContainer {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 0.625rem;
          font-size: ${FONT_SIZE.font_16};
          color: ${COLOR.mediumText};
          .priceLabel {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
          }
          .price {
            color: ${COLOR.darkText};
            font-weight: bold;
          }
        }
      }
    }
  }
  .pagenation {
    padding: 1.5rem 0;
  }
`;

const TradeContent = (): JSX.Element => {
  return (
    <TradeContentContainer>
      <div className="topContainer">
        <p className="menuTitle">거래내역</p>
      </div>
      <div className="tradeListContainer">
        <div className="tradeContainer">
          <div className="leftSection">
            <img></img>
            <div className="infoContainer">
              <div className="postTitle">글제목</div>
              <div>{`거래 상태 거래종료 시간`}</div>
            </div>
          </div>
          <div className="rightSection">
            <div className="priceContainer">
              <div className="priceLabel">
                {`낙찰가`}
                <span className="price">{` 원`}</span>
              </div>
              <div className="priceLabel">
                {`즉시 구매가`}
                <span className="price">{` 원`}</span>
              </div>
            </div>
            <Button type="button" text="후기 작성" design="yellow" />
          </div>
        </div>
      </div>
      <div className="pagenation">페이지네이션</div>
    </TradeContentContainer>
  );
};

export default TradeContent;
