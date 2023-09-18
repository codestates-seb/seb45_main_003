import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { usePagination } from "../../hooks/usePagination";
import { defaultInstance } from "../../interceptors/interceptors";
import { translateProductStatus } from "../../util/productStatus";
import Button from "../common/Button";
import Empty from "../common/Empty";
import Error from "../common/Error";
import Loading from "../common/Loading";
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
  buyerReview: boolean;
  sellerReview: boolean;
}

const TradeContentContainer = styled.div`
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-width: calc(100% - 12rem);
  min-height: calc(100% - 0.75rem);
  .topContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1.25rem 0;
    border-bottom: 3px solid ${COLOR.darkText};
    .menuTitle {
      font-size: ${FONT_SIZE.font_32};
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .help {
      font-size: ${FONT_SIZE.font_14};
      color: ${COLOR.mediumText};
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
      aspect-ratio: 1/1;
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
  @media (max-width: 64rem) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    width: 100%;
  }
  @media (max-width: 48rem) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    .tradeListContainer .tradeContainer {
      align-items: flex-start;
      flex-direction: column;
      gap: 16px;

      .leftSection {
        align-items: flex-start;
        flex-direction: column;
        width: 100%;

        img {
          width: 100%;
        }
      }
    }
  }
`;

const TradeContent = (): JSX.Element => {
  const loginUserId = localStorage.getItem("Id");
  const location = useLocation();
  const Id = location.pathname.slice(8);
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const mypageMode = searchParams.get("menu");
  const ITEMS_PER_VIEW = 10;
  const {
    currentPage,
    totalPages,
    setTotalPages,
    setCurrentPage,
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
        setCurrentPage(Number(searchParams.get("page")) - 1);
      },
    },
  );
  const navigateProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  //리뷰 작성한적있으면 단건조회 페이지로 이동
  const navigateBuyReview = (productData: postContent) => {
    navigate(`/review/${Id}?productId=${productData.productId}`);
  };
  const navigateSellReview = (productData: postContent) => {
    navigate(`/review/${Id}?productId=${productData.productId}`);
  };
  return (
    <TradeContentContainer>
      <div className="topContainer">
        <p className="menuTitle">{mypageMode === "purchase" ? "구매내역" : "판매내역"}</p>
        <p className="help">후기수정은 프로필의 작성한 거래 후기 탭에서 가능합니다.</p>
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
                {Id === loginUserId && !el.buyerReview && (
                  <Button
                    type="button"
                    $text="후기 작성"
                    $design="yellow"
                    onClick={() => navigateBuyReview(el)}
                  />
                )}
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
                {Id === loginUserId && !el.sellerReview && (
                  <Button
                    type="button"
                    $text="후기"
                    $design="yellow"
                    onClick={() => navigateSellReview(el)}
                  />
                )}
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
