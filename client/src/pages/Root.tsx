import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { footerHeightState, headerHeightState } from "../atoms/atoms";
import { Footer } from "../components/common/Footer";
import Header from "../components/common/Header";
import { useValidateToken } from "../hooks/useValidateToken";

type HeightProps = {
  $header_footer_height: number;
  $ismain: boolean;
};

const StyledMain = styled.main<HeightProps>`
  max-width: ${(props) => (props.$ismain ? " " : "90rem")};
  width: ${(props) => (props.$ismain ? " " : "calc(100% - 3rem)")};
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
  const location = useLocation();
  const { validateAccessToken, accessToken } = useValidateToken();

  useEffect(() => {
    if (accessToken) {
      validateAccessToken();
    }
  }, [location.pathname]);

  return (
    <>
      <Header />
      <StyledMain
        $ismain={location.pathname === "/" ? true : false}
        $header_footer_height={headerfooterHeight}
      >
        <Outlet />
      </StyledMain>
      <Footer />
    </>
  );
};

export default Root;
