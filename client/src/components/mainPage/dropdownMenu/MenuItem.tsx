//드롭다운 메뉴 아이템
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as AddButton } from "../../../assets/images/Add.svg";
import myImage from "../../../assets/images/Img1.png";

const ItemContainer = styled.div`
  font-family: Pretendard Variable;
  display: flex;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-width: 22rem;
  min-width: 240px; // 여기만
  width: calc(100% - 3rem);
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  border-radius: 0.375rem;

  .ItemImg {
    border-radius: 10px;
    size: fit;
  }
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
  max-width: 20.3125rem;
  height: 1.625rem;
  align-self: stretch;
  width: 100%;
  display: flex;
  flex-direction: row;
  /* background-color: aqua; */

  .Box {
    /* background-color: #b118df; */
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: end;
  }

  .category {
    justify-content: start;
    width: 90%;
    padding-left: 0.9375rem;
    /* background-color: #237979; */

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: 0.0125rem;
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  .count {
    /* background-color: #b0ee35; */
    width: 10%;
    text-align: end;

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: 0.0125rem;
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
    padding-bottom: 1rem;
    &:hover {
      color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const CountBox = styled.div`
  height: 1.625rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.5rem; /* 171.429% */
  letter-spacing: 0.2px;

  .count {
    /* background-color: #b0ee35; */
    width: 10%;
    text-align: end;

    color: var(--second-text-color, #737373);
    font-family: Pretendard Variable;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.5rem; /* 171.429% */
    letter-spacing: 0.0125rem;
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;
interface ItemProps {
  categories?: string;
  count?: string;
  allCount?: string;
}

const Item: React.FunctionComponent<ItemProps> = (props) => {
  return (
    <>
      <ItemBox>
        <AddButton />
        <div className="Box">
          <div className="category">{props.categories}</div>
          <div className="count">{props.count}</div>
        </div>
      </ItemBox>
    </>
  );
};

const MenuItem: React.FunctionComponent<ItemProps> = (props) => {
  return (
    <>
      <ItemContainer>
        <img className="ItemImg" src={myImage} />
        <ListBox>
          <Title>Shop By Department</Title>
          <ul>
            <li className="ItemList">
              <Link to="/product/books">
                <Item categories="Books" count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/electronics">
                <Item categories="Electronics " count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/clothing">
                <Item categories="Clothing" count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/food">
                <Item categories="Food" count="1" />
              </Link>
            </li>
            <li className="ItemList">
              <Link to="/product/cosmetic">
                <Item categories="Cosmetic" count="1" />
              </Link>
            </li>
          </ul>
          <div className="ViewAll">
            <CountBox>
              <Link to="/product">
                <div>View all</div>
              </Link>
              <div className="count">{props.allCount}0</div>
            </CountBox>
          </div>
        </ListBox>
      </ItemContainer>
    </>
  );
};

export default MenuItem;
