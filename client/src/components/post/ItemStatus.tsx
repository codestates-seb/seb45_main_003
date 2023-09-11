import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactComponent as DeleteIcon } from "../../assets/images/Close.svg";
import { ReactComponent as EditIcon } from "../../assets/images/Edit.svg";
import { ReactComponent as HeartIcon } from "../../assets/images/Heart.svg";
import { ReactComponent as ViewsIcon } from "../../assets/images/Views.svg";
import { loginState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { API_PATHS } from "../../constants/path";
import { AUCTION, FAIL, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { authInstance } from "../../interceptors/interceptors";
import { getUserId } from "../../util/auth";
import { formatTime } from "../../util/date";
import Button from "../common/Button";
import Modal from "../common/Modal";
import { CustomSwiperProps } from "../mainPage/carousel/Carousel";
import { ProductData } from "./List";

type ItemStatusProps = {
  data: ProductData;
};

const StyledItemStatus = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${COLOR.border};
  border-radius: 6px;
  gap: 3rem;
  overflow: hidden;

  .custom_swiper.swiper {
    max-width: 40rem;
    width: 50% !important;
    margin: 0;
  }

  .item_status {
    padding: 1.5rem 1.5rem 1.5rem 0;
    max-width: 27.5rem;
    width: 40%;

    & > div:not(:first-child) {
      padding: 1.5rem 0;
      border-top: 1px solid ${COLOR.border};
    }

    .title {
      display: flex;
      flex-flow: column;
      gap: 0.5rem;
    }

    .icon_box {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;

      & > div {
        gap: 0.25rem;
      }
    }
  }

  .auction {
    display: flex;
    flex-flow: column;
    gap: 1rem;
  }

  .price,
  .time {
    display: flex;
    flex-flow: row;
    gap: 2rem;

    & > span:first-child {
      width: 6.25rem;
    }
  }

  .add_wishlist,
  .current_price,
  .create_at,
  .buy_it_now_price {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;

    &.current_price {
      font-size: ${FONT_SIZE.font_20};
      font-weight: 600;
    }

    &.buy_it_now_price .price_number {
      font-weight: 600;
    }
  }

  img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    vertical-align: top;
  }

  .gray {
    color: ${COLOR.mediumText};
    display: flex;
    align-items: center;

    svg path {
      fill: ${COLOR.mediumText} !important;
    }
  }

  .date_or_status {
    margin: 1rem 0;
    font-size: ${FONT_SIZE.font_18};
  }

  .wishlist_box {
    display: flex;
    flex-flow: row;
    gap: 1rem;
  }

  .icon_box {
    display: flex;
    gap: 0.25rem;
  }

  .delete_icon {
    margin: 0 0 0 -0.25rem;
    cursor: pointer;
    justify-content: center;
  }
`;

const ItemStatus = ({ data }: ItemStatusProps) => {
  const [wishCount, setwishCount] = useState(0);
  const isLogin = useRecoilValue(loginState);
  const userid = getUserId();
  const navigate = useNavigate();
  const mutation = useMutation(async (id: object) => {
    await authInstance.post(API_PATHS.wishes.add, id);
  });
  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });

  useEffect(() => {
    if (data.wishCount) {
      setwishCount(data.wishCount);
    }
  }, []);

  const redirect = () => {
    navigate("/login");
  };

  const handleWishlist = async (id: number) => {
    try {
      await mutation.mutateAsync({ productId: id });
      setwishCount((prev) => prev + 1);
      setModalMessage({ title: "찜하기 성공", description: SUCCESS.wishlist });
    } catch (error) {
      setModalMessage({ title: "찜하기 실패", description: FAIL.wishlist });
    } finally {
      setIsOpen(!isOpen);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await authInstance.delete(API_PATHS.products.default(id));
      setModalMessage({ title: "상품 삭제 성공", description: SUCCESS.delete });
    } catch (error) {
      setModalMessage({ title: "상품 삭제 실패", description: FAIL.delete });
    }
  };

  //슬라이드 관련 설정
  SwiperCore.use([Pagination]);

  const swiperProps: CustomSwiperProps = {
    pagination: {
      clickable: true,
    },
  };

  return (
    <>
      <StyledItemStatus>
        <Swiper {...swiperProps} className="custom_swiper">
          {data.images.map((image) => {
            return (
              <SwiperSlide key={image.imageId}>
                <img src={image.path} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="item_status">
          <div className="title">
            <h1>{data.title}</h1>
            <div className="icon_box">
              {userid === data.memberId.toString() && (
                <>
                  <div className="gray">
                    <Link
                      to={{ pathname: "/create-post" }}
                      state={{ isUpdateMode: true, updateModeData: data }}
                    >
                      <EditIcon />
                    </Link>

                    <DeleteIcon
                      onClick={() => {
                        setIsOpen(true);
                        setModalMessage({
                          title: "상품 삭제",
                          description: "상품을 삭제하시겠습니까?",
                        });
                      }}
                    />
                  </div>
                  <div className="gray">
                    <ViewsIcon />
                    <span>{data.views}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="gray date_or_status">
            {data.auction
              ? data.productStatus === "BEFORE"
                ? formatTime(data.closedAt) + " 경매종료"
                : AUCTION.end
              : AUCTION.isnot}
          </p>
          <div className="add_wishlist">
            <div className="wishlist_box">
              <div className="gray icon_box">
                <HeartIcon />
                <span>{wishCount}</span>
              </div>
            </div>
            <Button
              $icon={<HeartIcon />}
              $text="찜"
              $design="yellow"
              type="button"
              onClick={() => {
                isLogin ? handleWishlist(data.productId) : redirect;
              }}
            />
          </div>
          {data.auction && (
            <div className="auction">
              <div className="current_price">
                <div className="price">
                  <span>현재 입찰가</span>
                  <span className="price_number">{data.currentAuctionPrice?.toLocaleString()}</span>
                </div>
                <Button
                  $text="입찰하기"
                  $design="black"
                  type="button"
                  onClick={isLogin ? undefined : redirect}
                />
              </div>
              <div className="create_at">
                <div className="time">
                  <span className="gray">경매 시작 시간</span>
                  <span className="price_number  gray">{formatTime(data.createAt)}</span>
                </div>
              </div>
              {/* <div className="price">
              <span className="gray">시작가</span>
              <span className="price_number  gray">
                {data.auction ? data.currentAuctionPrice : "-"}
              </span>
            </div> */}
            </div>
          )}

          <div className="buy_it_now_price">
            <div className="price">
              <span className="price_number_title gray">즉시 구매가</span>
              <span className="price_number">{data.immediatelyBuyPrice.toLocaleString()}</span>
            </div>
            <Button
              $text="즉시구매"
              $design="black"
              type="button"
              onClick={isLogin ? undefined : redirect}
            />
          </div>
        </div>
      </StyledItemStatus>

      <Modal {...{ isOpen, closeModal, toggleModal }}>
        <>
          <h4>{modalMessage.title}</h4>
          <p>{modalMessage.description}</p>
          <div className="button">
            {modalMessage.title === "상품 삭제" && (
              <>
                <Button
                  $design="outline"
                  $text="취소"
                  type="button"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
                <Button
                  $design="black"
                  $text="확인"
                  type="button"
                  onClick={() => {
                    handleDelete(data.productId);
                  }}
                />
              </>
            )}
            {modalMessage.title !== "상품 삭제" && (
              <Button
                $design="black"
                $text="확인"
                type="button"
                onClick={() => {
                  modalMessage.title === "상품 삭제 성공"
                    ? navigate("/product")
                    : setIsOpen(!isOpen);
                }}
              />
            )}
          </div>
        </>
      </Modal>
    </>
  );
};

export default ItemStatus;
