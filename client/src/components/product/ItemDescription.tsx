import styled from "styled-components";
import { COLOR } from "../../constants/color";
import { formatDescription } from "../../util/text";

type ItemDescriptionProps = {
  description: string;
};

const StyledItemDescription = styled.section`
  width: 70%;

  h2 {
    border-bottom: 3px solid ${COLOR.darkText};
    padding: 0 0 1.25rem;
    margin: 0 0 1rem;
  }

  p {
    color: ${COLOR.mediumText};
  }

  @media (max-width: 64rem) {
    width: 100%;
  }
`;

const ItemDescription = ({ description }: ItemDescriptionProps) => {
  return (
    <StyledItemDescription>
      <h2>상품 설명</h2>
      <p>{formatDescription(description)}</p>
    </StyledItemDescription>
  );
};

export default ItemDescription;
