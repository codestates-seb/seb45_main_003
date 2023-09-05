import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { headerHeightState } from "../../atoms/atoms";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";
import { ErrorProps } from "../../pages/ErrorIndication";

type HeaderHeightProps = {
  height: number;
};

const StyledError = styled.section<HeaderHeightProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  height: calc(100vh - ${(props) => props.height}px);

  h1 {
    font-size: 6rem;
    color: ${COLOR.primary};
  }

  p {
    margin: 0 0 ${(props) => props.height}px;
    font-size: ${FONT_SIZE.font_32};
    color: ${COLOR.mediumText};
    font-weight: 700;
  }
`;

const Error = ({ error }: ErrorProps) => {
  const headerHeight = useRecoilValue(headerHeightState);

  return (
    <StyledError height={headerHeight}>
      <h1>Not Found.</h1>
      <p>{(error as Error).message}</p>
    </StyledError>
  );
};

export default Error;
