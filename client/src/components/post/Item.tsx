import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { API_PATHS } from "../../constants/path";
import { authInstance } from "../../interceptors/interceptors";
import ErrorIndication from "../../pages/ErrorIndication";
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
  const itemNumber = location.pathname.split("/");

  const getData = async () => {
    const response = await authInstance.get(
      API_PATHS.products.default(itemNumber[itemNumber.length - 1]),
    );
    return response.data;
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
