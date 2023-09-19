import styled from "styled-components";
import EmptyImage from "../../assets/images/Empty.svg";

const StyledEmpty = styled.div`
  .border {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    height: 10rem;

    img {
      width: 10rem;
    }
  }
`;

const Empty = () => {
  return (
    <StyledEmpty>
      <div className="border">
        <img src={EmptyImage} />
        <p className="empty_message">목록이 없습니다.</p>
      </div>
    </StyledEmpty>
  );
};

export default Empty;
