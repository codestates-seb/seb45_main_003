import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { footerHeightState, headerHeightState } from "../atoms/atoms";
import { Footer } from "../components/common/Footer";
import Header from "../components/common/Header";

type HeightProps = {
  $header_footer_height: number;
};

const StyledMain = styled.main<HeightProps>`
  max-width: 1440px;
  width: calc(100% - 3rem);
  margin: 0 auto;
  min-height: calc(100vh - ${(props) => props.$header_footer_height}px);
  position: relative;

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

const Root = (): JSX.Element => {
  const headerHeight = useRecoilValue(headerHeightState);
  const footerHeight = useRecoilValue(footerHeightState);
  const headerfooterHeight = headerHeight + footerHeight;

  return (
    <>
      <Header />
      <StyledMain $header_footer_height={headerfooterHeight}>
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
};

export default Root;
