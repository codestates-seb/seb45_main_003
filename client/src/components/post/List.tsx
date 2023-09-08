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

  .empty_message {
    margin: 1rem 0 0;
  }
`;

const List = (): JSX.Element => {
  const ITEMS_PER_VIEW = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentPage,
    totalPages,
    setTotalPages,
    setCurrentPage,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();

  const currentCategory = location.pathname.slice(9);
  const path =
    location.pathname === "/product"
      ? API_PATHS.products.default("") + `?page=${currentPage}&size=${ITEMS_PER_VIEW}`
      : API_PATHS.products.category(CATEGORY[currentCategory].id) +
        `?page=${currentPage}&size=${ITEMS_PER_VIEW}`;

  const { isLoading, error, data, refetch } = useQuery<Data>("productList", async () => {
    const response = await axios.get(path);
    return response.data;
  });
  const isLogin = useRecoilValue(loginState);

  //갱신된 데이터로 토탈페이지 갱신
  useEffect(() => {
    if (data) {
      setTotalPages(data?.totalPages);
    }
  }, [data]);

  //토탈페이지 갱신 시 현재 페이지 0으로 초기화
  useEffect(() => {
    setCurrentPage(0);
  }, [totalPages]);

  //페이지넘버와 url이 변할때마다 데이터 갱신
  useEffect(() => {
    refetch();
  }, [location.pathname, currentPage]);

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
          <h1>
            {location.pathname === "/product" ? "전체 상품" : CATEGORY[currentCategory].value}
          </h1>
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
              ></Button>
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
