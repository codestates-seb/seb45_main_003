import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NoProfileImage from "../../assets/images/NoProfileImage.png";
import Button from "../../components/common/Button";
import { COLOR } from "../../constants/color";
import { ProductData } from "./List";

type SellerProps = {
  data: ProductData;
};

const StyledSeller = styled.section`
  border: 1px solid ${COLOR.border};
  border-radius: 6px;
  width: 40%;
  max-width: 520px;
  padding: 1.25rem;

  h2 {
    padding: 0 0 0.75rem;
    margin: 0 0 1.5rem;
    border-bottom: 1px solid ${COLOR.border};
  }

  .seller {
    display: flex;
    flex-flow: column;
    gap: 2.25rem;

    & > div {
      gap: 1.25rem;
      display: flex;
      flex-flow: row;
      align-items: center;
    }
  }

  .profile_image {
    display: flex;
  }

  .seller_name {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 0.25rem;
  }

  .seller_info > div {
    display: flex;
    flex-flow: row;
    gap: 0.25rem;
    color: ${COLOR.mediumText};

    &:not(:last-child) {
      margin: 0 0 0.125rem;
    }

    .line {
      color: ${COLOR.border};
    }
  }

  button {
    padding: 1.25rem 0;
  }

  @media (max-width: 64rem) {
    width: 100%;
    max-width: unset;
  }
`;

const Seller = (props: SellerProps): JSX.Element => {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <StyledSeller>
      <h2>판매자 정보</h2>
      <div className="seller">
        <div>
          <div className="profile_image">
            <img src={NoProfileImage} alt="프로필 이미지" />
          </div>
          <div className="seller_info">
            <p className="seller_name">{data.sellerName}</p>
            <div>
              <span>판매한 상품</span>
              <span>{data.sellerTradeCount}</span>
            </div>
            <div>
              <span>작성한 후기</span>
              <span>{data.sellerWrittenReviewsCount}</span>
              <span className="line">|</span>
              <span>받은 후기</span>
              <span>{data.sellerReceivedReviewsCount}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            navigate(`/member/${data.memberId}`);
          }}
          $text="프로필 방문하기"
          $design="outline"
          type="button"
        />
      </div>
    </StyledSeller>
  );
};

export default Seller;
