import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { usePagination } from "../../hooks/usePagination";
import { defaultInstance } from "../../interceptors/interceptors";
import Empty from "../common/Empty";
import Loading from "../common/Loading";
import Pagination from "../common/Pagination";

type Data = {
  content: products[];
  totalPages: number;
};
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
  immediatelyBuyPrice: number;
  currentAuctionPrice: number;
}

const AuctionContentContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  min-width: calc(100% - 12rem);
  min-height: calc(100% - 0.75rem);
  .topContainer {
    padding: 1.25rem 1rem;
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
      .postImg {
        width: 6.25rem;
        height: 6.25rem;
      }
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
            cursor: pointer;
          }
        }
      }
      .priceContainer {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        gap: 0.625rem;
        font-size: ${FONT_SIZE.font_16};
        color: ${COLOR.mediumText};
        .priceLabel {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
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
`;

const AuctionContent = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const Id = Number(location.pathname.slice(8));
  const searchParams = new URLSearchParams(location.search);
  const ITEMS_PER_VIEW = 10;
  const {
    currentPage,
    totalPages,
    setTotalPages,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();
  const getAuctionlist = async () => {
    const currentPageParam = parseInt(searchParams.get("page") || "1");
    const pageQueryParam = `page=${currentPageParam - 1}&size=${ITEMS_PER_VIEW}`;
    const res = await defaultInstance.get(`/members/${Id}/bids?${pageQueryParam}`);
    navigate(`?menu=auction&page=${currentPageParam}`);
    return res.data;
  };
  const navigateProduct = (productId: number) => {
    navigate(`/product/${productId}`);
  };
  const { isLoading, data } = useQuery<Data>(["auctionList"], getAuctionlist, {
    onSuccess: (data) => setTotalPages(data.totalPages),
    refetchInterval: 30000,
  });
  const auctionList = data?.content;

  return (
    <AuctionContentContainer>
      <div className="topContainer">
        <p className="menuTitle">참여중인 경매 현황</p>
      </div>
      <div className="auctionListContainer">
        {isLoading && <Loading />}
        {auctionList?.map((el) => (
          <div className="auctionContainer" key={el.productId}>
            <div className="leftSection">
              <img src={el.images[0].path} className="postImg"></img>
              <div className="infoContainer">
                <div className="postTitle" onClick={() => navigateProduct(el.productId)}>
                  {el.title}
                </div>
                <div>{`경매 종료 시간: ${el.closedAt}`}</div>
              </div>
            </div>
            <div className="priceContainer">
              <div className="priceLabel">
                {`현재 입찰가`}
                <span className="price">{`${el.currentAuctionPrice.toLocaleString(
                  "ko-KR",
                )} 원`}</span>
              </div>
              <div className="priceLabel">
                {`즉시 구매가`}
                <span className="price">{`${el.immediatelyBuyPrice.toLocaleString(
                  "ko-KR",
                )} 원`}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {auctionList?.length === 0 && (
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
    </AuctionContentContainer>
  );
};

export default AuctionContent;
