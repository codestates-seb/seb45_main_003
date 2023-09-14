import styled from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";

type ProductStatusProps = {
  $status: string;
  $auction: boolean;
};

const StyledProductStatus = styled.span<ProductStatusProps>`
  margin: 0.5rem 0 0;
  display: inline-block;
  padding: 0.25rem;
  border-radius: 3px;
  font-size: ${FONT_SIZE.font_14};
  font-weight: 600;

  background: ${(props) => {
    switch (props.$status) {
      case "inProgress":
        return COLOR.valid;
      default:
        return COLOR.gray_500;
    }
  }};

  color: #fff;
`;

const ProductStatusIcon = ({ ...props }: ProductStatusProps) => {
  return (
    <StyledProductStatus {...props}>
      {props.$auction
        ? props.$status === "inProgress"
          ? "경매 중"
          : "경매 종료"
        : props.$status === "inProgress"
        ? "판매 중"
        : "판매 종료"}
    </StyledProductStatus>
  );
};

export default ProductStatusIcon;
