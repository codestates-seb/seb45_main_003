import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { footerHeightState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";

const FooterStyled = styled.footer`
  background: ${COLOR.gray_800};
  color: ${COLOR.lightText};
  padding: 1.5rem 0;

  .footer_wrapper,
  .copyright {
    max-width: 90rem;
    width: calc(100% - 3rem);
    margin: 0 auto;
    display: flex;
    flex-flow: row;
    gap: 1.5rem;
  }

  .copyright {
    margin: 1.5rem auto 0;
    border-top: 1px solid ${COLOR.gray_600};
    padding: 1rem 0 0;
  }

  .part {
    width: 20%;
    display: flex;
    flex-flow: column;

    .title {
      font-size: ${FONT_SIZE.font_18};
      font-weight: 700;
      margin: 0 0 0.75rem;
    }

    .margin {
      font-weight: 400;
      margin: 0 0 1.5rem;
    }

    > p {
      font-weight: 700;
      margin: 0 0 0.5rem;
    }
  }

  .team {
    display: flex;
    flex-flow: row;
    gap: 0.75rem;

    &:nth-of-type(1) {
      margin: 0 0 0.5rem;
    }
  }

  @media (max-width: 64rem) {
    .footer_wrapper,
    .copyright {
      flex-flow: column;
      gap: 0;
    }

    .part {
      width: 100%;
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
        <div className="footer_wrapper">
          <div className="part">
            <p className="title">Team Name</p>
            <p className="margin">내 동년배들 다 코딩한다.</p>
            <p className="title">Project Term</p>
            <p className="margin">2023-08-24 ~ 09-22</p>
          </div>

          <div className="part">
            <p className="title">GitHub</p>

            <div className="team">
              <p>BE</p>
              <a href="https://github.com/C5ng">공대표</a>
              <a href="https://github.com/Jeonni">이지연</a>
              <a href="https://github.com/Jung-seo">서정욱</a>
            </div>

            <div className="team">
              <p>FE</p>
              <a href="https://github.com/sintobury">허찬욱</a>
              <a href="https://github.com/eg1377">박다해</a>
              <a href="https://github.com/pearl-sea">박진주</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>WonPrice @ 2023. All rights reserved.</p>
        </div>
      </FooterStyled>
    </>
  );
};
