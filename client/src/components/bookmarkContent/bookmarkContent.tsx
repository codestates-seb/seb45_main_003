import { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import Button from "../common/Button";
import { authInstance, defaultInstance } from "../../interceptors/interceptors";
import { useLocation, useNavigate } from "react-router-dom";
import { findCategory } from "../../util/category";
import Empty from "../common/Empty";
import Loading from "../common/Loading";
import Error from "../common/Error";
import { useQuery, useQueryClient, useMutation } from "react-query";
//dto 정해지면 추가
interface image {
  imageId: number;
  path: string;
}

interface products {
  productId: number;
  title: string;
  closedAt: string;
  images: image[];
  categoryId: number;
  productStatus: string;
  auction: boolean;
  immediatelyBuyPrice: number;
  currentAuctionPrice: number;
}

type bookmark = {
  wishId: number;
  creadtedAt: string;
  productId: string;
  productResponseDto: products;
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
  justify-content: flex-start;
  align-items: stretch;
  min-width: 650px;
  min-height: calc(100% - 0.75rem);
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
  .empty {
    position: relative;
    height: 25rem;
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
      align-items: flex-end;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      .postImg {
        width: 6.25rem;
        height: 6.25rem;
      }
      .leftSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 1rem;
        .postInfo {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: flex-end;
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
              cursor: pointer;
            }
          }
        }
      }
      .rightSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
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
    setValue("checkboxes", Array(bookmarkList?.length).fill(checked));
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
  const navigate = useNavigate();
  const location = useLocation();
  const Id = location.pathname.slice(9);
  const loginUserId = localStorage.getItem("Id");
  // 추후 Id는 주소에 있는 id로 가져오게 변경해야함
  const [changedCheckboxes, setChangedCheckboxes] = useState<boolean[]>([]);
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: bookmarkList,
  } = useQuery<bookmark[]>(
    "bookmark",
    async () => {
      const res = await defaultInstance.get(`/members/${Id}/wishes`);
      if (changedCheckboxes.some((el) => el === true)) {
        setValue("checkboxes", changedCheckboxes);
      } else {
        setValue("checkboxes", Array(bookmarkList?.length).fill(false));
      }
      return res.data;
    },
    { refetchInterval: 30000, refetchIntervalInBackground: true },
  );
  console.log(selectAll, checkboxes, bookmarkList);
  const bookmarkMutation = useMutation(
    async (wishId: number) => {
      const deletedIndex = bookmarkList?.findIndex((el) => el.wishId === wishId);
      const checkedlist = checkboxes.filter((el, idx) => idx !== deletedIndex);
      setChangedCheckboxes(checkedlist);
      await authInstance.delete(`/wishes/${wishId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("bookmark");
        setValue("checkboxes", changedCheckboxes);
      },
    },
  );
  return (
    <BookmarkContentContainer onSubmit={handleSubmit(sendBookmarkList)}>
      <div className="topContainer">
        <p className="menuTitle">찜 목록</p>
        {loginUserId === Id && (
          <div className="selectButtonContainer">
            <input
              type="checkbox"
              className="checkbox"
              id="selectAll"
              {...register("selectAll")}
              onChange={(e) => handleSelectAll(e.target.checked)}
            ></input>
            <p className="optionName">전체 선택</p>
            <Button type="submit" $text="선택 취소" $design="yellow" />
          </div>
        )}
      </div>
      <div className="bookmarkListContainer">
        {isLoading && <Loading />}
        {isError && <Error />}
        {bookmarkList &&
          bookmarkList.map((el, index: number) => (
            <div className="bookmarkContainer" key={el.productId}>
              <div className="leftSection">
                {loginUserId === Id && (
                  <input
                    type="checkbox"
                    className="checkbox"
                    {...register(`checkboxes.${index}`)}
                    onChange={(e) => handleCheckBox(index, e.currentTarget.checked)}
                    key={el.productId}
                  ></input>
                )}
                <div className="postInfo">
                  <img className="postImg" src={el.productResponseDto.images[0].path}></img>
                  <div className="infoContainer">
                    <div
                      className="postTitle"
                      onClick={() =>
                        navigate(
                          `/product/${findCategory(el.productResponseDto.categoryId)}/${
                            el.productId
                          }`,
                        )
                      }
                    >
                      {el.productResponseDto.title}
                    </div>
                    {el.productResponseDto.auction ? (
                      <div>{`거래 마감시간: ${el.productResponseDto.closedAt} `}</div>
                    ) : (
                      <div>즉시 구매 상품</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="rightSection">
                <div className="priceContainer">
                  {el.productResponseDto.auction && (
                    <div className="priceLabel">
                      {`현재 입찰가`}
                      <span className="price">{`${el.productResponseDto.currentAuctionPrice.toLocaleString(
                        "ko-KR",
                      )} 원`}</span>
                    </div>
                  )}
                  <div className="priceLabel">
                    {`즉시 구매가`}
                    <span className="price">{`${el.productResponseDto.immediatelyBuyPrice.toLocaleString(
                      "ko-KR",
                    )} 원`}</span>
                  </div>
                </div>
                {loginUserId === Id && (
                  <Button
                    type="button"
                    $text="찜 취소"
                    $design="yellow"
                    onClick={() => bookmarkMutation.mutateAsync(el.wishId)}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
      {bookmarkList && bookmarkList.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      <div className="pagenation">페이지네이션</div>
    </BookmarkContentContainer>
  );
};

export default BookmarkContent;
