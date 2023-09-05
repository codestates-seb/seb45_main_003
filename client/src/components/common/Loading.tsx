import { useRecoilValue } from "recoil";
import styled from "styled-components";
import loadingImg from "../../assets/images/loading.gif";
import { headerHeightState } from "../../atoms/atoms";

type HeaderHeightProps = {
  height: number;
};

const StyledLoading = styled.section<HeaderHeightProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${(props) => props.height}px);

  img {
    margin: 0 0 ${(props) => props.height}px;
  }
`;

const Loading = (): JSX.Element => {
  const headerHeight = useRecoilValue(headerHeightState);

  return (
    <StyledLoading height={headerHeight}>
      <img src={loadingImg} alt="loading" />
    </StyledLoading>
  );
};

export default Loading;
