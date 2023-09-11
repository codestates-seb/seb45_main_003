import styled from "styled-components";
import { COLOR } from "../../constants/color";

type ItemDescriptionProps = {
  description: string;
};

const StyledItemDescription = styled.section`
  width: 60%;

  h2 {
    border-bottom: 3px solid ${COLOR.darkText};
    padding: 0 0 1.25rem;
    margin: 0 0 1rem;
  }

  p {
    color: ${COLOR.mediumText};
  }
`;

const ItemDescription = ({ description }: ItemDescriptionProps) => {
  return (
    <StyledItemDescription>
      <h2>상품 설명</h2>
      <p>{description}</p>
    </StyledItemDescription>
  );
};

export default ItemDescription;
