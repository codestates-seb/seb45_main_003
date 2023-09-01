import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/common/Header";

const StyledMain = styled.main`
  max-width: 1440px;
  width: calc(100% - 3rem);
  margin: 0 auto;

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </>
  );
};

export default Root;
