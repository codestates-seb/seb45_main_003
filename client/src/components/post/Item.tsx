import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { API_PATHS } from "../../contstants/path";
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

  .flex {
    display: flex;
    flex-flow: row;
    gap: 1.5rem;
  }
`;

const Item = (): JSX.Element => {
  const location = useLocation();
  const itemNumber = location.pathname.slice(location.pathname.indexOf("t") + 2);
  const { isLoading, error, data } = useQuery("productData", async () => {
    const response = await axios.get(API_PATHS.products(itemNumber));
    return response.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error as Error) {
    return <ErrorIndication error={error} />;
  }

  console.log(data);

  return (
    <StyledItem>
      <ItemStatus data={data} />
      <section className="flex">
        <ItemDescription description={data.description} />
        <Seller memberId={data.memberId} />
      </section>
    </StyledItem>
  );
};

export default Item;
