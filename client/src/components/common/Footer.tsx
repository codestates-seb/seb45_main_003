import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { footerHeightState } from "../../atoms/atoms";

const FooterStyled = styled.div`
  justify-content: center;
  align-items: center;
  color: var(--Text, #212121);
  padding: 1.5rem 0;

  /* Body/S */
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  background: #ffcd57;

  .fotterText {
    margin-left: 5rem;
  }
`;

export const Footer = (): JSX.Element => {
  //헤더 높이 구하기
  const footerRef = useRef<HTMLDivElement | null>(null);
  const setFooterHeight = useSetRecoilState(footerHeightState);

  useEffect(() => {
    if (footerRef.current !== null) {
      setFooterHeight(footerRef.current?.clientHeight);
    }
  }, [setFooterHeight]);

  return (
    <>
      <FooterStyled ref={footerRef}>
        <footer>
          <div className="fotterText">CompanyName @ 202X. All rights reserved.</div>
        </footer>
      </FooterStyled>
    </>
  );
};
