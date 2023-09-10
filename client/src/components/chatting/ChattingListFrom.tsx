import React from "react";
import { styled } from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChattingListData from "./ChattingListData";
import { COLOR } from "../../constants/color";

interface ChattingListProps {
  imgSrc: string;
}

const Container = styled.div`
  display: flex;
  width: 13.875rem;
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
    justify-content: space-between;
    align-items: center;
    .ProfileImg {
      width: 3rem;
      height: 3rem;
      flex-shrink: 0;
      border-radius: 3rem;
      border: 1px solid var(--muted-color, #bdbdbd);
      background: lightgray 90% / cover no-repeat;
      margin: 0 1.4375rem;
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
    margin-bottom: 1.875rem;

    display: flex;
    flex-direction: row;
    width: 85%;
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
  /* @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  } */
`;

const ChattingListFrom = ({ imgSrc }: ChattingListProps): JSX.Element => {
  return (
    <>
      <Container>
        <div className="ProfileBox">
          <img className="ProfileImg" src={imgSrc} alt="" />
          <NotificationsIcon className="Icon" />
        </div>

        <div className="data">
          <ChattingListData />
        </div>
      </Container>
    </>
  );
};
export default ChattingListFrom;
