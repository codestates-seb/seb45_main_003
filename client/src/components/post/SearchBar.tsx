import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/Search.svg";
import { loginState } from "../../atoms/atoms";

const StyledSearchBar = styled.div`
  position: relative;

  input {
    padding: 0.5rem 0.75rem 0.5rem 2.5rem !important;
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translatey(-50%);
    left: 0.75rem;
  }
`;

const SearchBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const isLogin = useRecoilValue(loginState);

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/search?page=1&keyword=${inputValue}`);
    }
  };

  return (
    <StyledSearchBar className={isLogin ? "login" : ""}>
      <SearchIcon />
      <input
        onKeyUp={handleSubmit}
        onChange={(event) => {
          setInputValue(event?.target.value);
        }}
        type="text"
        placeholder="Search"
      />
    </StyledSearchBar>
  );
};
export default SearchBar;
