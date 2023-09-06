import { styled } from "styled-components";
import { FONT_SIZE } from "../../contstants/font";
import { COLOR } from "../../contstants/color";
import Button from "../common/Button";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
//dto 정해지면 추가

type bookmark = {
  wishId: number;
  creadtedAt: string;
  productId: string;
};

type checkInputType = {
  selectAll: boolean;
  checkboxes: boolean[];
  index: number;
};

const BookmarkContentContainer = styled.form`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: calc(100% - 14rem);
  .checkbox {
    width: 18px;
    height: 18px;
  }
  .topContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1rem;
    border-bottom: 3px solid ${COLOR.darkText};
    .menuTitle {
      font-size: ${FONT_SIZE.font_32};
      font-weight: bold;
    }
    .selectButtonContainer {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      font-size: ${FONT_SIZE.font_16};
      color: ${COLOR.mediumText};
    }
  }
  .bookmarkListContainer {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .bookmarkContainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      .leftSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        .infoContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          gap: 0.625rem;
          font-size: ${FONT_SIZE.font_16};
          color: ${COLOR.mediumText};
          .postTitle {
            color: ${COLOR.darkText};
            font-size: ${FONT_SIZE.font_20};
            font-weight: bold;
          }
        }
      }
      .rightSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
        .priceContainer {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          gap: 0.625rem;
          font-size: ${FONT_SIZE.font_16};
          color: ${COLOR.mediumText};
          .priceLabel {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            gap: 0.5rem;
          }
          .price {
            color: ${COLOR.darkText};
            font-weight: bold;
          }
        }
      }
    }
  }
  .pagenation {
    padding: 1.5rem 0;
  }
`;

const BookmarkContent = (): JSX.Element => {
  const { register, handleSubmit, watch, setValue } = useForm<checkInputType>();
  const checkboxes = watch("checkboxes", []);
  const selectAll = watch("selectAll", false);
  const handleSelectAll = (checked: boolean) => {
    setValue("selectAll", checked);
    setValue("checkboxes", Array(checkboxes.length).fill(checked));
  };
  const handleCheckBox = (index: number, checked: boolean) => {
    const checkedBoxes = [...checkboxes];
    checkedBoxes[index] = checked;
    const checkedAll = checkedBoxes.every(Boolean);
    setValue("selectAll", checkedAll);
    setValue("checkboxes", checkedBoxes);
  };
  const sendBookmarkList = (data: checkInputType) => {
    console.log(data);
  };
  const [bookmarklist, setBookmarklist] = useState<bookmark[]>([]);
  const getData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/wishes`);
    setBookmarklist(res.data);
  };
  useEffect(() => {
    getData();
  });
  return (
    <BookmarkContentContainer onSubmit={handleSubmit(sendBookmarkList)}>
      <div className="topContainer">
        <p className="menuTitle">찜 목록</p>
        <div className="selectButtonContainer">
          <input
            type="checkbox"
            className="checkbox"
            checked={selectAll}
            id="selectAll"
            {...register("selectAll")}
            onChange={() => handleSelectAll(selectAll)}
          ></input>
          <p className="optionName">전체 선택</p>
          <Button type="button" $text="선택 취소" $design="yellow" />
        </div>
      </div>
      <div className="bookmarkListContainer">
        {bookmarklist &&
          bookmarklist.map((el, index: number) => (
            <div className="bookmarkContainer">
              <div className="leftSection">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkboxes[index]}
                  {...register(`checkboxes.${el.wishId}`)}
                  onChange={() => handleCheckBox(index, checkboxes[index])}
                ></input>
                <img></img>
                <div className="infoContainer">
                  <div className="postTitle">글제목</div>
                  <div>{`남은 시간 `}</div>
                </div>
              </div>
              <div className="rightSection">
                <div className="priceContainer">
                  <div className="priceLabel">
                    {`현재 입찰가`}
                    <span className="price">{` 원`}</span>
                  </div>
                  <div className="priceLabel">
                    {`즉시 구매가`}
                    <span className="price">{` 원`}</span>
                  </div>
                </div>
                <Button type="button" $text="찜 취소" $design="yellow" />
              </div>
            </div>
          ))}
      </div>
      <div className="pagenation">페이지네이션</div>
    </BookmarkContentContainer>
  );
};

export default BookmarkContent;
