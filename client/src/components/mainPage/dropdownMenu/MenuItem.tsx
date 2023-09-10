//드롭다운 메뉴 아이템
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as AddButton } from "../../../assets/images/Add.svg";

// import myImage from "../../../assets/images/Img1.png";

const ItemContainer = styled.div`
  font-family: Pretendard Variable;
  display: flex;
  padding: 1.5rem 0.9375rem;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem;
  max-width: 18.75rem;
  min-width: 15rem; // 여기만
  width: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 0.375rem;
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const Title = styled.div`
  display: flex;
  /* padding: 0rem 11.8125rem 0.375rem 0rem; */
  align-items: center;
  align-self: stretch;

  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: 2rem; /* 133.333% */
  letter-spacing: 0.2px;

  @media (max-width: 56.25rem) {
    width: calc(100% - 2rem);
  }
`;

const ItemBox = styled.div`
  width: 13rem;
  max-width: 20.3125rem;
  height: 1.625rem;
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: row; /* background-color: aqua; */

  .Box {
    /* background-color: #b118df; */
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  .category {
    justify-content: start;
    width: 90%;
    padding-left: 0.9375rem;
    /* background-color: #237979; */

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: 0.0125rem;
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const ListBox = styled.div`
  gap: 1.25rem;
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);

  .ItemList {
    /* padding-bottom: 1rem; */
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;
// 버튼 호버 스타일
const StyledLink = styled(Link)`
  &:hover {
    /* background-color: #ffb300; // 원하는 호버 색상 */
    color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
  }
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .Text {
    justify-content: center;
    flex: 1;
    padding-left: 1.4375rem;
  }
`;

interface ItemProps {
  linkTo: string;
  categories: string;
}

const Item: React.FC<ItemProps> = ({ categories, linkTo }) => {
  return (
    <>
      <ul>
        <li className="ItemList">
          <ItemBox>
            <StyledLink className="Button" to={linkTo}>
              <AddButton />
              <div className="category">{categories}</div> {/* 텍스트 렌더링 */}
            </StyledLink>
          </ItemBox>
        </li>
      </ul>
    </>
  );
};

const MenuItem = () => {
  return (
    <>
      <ItemContainer>
        <ListBox>
          <Title>Product Category</Title>
          <Item categories="Books" linkTo="/product/books" />
          <Item categories="Electronics" linkTo="/product/books" />
          <Item categories="Clothing" linkTo="/product/clothing" />
          <Item categories="Food" linkTo="/product/food" />
          <Item categories="Cosmetic" linkTo="/product/cosmetic" />
          <Item categories="View All" linkTo="/product" />
        </ListBox>
      </ItemContainer>
    </>
  );
};

export default MenuItem;
