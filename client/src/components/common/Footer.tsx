import styled from "styled-components";

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
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

export const Footer = (): JSX.Element => {
  return (
    <>
      <FooterStyled>
        <footer>
          <div className="fotterText">CompanyName @ 202X. All rights reserved.</div>
        </footer>
      </FooterStyled>
    </>
  );
};
