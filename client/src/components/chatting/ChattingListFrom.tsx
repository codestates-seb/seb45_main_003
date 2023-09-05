import React from "react";
import { styled } from "styled-components";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchComponent from "./SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import ChattingListData from "./ChattingListData";

interface ChattingListProps {
  imgSrc: string;
}

const Container = styled.div`
  display: flex;
  width: 13.875rem;
  height: 43.6875rem;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  background-color: #2077c4;
  text-align: center;

  border-radius: 0.375rem;
  border: 1px solid var(--cool-gray-20, #dde1e6);
  background: var(--default-white, #fff);

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
        /* background-color: #ffb300; // 원하는 호버 색상 */
        color: #ffb300; // 텍스트의 호버 색상 (필요하다면)
      }
    }
  }
  .SearchBar {
    display: flex;
    max-width: 11.875rem;
    max-height: 3rem;
    width: calc(100%);
    background-color: aqua;
    align-items: center;
    background-color: white;
    padding: 12px 16px;
    gap: 8px;
    background: var(--cool-gray-10, #f2f4f8);
    border-radius: 0.375rem;
  }
  .data {
    width: calc(100%);
  }
`;

const ChattingListFrom = ({ imgSrc }: ChattingListProps): JSX.Element => {
  return (
    <>
      <Container>
        <div className="ProfileBox">
          <img className="ProfileImg" src={imgSrc} alt="" />
          <NotificationsIcon className="Icon" />
        </div>
        <div className="SearchBar">
          <SearchIcon /> <SearchComponent />
        </div>
        <div className="data">
          <ChattingListData />
        </div>
      </Container>
    </>
  );
};
export default ChattingListFrom;
