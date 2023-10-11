//드롭다운 메뉴 아이템
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddButton from "../../assets/images/Add.png";

// import myImage from "../../../assets/images/Img1.png";

const ItemContainer = styled.div`
  font-family: Pretendard Variable;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  gap: 0.9375rem;
  width: 12.5rem;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 0.375rem;
`;

const Title = styled.div`
  display: flex;
  /* padding: 0rem 11.8125rem 0.375rem 0rem; */
  align-items: center;
  align-self: stretch;
  margin: 0 0 0.5rem;
  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 800;
  line-height: 2rem; /* 133.333% */
  letter-spacing: 0.2px;
`;

const ItemBox = styled.div`
  width: 13rem;
  max-width: 20.3125rem;
  height: 1.625rem;
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: row; /* background-color: aqua; */

  .addButton {
    height: 0.75rem;
    width: 0.75rem;
  }

  .Box {
    /* background-color: #b118df; */
    display: flex;
    width: 100%;
    flex-direction: row;
  }

  .category {
    justify-content: start;
    padding-left: 0.5rem;
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
`;

const ListBox = styled.div`
  width: 100%;
  gap: 0.75rem;
  display: flex;
  flex-direction: column;

  .ItemList {
    /* padding-bottom: 1rem; */
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
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
              <img className="addButton" src={AddButton} />
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
          <Title>상품 조회</Title>
          <Item key="거래 가능" categories="거래 가능" linkTo={`/available?type=all&page=1`} />
          <Item key="경매 중" categories="경매중" linkTo={`/available?type=auction&page=1`} />
          <Item
            key="즉시 구매"
            categories="즉시 구매"
            linkTo={`/available?type=immediatelyBuy&page=1`}
          />
          <Item key="거래 완료" categories="거래 완료" linkTo={`/completed?page=1`} />
        </ListBox>
      </ItemContainer>
    </>
  );
};

export default MenuItem;
