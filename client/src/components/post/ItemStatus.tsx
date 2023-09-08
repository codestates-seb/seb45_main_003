import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../../assets/images/Edit.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/Heart.svg";
import { loginState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { AUCTION } from "../../constants/systemMessage";
import { formatTime } from "../../util/date";
import Button from "../common/Button";
import { ProductData } from "./List";

type ItemStatusProps = {
  data: ProductData;
};

const StyledItemStatus = styled.section`
  padding: 3rem 0;
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  border: 1px solid ${COLOR.border};
  border-radius: 6px;
  gap: 3rem;

  .item_status {
    max-width: 27.5rem;
    width: 40%;

    & > div:not(:first-child) {
      padding: 1.5rem 0;
      border-top: 1px solid ${COLOR.border};
    }

    .title {
      display: flex;
      flex-flow: row;
      align-items: center;
      gap: 0.5rem;
    }
  }

  .auction {
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .price,
  .time {
    display: flex;
    flex-flow: row;
    gap: 2rem;

    & > span:first-child {
      width: 6.25rem;
    }
  }

  .add_wishlist,
  .current_price,
  .create_at,
  .buy_it_now_price {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;

    &.current_price {
      font-size: ${FONT_SIZE.font_20};
      font-weight: 600;
    }

    &.buy_it_now_price .price_number {
      font-weight: 600;
    }
  }

  img {
    max-width: 640px;
    width: 40%;
  }

  .gray {
    color: ${COLOR.mediumText};
    display: flex;
    align-items: center;

    svg path {
      fill: ${COLOR.mediumText} !important;
    }
  }

  .date_or_status {
    margin: 1rem 0;
    font-size: ${FONT_SIZE.font_18};
  }
`;

const ItemStatus = ({ data }: ItemStatusProps) => {
  const isLogin = useRecoilValue(loginState);
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/login");
  };

  return (
    <StyledItemStatus>
      <img src="" alt="" />
      <div className="item_status">
        <div className="title">
          <h1>{data.title}</h1>
          <Link to="/create-post">
            <EditIcon />
          </Link>
        </div>

        <p className="gray date_or_status">
          {data.auction
            ? data.productStatus === "BEFORE"
              ? formatTime(data.closedAt) + " 경매종료"
              : AUCTION.end
            : AUCTION.isnot}
        </p>
        <div className="add_wishlist">
          <span className="gray">
            <HeartIcon />
            숫자
          </span>
          <Button
            $icon={<HeartIcon />}
            $text="찜"
            $design="yellow"
            type="button"
            onClick={isLogin ? undefined : redirect}
          />
        </div>
        {data.auction && (
          <div className="auction">
            <div className="current_price">
              <div className="price">
                <span>현재 입찰가</span>
                <span className="price_number">{data.currentAuctionPrice?.toLocaleString()}</span>
              </div>
              <Button
                $text="입찰하기"
                $design="black"
                type="button"
                onClick={isLogin ? undefined : redirect}
              />
            </div>
            <div className="create_at">
              <div className="time">
                <span className="gray">경매 시작 시간</span>
                <span className="price_number  gray">{formatTime(data.createAt)}</span>
              </div>
            </div>
            {/* <div className="price">
              <span className="gray">시작가</span>
              <span className="price_number  gray">
                {data.auction ? data.currentAuctionPrice : "-"}
              </span>
            </div> */}
          </div>
        )}

        <div className="buy_it_now_price">
          <div className="price">
            <span className="price_number_title gray">즉시 구매가</span>
            <span className="price_number">{data.immediatelyBuyPrice.toLocaleString()}</span>
          </div>
          <Button
            $text="즉시구매"
            $design="black"
            type="button"
            onClick={isLogin ? undefined : redirect}
          />
        </div>
      </div>
    </StyledItemStatus>
  );
};

export default ItemStatus;
