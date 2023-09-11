import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loginState } from "../../atoms/atoms";
import Loading from "../../components/common/Loading";
import { CATEGORY } from "../../constants/category";
import { COLOR } from "../../constants/color";
import { API_PATHS } from "../../constants/path";
import { usePagination } from "../../hooks/usePagination";
import ErrorIndication from "../../pages/ErrorIndication";
import Button from "../common/Button";
import Empty from "../common/Empty";
import Pagination from "../common/Pagination";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";

export type Data = {
  content: ProductData[];
  totalPages: number;
};

export type ProductData = {
  auction: boolean;
  productId: number;
  memberId: number;
  title: string;
  description: string;
  images: [
    {
      imageId: number;
      path: string;
    },
  ];
  currentAuctionPrice?: number;
  immediatelyBuyPrice: number;
  productStatus: string;
  categoryId: number;
  views: number;
  action: boolean;
  createAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  closedAt?: string;
  sellerName?: string;
  wishCount?: number;
  sellerTradeCount?: number;
  sellerWrittenReviewsCount?: number;
  sellerReceivedReviewsCount?: number;
};

const StyledList = styled.section`
  padding: 40px 0 4rem;

  .list_top {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li:not(.no_border) {
      box-sizing: border-box;
      width: calc(20% - 0.8rem);
      border: 1px solid ${COLOR.border};
      border-radius: 6px;
      overflow: hidden;
      list-style: none;
    }
  }

  .list_top_right {
    display: flex;
    flex-flow: row;
    gap: 0.75rem;
  }

  .empty_message {
    margin: 1rem 0 0;
  }
`;

const List = (): JSX.Element => {
  const ITEMS_PER_VIEW = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const {
    currentPage,
    totalPages,
    setTotalPages,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();

  const currentCategory = location.pathname.slice(9);
  const { isLoading, error, data, refetch } = useQuery<Data>(
    ["productList", currentPage],
    async () => {
      //쿼리스트링 불러오기
      const currentPageParam = parseInt(searchParams.get("page") || "1");
      const currentKeywordParam = searchParams.get("keyword") || "";
      const pageQueryParam = `page=${currentPageParam - 1}&size=${ITEMS_PER_VIEW}`;

      //전체 상품과 카테고리, 검색 여부 구분해서 호출
      let path = "";

      if (location.pathname === "/product") {
        path = API_PATHS.products.default("") + `?${pageQueryParam}`;
      } else if (location.pathname.includes("/search")) {
        path = API_PATHS.products.search(currentKeywordParam) + `&${pageQueryParam}`;
      } else {
        path = API_PATHS.products.category(CATEGORY[currentCategory].id) + `?${pageQueryParam}`;
      }

      const response = await axios.get(path);

      // 토탈 페이지 정보가 변경될 때만 갱신
      if (response.data?.totalPages !== totalPages) {
        setTotalPages(response.data?.totalPages);
      }

      currentKeywordParam === ""
        ? navigate(`?page=${currentPageParam}`)
        : navigate(`?page=${currentPageParam}&keyword=${currentKeywordParam}`);

      return response.data;
    },
    {
      staleTime: 60000,
    },
  );
  const isLogin = useRecoilValue(loginState);

  const printTitle = (path: string) => {
    if (path === "/product") {
      return "전체 상품";
    }

    if (path.includes("/search")) {
      return "검색 결과";
    }

    return CATEGORY[currentCategory].value;
  };

  //페이지넘버, url, 검색데이터가 변할때마다 데이터 갱신
  useEffect(() => {
    refetch();
  }, [location.pathname, location.search, currentPage]);

  if (isLoading) {
    return <Loading />;
  }

  if (error as Error) {
    return <ErrorIndication error={error} />;
  }

  return (
    <>
      <StyledList>
        <div className="list_top">
          <h1>{printTitle(location.pathname)}</h1>
          <div className="list_top_right">
            <SearchBar></SearchBar>
            {isLogin && (
              <Button
                onClick={() => {
                  navigate("/create-post");
                }}
                $design="black"
                type="button"
                $text="상품 등록하기"
              />
            )}
          </div>
        </div>

        <ul className="list">
          {data && data.content?.length > 0 ? (
            <>
              {data.content.map((el) => {
                return <ListItem key={el.productId} data={el} />;
              })}
            </>
          ) : (
            <li className="no_border">
              <Empty />
            </li>
          )}
        </ul>
        <Pagination
          {...{
            currentPage,
            totalPages,
            pageChangeHandler,
            prevPageHandler,
            nextPageHandler,
          }}
        />
      </StyledList>
    </>
  );
};
export default List;
