import styled from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import { ErrorProps } from "../../pages/ErrorIndication";

const StyledError = styled.section`
  text-align: center;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);

  h1 {
    font-size: 6rem;
    color: ${COLOR.primary};
  }

  p {
    font-size: ${FONT_SIZE.font_32};
    color: ${COLOR.mediumText};
    font-weight: 700;
  }
`;

const Error = ({ error }: ErrorProps) => {
  return (
    <StyledError>
      <h1>Not Found.</h1>
      <p>{(error as Error).message}</p>
    </StyledError>
  );
};

export default Error;
