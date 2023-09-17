import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { footerHeightState } from "../../atoms/atoms";
import { FONT_SIZE } from "../../constants/font";

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
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .partTitle {
      font-size: ${FONT_SIZE.font_20};
      font-weight: bold;
    }
    .teammateContainer {
      display: flex;
      flex-direction: row;
      .teammateLink {
        font-size: ${FONT_SIZE.font_20};
        padding: 0.5rem;
      }
    }
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
          <div className="fotterText">
            <p className="partTitle">팀원 깃허브 링크</p>
            <p className="partTitle">BE</p>
            <div className="teammateContainer">
              <a className="teammateLink" href="https://github.com/C5ng">
                공대표
              </a>
              <a className="teammateLink" href="https://github.com/Jeonni">
                이지연
              </a>
              <a className="teammateLink" href="https://github.com/Jung-seo">
                서정욱
              </a>
            </div>
            <p className="partTitle">FE</p>
            <div className="teammateContainer">
              <a className="teammateLink" href="https://github.com/sintobury">
                허찬욱
              </a>
              <a className="teammateLink" href="https://github.com/eg1377">
                박다해
              </a>
              <a className="teammateLink" href="https://github.com/pearl-sea">
                박진주
              </a>
            </div>
          </div>
        </footer>
      </FooterStyled>
    </>
  );
};
