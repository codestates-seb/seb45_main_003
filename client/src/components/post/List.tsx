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
import ErrorIndication from "../../pages/ErrorIndication";
import Button from "../common/Button";
import Empty from "../common/Empty";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";

export type ProductData = {
  auction: boolean;
  productId: number;
  memberId: number;
  title: string;
  description: string;
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
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    li:not(.no_border) {
      width: calc(25% - 0.875rem);
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory = location.pathname.slice(9);
  const path =
    location.pathname === "/product"
      ? API_PATHS.products.default("")
      : API_PATHS.products.category(CATEGORY[currentCategory].id);
  const { isLoading, error, data, refetch } = useQuery<ProductData[]>("productList", async () => {
    const response = await axios.get(path);
    return response.data.content;
  });
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    refetch();
  }, [location.pathname]);

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
          {data && data.length > 0 ? (
            <>
              {data.map((el) => {
                return <ListItem key={el.productId} data={el} />;
              })}
            </>
          ) : (
            <li className="no_border">
              <Empty />
            </li>
          )}
        </ul>
      </StyledList>
    </>
  );
};
export default List;
