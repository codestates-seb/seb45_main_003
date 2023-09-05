import { useRecoilValue } from "recoil";
import styled from "styled-components";
import loadingImg from "../../assets/images/loading.gif";
import { footerHeightState, headerHeightState } from "../../atoms/atoms";

type HeightProps = {
  $headerheight: number;
  $footerheight: number;
};

const StyledLoading = styled.section<HeightProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(
    100vh - ${(props) => props.$headerheight}px - ${(props) => props.$footerheight}px
  );

  img {
    margin: 0 0 ${(props) => props.$headerheight}px;
  }
`;

const Loading = (): JSX.Element => {
  const headerHeight = useRecoilValue(headerHeightState);
  const footerHeight = useRecoilValue(footerHeightState);

  return (
    <StyledLoading $headerheight={headerHeight} $footerheight={footerHeight}>
      <img src={loadingImg} alt="loading" />
    </StyledLoading>
  );
};

export default Loading;
