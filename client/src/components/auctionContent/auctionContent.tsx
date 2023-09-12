import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";

const AuctionContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-width: calc(100% - 18rem);
  .topContainer {
    padding: 1.25rem 1rem;
    border-bottom: 3px solid ${COLOR.darkText};
    .menuTitle {
      font-size: ${FONT_SIZE.font_32};
      font-weight: bold;
    }
  }
  .empty {
    position: relative;
    height: 25rem;
  }
  .auctionListContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .auctionContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      .rightSection {
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
      .priceContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
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
  .pagenation {
    padding: 1.5rem 0;
  }
`;

const AuctionContent = (): JSX.Element => {
  return (
    <AuctionContentContainer>
      <div className="topContainer">
        <p className="menuTitle">참여중인 경매 현황</p>
      </div>
      <div className="auctionListContainer">
        <div className="auctionContainer">
          <div className="rightSection">
            <img></img>
            <div className="infoContainer">
              <div className="postTitle">글제목</div>
              <div>{`경매 종료 시간 `}</div>
            </div>
          </div>
          <div className="priceContainer">
            <div className="priceLabel">
              {`현재 입찰가`}
              <span className="price">{` 원`}</span>
            </div>
            <div className="priceLabel">
              {`즉시 구매가`}
              <span className="price">{` 원`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pagenation">페이지네이션</div>
    </AuctionContentContainer>
  );
};

export default AuctionContent;
