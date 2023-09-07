import styled from "styled-components";
import { ReactComponent as EmptyImage } from "../../assets/images/Empty.svg";

const StyledEmpty = styled.section`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const Empty = () => {
  return (
    <StyledEmpty>
      <EmptyImage />
      <p className="empty_message">목록이 없습니다.</p>
    </StyledEmpty>
  );
};

export default Empty;
