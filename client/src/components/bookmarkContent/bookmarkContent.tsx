// import { useState } from "react";
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
import { translateProductStatus } from "../../util/productStatus";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../common/Pagination";
//dto 정해지면 추가
type Data = {
  content: bookmark[];
  totalPages: number;
};
// 배포서버에 페이지네이션 쿼리 적용되면 추후 수정필요
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
  productId: number;
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
  min-width: calc(100% - 18rem);
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
      justify-content: flex-start;
      align-items: flex-end;
      border-bottom: 1px solid ${COLOR.border};
      padding: 1rem 0;
      gap: 1rem;
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
        }
      }
      .rightSection {
        min-width: calc(100% - 134px);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        gap: 1rem;
        .postTitle {
          color: ${COLOR.darkText};
          font-size: ${FONT_SIZE.font_20};
          font-weight: bold;
          cursor: pointer;
        }
        .exceptTitle {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: stretch;
          gap: 0.5rem;
          .infoContainer {
            width: 230px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 0.625rem;
            font-size: ${FONT_SIZE.font_16};
            color: ${COLOR.mediumText};
          }
          .exceptTitleRight {
            width: calc(100% - 238px);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            .priceContainer {
              max-width: calc(100% - 66.23px);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
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
    }
  }
  .pagenation {
    padding: 1.5rem 0;
  }
`;

const BookmarkContent = (): JSX.Element => {
  const { register, handleSubmit, watch, setValue, getValues } = useForm<checkInputType>();
  const checkboxes = watch("checkboxes", []);
  // const selectAll = watch("selectAll", false);
  //전체 선택 함수
  const handleSelectAll = (checked: boolean) => {
    setValue("selectAll", checked);
    setValue("checkboxes", Array(bookmarkList?.content.length).fill(checked));
  };
  //체크박스 관리 함수
  const handleCheckBox = (index: number, checked: boolean) => {
    const checkedBoxes = [...checkboxes];
    checkedBoxes[index] = checked;
    const checkedAll = checkedBoxes.every(Boolean);
    setValue("selectAll", checkedAll);
    setValue("checkboxes", checkedBoxes);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const Id = location.pathname.slice(8);
  const loginUserId = localStorage.getItem("Id");
  //체크박스를 사용항 찜취소시에 체크박스 상태들을 저장해둘 상태
  // const [changedCheckboxes, setChangedCheckboxes] = useState<boolean[]>([]);
  const queryClient = useQueryClient();
  const searchParams = new URLSearchParams(location.search);
  const ITEMS_PER_VIEW = 10;
  const {
    currentPage,
    totalPages,
    setTotalPages,
    pageChangeHandler,
    prevPageHandler,
    nextPageHandler,
  } = usePagination();
  const {
    isLoading,
    isError,
    data: bookmarkList,
  } = useQuery<Data>(
    ["bookmark", { currentPage }],
    async () => {
      const currentPageParam = parseInt(searchParams.get("page") || "1");
      const pageQueryParam = `page=${currentPageParam - 1}&size=${ITEMS_PER_VIEW}`;
      const res = await defaultInstance.get(`/members/${Id}/wishes?${pageQueryParam}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      navigate(`?menu=bookmark&page=${currentPageParam}`);
      return res.data;
    },
    {
      refetchInterval: 30000,
      refetchIntervalInBackground: true,
      onSuccess: (data) => {
        // if (changedCheckboxes.length !== 0) {
        //   setValue("checkboxes", changedCheckboxes);
        //   setChangedCheckboxes([]);
        // }
        setValue("checkboxes", Array(data.content.length).fill(false));
        setTotalPages(data.totalPages);
        console.log(checkboxes, getValues());
      },
    },
  );
  //체크박스를 선택한적 있으면 해당체크박스를 refetch해도 유지, refetch는 30초마다
  //추후 체크박스 수정하게 되면 손볼것
  // 체크박스는 찜 개별취소버튼 클릭시 풀립니다.
  // 못고침
  // 찜취소버튼으로 취소요청하는 함수
  const bookmarkMutation = useMutation(
    async (productId: number) => {
      // const deletedIndex = bookmarkList?.content.findIndex((el) => el.productId === productId);
      // const checkedlist = checkboxes.filter((el, idx) => idx !== deletedIndex);
      // setChangedCheckboxes(checkedlist);
      // console.log(`changedcheckboxes : ${checkedlist}`);
      await authInstance.delete(`/wishes/${productId}`);
    },
    {
      onSuccess: () => {
        // setValue("checkboxes", changedCheckboxes);
        queryClient.invalidateQueries("bookmark");
      },
    },
  );
  //선택한 찜목록 취소 요청함수
  const sendBookmarkMutation = useMutation(
    async (data: checkInputType) => {
      console.log(data.checkboxes);
      await authInstance.patch(`/wishes`, { checkBox: data.checkboxes, currentPage: currentPage });
    },
    {
      onSuccess: () => {
        // setChangedCheckboxes([]);
        // setValue("checkboxes", []);
        queryClient.invalidateQueries("bookmark");
      },
    },
  );
  return (
    <BookmarkContentContainer
      onSubmit={handleSubmit(() => sendBookmarkMutation.mutateAsync(getValues()))}
    >
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
        {bookmarkList?.content.map((el, index: number) => (
          <div className="bookmarkContainer" key={el.productId}>
            <div className="leftSection">
              {loginUserId === Id && (
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkboxes[index] || false}
                  {...register(`checkboxes.${index}`)}
                  onChange={(e) => handleCheckBox(index, e.currentTarget.checked)}
                  key={el.productId}
                ></input>
              )}
              <div className="postInfo">
                <img className="postImg" src={el.productResponseDto.images[0].path}></img>
              </div>
            </div>
            <div className="rightSection">
              <div
                className="postTitle"
                onClick={() =>
                  navigate(
                    `/product/${findCategory(el.productResponseDto.categoryId)}/${el.productId}`,
                  )
                }
              >
                {el.productResponseDto.title}
              </div>
              <div className="exceptTitle">
                <div className="infoContainer">
                  <div>{translateProductStatus(el.productResponseDto.productStatus)}</div>
                  {el.productResponseDto.auction ? (
                    <div>{`거래 마감시간: ${el.productResponseDto.closedAt} `}</div>
                  ) : (
                    <div>즉시 구매 상품</div>
                  )}
                </div>
                <div className="exceptTitleRight">
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
                      $text="취소"
                      $design="yellow"
                      onClick={() => bookmarkMutation.mutateAsync(el.productId)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {bookmarkList?.content.length === 0 && (
        <div className="empty">
          <Empty />
        </div>
      )}
      <Pagination
        {...{
          currentPage,
          totalPages,
          pageChangeHandler,
          prevPageHandler,
          nextPageHandler,
        }}
      />
    </BookmarkContentContainer>
  );
};

export default BookmarkContent;
