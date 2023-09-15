import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import Button from "../common/Button";
import { defaultInstance } from "../../interceptors/interceptors";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { profileTabState } from "../../atoms/atoms";
import Empty from "../common/Empty";
import { useQuery } from "react-query";
import Error from "../common/Error";
import Loading from "../common/Loading";
import { translateProductStatus } from "../../util/productStatus";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";

interface image {
  imageId: number;
  path: string;
}
interface Data {
  content: postContent[];
  totalPages: number;
}
interface postContent {
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
  justify-content: flex-start;
  align-items: stretch;
  min-width: calc(100% - 14rem);
  min-height: calc(100% - 0.75rem);
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
  const Id = location.pathname.slice(8);
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const ITEMS_PER_VIEW = 10;
  const {
    currentPage,
    totalPages,
    setTotalPages,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();
  const {
    isLoading,
    isError,
    data: result,
  } = useQuery<Data>(
    ["tradeData", { currentPage, mypageMode }],
    async () => {
      const currentPageParam = parseInt(searchParams.get("page") || "1");
      const pageQueryParam = `page=${currentPageParam - 1}&size=${ITEMS_PER_VIEW}`;
      if (mypageMode === "purchase") {
        const res = await defaultInstance.get(`/members/${Id}/purchase?${pageQueryParam}`);
        navigate(`?menu=${mypageMode}&page=${currentPageParam}`);
        return res.data;
      } else if (mypageMode === "sales") {
        const res = await defaultInstance.get(`/members/${Id}/sell?${pageQueryParam}`);
        navigate(`?menu=${mypageMode}&page=${currentPageParam}`);
        return res.data;
      }
    },
    {
      onSuccess: (data) => {
        setTotalPages(data.totalPages);
      },
    },
  );
  const navigateProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <TradeContentContainer>
      <div className="topContainer">
        <p className="menuTitle">거래내역</p>
      </div>
      <div className="tradeListContainer">
        {isLoading && <Loading />}
        {isError && <Error error={Error} />}
        {mypageMode === "purchase" &&
          result?.content.map((el) => (
            <div className="tradeContainer" key={el.productId}>
              <div className="leftSection">
                <img className="postImg" src={el.images[0].path}></img>
                <div className="infoContainer">
                  <div className="postTitle" onClick={() => navigateProduct(el.productId)}>
                    {el.title}
                  </div>
                  <div>{`${translateProductStatus(el.productStatus)}`}</div>
                  {el.auction ? <div>{`경매종료: ${el.closedAt}`}</div> : <div>즉시 구매 상품</div>}
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
          result?.content.map((el) => (
            <div className="tradeContainer" key={el.productId}>
              <div className="leftSection">
                <img className="postImg" src={el.images[0].path}></img>
                <div className="infoContainer">
                  <div className="postTitle" onClick={() => navigateProduct(el.productId)}>
                    {el.title}
                  </div>
                  <div>{`${translateProductStatus(el.productStatus)}`}</div>
                  {el.auction ? <div>{`경매종료: ${el.closedAt}`}</div> : <div>즉시 구매 상품</div>}
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
      {result?.content.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      <Pagination
        {...{
          currentPage,
          totalPages,
          pageChangeHandler,
          prevPageHandler,
          nextPageHandler,
        }}
      />
    </TradeContentContainer>
  );
};

export default TradeContent;
