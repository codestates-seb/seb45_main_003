import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import Button from "../common/Button";
import { defaultInstance } from "../../interceptors/interceptors";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { profileTabState } from "../../atoms/atoms";

interface image {
  imageId: number;
  path: string;
}

interface products {
  productId: number;
  title: string;
  closedAt: string;
  images: image[];
  categoryId: number;
  productStatus: string;
  auction: boolean;
  immediatelyBuyPrice: number;
  currentAuctionPrice: number;
}

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
    .postImg {
      width: 6.25rem;
      height: 6.25rem;
    }
    .tradeContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      .leftSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
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
        align-items: flex-end;
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
  const mypageMode = useRecoilValue(profileTabState);
  const loginUserId = localStorage.getItem("Id");
  const location = useLocation();
  const Id = location.pathname.slice(9);
  const [salesList, setSalesList] = useState<products[]>([]);
  const [purchaseList, setPurchaseList] = useState<products[]>([]);
  const getPurchaseList = async () => {
    const res = await defaultInstance.get(`/members/${Id}/purchase`);
    setPurchaseList(res.data);
  };
  const getSalesList = async () => {
    const res = await defaultInstance.get(`/members/${Id}/sell`);
    setSalesList(res.data);
  };
  useEffect(() => {
    if (mypageMode === "sales") {
      getSalesList();
    }
    if (mypageMode === "purchase") {
      getPurchaseList();
    }
  }, []);
  return (
    <TradeContentContainer>
      <div className="topContainer">
        <p className="menuTitle">거래내역</p>
      </div>
      <div className="tradeListContainer">
        {mypageMode === "purchase" &&
          purchaseList.map((el) => (
            <div className="tradeContainer" key={el.productId}>
              <div className="leftSection">
                <img className="postImg" src={el.images[0].path}></img>
                <div className="infoContainer">
                  <div className="postTitle">{el.title}</div>
                  <div>{`${el.productStatus}`}</div>
                  <div>{`거래종료: ${el.closedAt}`}</div>
                </div>
              </div>
              <div className="rightSection">
                <div className="priceContainer">
                  {el.auction && (
                    <div className="priceLabel">
                      {`낙찰가`}
                      <span className="price">{`${el.currentAuctionPrice.toLocaleString(
                        "ko-KR",
                      )} 원`}</span>
                    </div>
                  )}
                  <div className="priceLabel">
                    {`즉시 구매가`}
                    <span className="price">{`${el.immediatelyBuyPrice.toLocaleString(
                      "ko-KR",
                    )} 원`}</span>
                  </div>
                </div>
                {Id === loginUserId && <Button type="button" $text="후기" $design="yellow" />}
              </div>
            </div>
          ))}
        {mypageMode === "sales" &&
          salesList.map((el) => (
            <div className="tradeContainer" key={el.productId}>
              <div className="leftSection">
                <img className="postImg" src={el.images[0].path}></img>
                <div className="infoContainer">
                  <div className="postTitle">{el.title}</div>
                  <div>{`${el.productStatus}`}</div>
                  <div>{`거래종료: ${el.closedAt}`}</div>
                </div>
              </div>
              <div className="rightSection">
                <div className="priceContainer">
                  {el.auction && (
                    <div className="priceLabel">
                      {`낙찰가`}
                      <span className="price">{`${el.currentAuctionPrice.toLocaleString(
                        "ko-KR",
                      )} 원`}</span>
                    </div>
                  )}
                  <div className="priceLabel">
                    {`즉시 구매가`}
                    <span className="price">{`${el.immediatelyBuyPrice.toLocaleString(
                      "ko-KR",
                    )} 원`}</span>
                  </div>
                </div>
                {Id === loginUserId && <Button type="button" $text="후기" $design="yellow" />}
              </div>
            </div>
          ))}
      </div>
      <div className="pagenation">페이지네이션</div>
    </TradeContentContainer>
  );
};

export default TradeContent;
