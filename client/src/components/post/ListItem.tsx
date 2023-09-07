import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import { AUCTION } from "../../contstants/systemMessage";
import { ProductData } from "./List";

type ItemProps = {
  data: ProductData;
};

const StyledItem = styled.li`
  .title {
    padding: 1.5rem 1rem 1rem;
    border-bottom: 1px solid ${COLOR.border};

    h3 {
      margin: 0 0 0.5rem;
    }
  }

  .price {
    padding: 1rem;
    display: flex;
    flex-flow: column;
    gap: 0.75rem;

    .gray {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
    }

    .price_number {
      color: ${COLOR.darkText};
      font-size: ${FONT_SIZE.font_20};
    }
  }

  .gray {
    color: ${COLOR.mediumText};
  }
`;

const ListItem = (props: ItemProps): JSX.Element => {
  const { data } = props;

  const formatTime = (time: string | undefined) => {
    if (time) {
      return time.replace("T", " ");
    }
  };

  return (
    <StyledItem>
      <Link to={`/product/${data.productId}`}>
        <div className="title">
          <h3>{data.title}</h3>
          <p className="gray">{data.auction ? formatTime(data.closedAt) : AUCTION.isnot}</p>
        </div>
        <div className="price">
          <p className="gray">
            현재 입찰가
            <span className="price_number">{data.auction ? data.currentAuctionPrice : "-"}</span>
          </p>
          <p className="gray">
            즉시 구매가 <span className="price_number">{data.immediatelyBuyPrice}</span>
          </p>
        </div>
      </Link>
    </StyledItem>
  );
};
export default ListItem;
