import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { loginState } from "../../atoms/atoms";

const StyledSearchBar = styled.div`
  width: 35%;
  position: relative;
  display: inline-block;

  input {
    width: 100%;
    padding: 0.5rem 2.5rem 0.5rem 0.75rem !important;
  }

  .search_icon {
    position: absolute;
    top: 50%;
    transform: translatey(-50%);
    right: 0.75rem;
    display: flex;
  }

  @media (max-width: 64rem) {
    width: 50%;
  }

  @media (max-width: 30rem) {
    width: 100%;
  }
`;

const SearchBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const isLogin = useRecoilValue(loginState);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (inputValue.replace(" ", "").length < 1) {
      return;
    }

    if (event.key === "Enter") {
      navigate(`/search?page=1&keyword=${inputValue}`);
    }
  };

  const handleMouseClick = () => {
    if (inputValue.replace(" ", "").length < 1) {
      return;
    }

    navigate(`/search?page=1&keyword=${inputValue}`);
  };

  return (
    <StyledSearchBar className={isLogin ? "login" : ""}>
      <input
        onKeyUp={handleKeyUp}
        onChange={(event) => {
          setInputValue(event?.target.value);
        }}
        type="text"
        placeholder="Search"
      />
      <div className="search_icon" onClick={handleMouseClick}>
        <SearchIcon />
      </div>
    </StyledSearchBar>
  );
};
export default SearchBar;
