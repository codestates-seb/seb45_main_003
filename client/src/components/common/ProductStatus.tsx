import { AUCTION } from "../../constants/systemMessage";
import { formatTime } from "../../util/date";
import { ProductData } from "../productList/List";
import ProductStatusIcon from "./ProductStatusIcon";

type ProductStatusProps = {
  data: ProductData;
};

const ProductStatus = ({ data }: ProductStatusProps) => {
  return (
    <>
      {data.auction ? (
        data.productStatus === "BEFORE" ? (
          <>
            <p>{formatTime(data.closedAt) + "까지"}</p>
            <ProductStatusIcon $status="inProgress" $auction={true} />
          </>
        ) : (
          <>
            <p>{AUCTION.end}</p>
            <ProductStatusIcon $status="end" $auction={true} />
          </>
        )
      ) : data.productStatus === "BEFORE" ? (
        <>
          <p>{AUCTION.isnot}</p>
          <ProductStatusIcon $status="inProgress" $auction={false} />
        </>
      ) : (
        <>
          <p>{AUCTION.end}</p>
          <ProductStatusIcon $status="end" $auction={false} />
        </>
      )}
    </>
  );
};

export default ProductStatus;
