import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { API_PATHS } from "../../constants/path";
import { FAIL } from "../../constants/systemMessage";
import { authInstance } from "../../interceptors/interceptors";
import ErrorIndication from "../../pages/ErrorIndication";
import { plus5Percent } from "../../util/number";
import Loading from "../common/Loading";
import ItemDescription from "./ItemDescription";
import ItemStatus from "./ItemStatus";
import Seller from "./Seller";

const StyledItem = styled.article`
  padding: 2.5rem 0;
  display: flex;
  flex-flow: column;
  gap: 1.5rem;

  .bottom_item {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    padding: 1.5rem 0 2.5rem;

    .bottom_item {
      flex-flow: column;
    }
  }
`;

const Item = (): JSX.Element => {
  const location = useLocation();
  const idArr = location.pathname.split("/");
  const productId = idArr[idArr.length - 1];

  const getData = async () => {
    window.scrollTo(0, 0);
    const response = await authInstance.get(API_PATHS.products.default(productId));

    const currentAuctionPrice = response.data.currentAuctionPrice;
    const data = {
      ...response.data,
      minBidPrice: plus5Percent(currentAuctionPrice),
    };

    if (data.deletedAt) {
      throw new Error(FAIL.deleted);
    }

    return data;
  };

  const { isLoading, error, data } = useQuery(["productData", location], getData, {
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error as Error) {
    return <ErrorIndication error={error} />;
  }

  return (
    <StyledItem>
      <ItemStatus data={data} />
      <section className="bottom_item">
        <ItemDescription description={data.description} />
        <Seller data={data} />
      </section>
    </StyledItem>
  );
};

export default Item;
