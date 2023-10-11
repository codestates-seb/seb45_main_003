import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import ProductStatus from "../common/ProductStatus";
import { ProductData } from "./List";

type ItemProps = {
  data: ProductData;
};

const StyledItem = styled.li`
  .images {
    img {
      width: 100%;
      object-fit: cover;
      aspect-ratio: 1/1;
    }
  }

  .title {
    padding: 1.5rem 1rem 1rem;
    border-bottom: 1px solid ${COLOR.border};

    h3 {
      margin: 0 0 0.5rem;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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

  .highlight {
    color: ${COLOR.primary};
  }
`;

const ListItem = (props: ItemProps): JSX.Element => {
  const { data } = props;

  return (
    <StyledItem>
      <Link to={`/product/${data.productId}`}>
        <div className="images">
          <img src={data.images[0]?.path} alt="썸네일 이미지" />
        </div>
        <div className="title">
          <h3>{data.title}</h3>
          <div className="gray">
            <ProductStatus data={data} />
          </div>
        </div>
        <div className="price">
          <p className="gray">
            <span>현재 입찰가</span>
            <span className="price_number">
              {data.auction ? data.currentAuctionPrice?.toLocaleString() + "원" : "-"}
            </span>
          </p>
          <p className="gray">
            <span>즉시 구매가</span>
            <span className="price_number">{data.immediatelyBuyPrice.toLocaleString() + "원"}</span>
          </p>
        </div>
      </Link>
    </StyledItem>
  );
};
export default ListItem;
