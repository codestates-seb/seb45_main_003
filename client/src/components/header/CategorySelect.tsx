import StorefrontIcon from "@mui/icons-material/Storefront";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CATEGORY } from "../../constants/category";
import { COLOR } from "../../constants/color";
import { useMobile } from "../../hooks/useMobile";

const StyledCategorySelect = styled.div`
  background: ${COLOR.primary};
  .select_wrapper {
    width: calc(100% - 3rem);
    max-width: 90rem;
    margin: 0 auto;
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  .select {
    width: 30%;

    select {
      width: 100%;
    }
  }
  p {
    font-weight: 600;
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 64rem) {
    .select_wrapper {
      width: calc(100% - 2rem);
    }
    .select {
      width: calc(100% - 2rem);
    }
  }
`;

const CategorySelect = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobile();
  const initialCategory = "카테고리 선택";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  return (
    <StyledCategorySelect>
      <div className="select_wrapper">
        <p>
          <StorefrontIcon />
          {isMobile ? "" : "경매중인 상품을 확인해보세요"}
        </p>
        <div className="custom_select">
          <select
            onChange={(event) => {
              const value = event?.target.value;

              switch (value) {
                case initialCategory:
                  break;
                default:
                  setSelectedCategory(initialCategory);
                  navigate(CATEGORY[value]?.path);
                  break;
              }
            }}
            value={selectedCategory}
          >
            <option defaultValue={initialCategory}>{initialCategory}</option>
            {Object.keys(CATEGORY).map((category) => {
              return (
                <option value={category} key={category}>
                  {CATEGORY[category].value}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </StyledCategorySelect>
  );
};

export default CategorySelect;
