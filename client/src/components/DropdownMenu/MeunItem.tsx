import styled from "styled-components";
import { ReactComponent as AddButton } from "../../assets/images/Add.svg";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 21.5625rem;
  padding: 0.625rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  border-radius: 5px;
  background-color: red;
`;

const ItemImg = styled.img`
  border-radius: 10px;
  background:
    url("client/src/assets/images/Img1.jpeg"),
    lightgray 50% / cover no-repeat;
  width: 21.5625rem;
  height: 13rem;
`;

const Title = styled.div`
  display: flex;
  padding: 0rem 11.8125rem 0.375rem 0rem;
  align-items: center;
  align-self: stretch;

  color: var(--text-color, #252b42);
  font-family: Pretendard Variable;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem; /* 133.333% */
  letter-spacing: 0.2px;
`;

const ItemBox = styled.div`
  height: 26px;
  align-self: stretch;
`;
const ListBox = styled.div``;

const Item = (): JSX.Element => {
  return (
    <>
      <ItemBox>
        <AddButton />
      </ItemBox>
    </>
  );
};

const MenuItem = (): JSX.Element => {
  return (
    <>
      <ItemContainer>
        <ItemImg />
        <ListBox>
          <Title>Accessories</Title>
          <ul>
            <li>
              <Item />
            </li>
            <li>
              <Item />
            </li>
            <li>
              <Item />
            </li>
            <li>
              <Item />
            </li>
          </ul>
        </ListBox>
      </ItemContainer>
    </>
  );
};

export default MenuItem;
