import styled from "styled-components";
import loadingImg from "../../assets/images/Loading.gif";

const StyledLoading = styled.section`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Loading = (): JSX.Element => {
  return (
    <StyledLoading>
      <img src={loadingImg} alt="loading" />
    </StyledLoading>
  );
};

export default Loading;
