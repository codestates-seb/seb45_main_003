import { styled } from "styled-components";
import { COLOR } from "../../../constants/color";
import ChattingListData from "./ChattingListData";

const Container = styled.div`
  display: flex;
  height: 47.0625rem;
  min-height: 43.6875rem;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  text-align: center;

  border-radius: 0.375rem;
  border: 1px solid var(--cool-gray-20, #dde1e6);

  .ProfileBox {
    display: flex;
    flex-direction: row;
    width: calc(100%);
    /* background-color: aqua; */
    padding-bottom: 1rem;
    justify-content: space-between;
    align-items: center;
    .ProfileImg {
      height: 4rem;
      width: 4rem;
      flex-shrink: 0;
      border-radius: 3rem;
      border: 1px solid var(--muted-color, #bdbdbd);
      background: lightgray 90% / cover no-repeat;
      margin: 0 0.75rem;
      object-fit: cover;
    }
    .Icon {
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.75rem;
      margin: 0 1.4375rem;

      &:hover {
        color: #ffb300; // 텍스트의 호버 색상
      }
    }
  }
  .SearchBar {
    margin-top: 0.625rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
    /* max-width: 11.875rem; */
    max-height: 3rem;
    align-items: center;
    padding: 0.65rem 1rem;
    gap: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid var(--cool-gray-20, #dde1e6);

    &:hover,
    &:focus {
      border: 1px solid ${COLOR.primary};
      outline: 1px solid ${COLOR.primary};
    }
  }
  .data {
    width: 100%;
  }
`;

const ChattingListFrom = (): JSX.Element => {
  return (
    <>
      <Container>
        <div className="data">
          <ChattingListData />
        </div>
      </Container>
    </>
  );
};
export default ChattingListFrom;
