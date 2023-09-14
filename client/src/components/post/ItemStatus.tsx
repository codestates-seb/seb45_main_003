import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Webstomp, { Client } from "webstomp-client";
import { ReactComponent as EditIcon } from "../../assets/images/Edit.svg";
import { ReactComponent as ViewsIcon } from "../../assets/images/Views.svg";
import { loginState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { AUCTION, MIN, REQUIRED, SUCCESS } from "../../constants/systemMessage";
import { useModal } from "../../hooks/useModal";
import { getUserId } from "../../util/auth";
import { formatTime } from "../../util/date";
import { allowOnlyNumber } from "../../util/number";
import Button from "../common/Button";
import Modal from "../common/Modal";
import TextInput from "../common/TextInput";
import { CustomSwiperProps } from "../mainPage/carousel/Carousel";
import DeleteButton from "./DeleteButton";
import { ProductData } from "./List";
import WishCount from "./WishCount";

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

  @media (max-width: 30rem) {
    .current_price,
    .buy_it_now_price {
      flex-flow: column;
      align-items: flex-start;
      gap: 1rem;

      button {
        width: 100%;
      }
    }
  }

  @media (max-width: 64rem) {
    flex-flow: column;
    gap: 1.5rem;

    .custom_swiper.swiper {
      max-width: unset;
      width: 100% !important;
    }

    .item_status {
      max-width: unset;
      width: 100%;
      box-sizing: border-box;
      padding: 01rem;
    }

    .price,
    .time {
      gap: 0.75rem;

      & > span:first-child {
        width: unset;
      }
    }
  }
`;

const ItemStatus = ({ data }: ItemStatusProps) => {
  const [currentAuctionPrice, setCurrentAuctionPrice] = useState(0);
  const [minValue, setMinValue] = useState(currentAuctionPrice);

  const isLogin = useRecoilValue(loginState);
  const userid = getUserId();
  const navigate = useNavigate();

  const { isOpen, setIsOpen, closeModal, toggleModal } = useModal();
  const [modalMessage, setModalMessage] = useState({ title: "", description: "" });
  const { register, handleSubmit, formState, reset } = useForm<FieldValues>();

  const [stompClient, setStompClient] = useState<Client | null>(null);

  //소켓 연결
  useEffect(() => {
    if (data && data.currentAuctionPrice) {
      setCurrentAuctionPrice(data.currentAuctionPrice);
    }

    if (data) {
      const socket = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL as string);
      const stomp = Webstomp.over(socket);

      stomp.connect({}, () => {
        setStompClient(stomp);
      });

      return () => {
        stomp.disconnect(() => {});
      };
    }
  }, []);

  //소켓 구독
  useEffect(() => {
    if (stompClient && data) {
      stompClient.subscribe(`/topic/bid/${data.productId}`, (message) => {
        const newCurrentAuctionPrice = JSON.parse(message.body).body.currentAuctionPrice;
        setCurrentAuctionPrice(newCurrentAuctionPrice);
        reset();
      });
    }
  }, [stompClient, data]);

  //최소가 변경
  useEffect(() => {
    setMinValue(currentAuctionPrice + Math.ceil((currentAuctionPrice * 0.05) / 10) * 10);
  }, [currentAuctionPrice]);

  //데이터 전송
  const sendWebSocketMessage = async (bidData: FieldValues) => {
    if (stompClient) {
      stompClient.send(`/app/bid/${data.productId}`, JSON.stringify(bidData));
    }
    return data;
  };
  const { mutate, error } = useMutation(sendWebSocketMessage);

  const openBidModal = () => {
    setIsOpen(true);
    setModalMessage({ title: "상품 입찰", description: AUCTION.bid });
  };

  const onSubmit = (data: FieldValues) => {
    const bidData = {
      memberId: Number(userid),
      currentAuctionPrice: Number(data.currentAuctionPrice),
    };

    mutate(bidData);

    if (error) {
      setModalMessage({ title: "상품 입찰 실패", description: SUCCESS.bid });
    } else {
      setCurrentAuctionPrice(bidData.currentAuctionPrice);
      setModalMessage({ title: "상품 입찰 성공", description: SUCCESS.bid });
      reset();
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
              {isLogin && Number(userid) === data.memberId && (
                <div className="gray">
                  <Link
                    to={{ pathname: "/create-post" }}
                    state={{ isUpdateMode: true, updateModeData: data }}
                  >
                    <EditIcon />
                  </Link>
                  <DeleteButton
                    data={data}
                    modalMessage={modalMessage}
                    setModalMessage={setModalMessage}
                  />
                </div>
              )}
              <div className="gray">
                <ViewsIcon />
                <span>{data.views}</span>
              </div>
            </div>
          </div>

          <p className="gray date_or_status">
            {data.auction
              ? data.productStatus === "BEFORE"
                ? formatTime(data.closedAt) + " 경매종료"
                : AUCTION.end
              : data.productStatus === "BEFORE"
              ? AUCTION.isnot
              : AUCTION.end}
          </p>
          <div className="add_wishlist">
            <WishCount
              isLogin={isLogin}
              data={data}
              setIsOpen={setIsOpen}
              setModalMessage={setModalMessage}
            />
          </div>
          {data.auction && (
            <div className="auction">
              <div className="current_price">
                <div className="price">
                  <span>현재 입찰가</span>
                  <span className="price_number">
                    {currentAuctionPrice?.toLocaleString() + "원"}
                  </span>
                </div>
                {isLogin && Number(userid) !== data.memberId && data.productStatus === "BEFORE" && (
                  <Button
                    $text="입찰하기"
                    $design="black"
                    type="button"
                    onClick={() => {
                      isLogin ? openBidModal() : navigate("/login");
                    }}
                  />
                )}
              </div>
              <div className="create_at">
                <div className="time">
                  <span className="gray">경매 시작 시간</span>
                  <span className="price_number  gray">{formatTime(data.createdAt)}</span>
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
              <span className="price_number">
                {data.immediatelyBuyPrice.toLocaleString() + "원"}
              </span>
            </div>
            {isLogin && Number(userid) !== data.memberId && data.productStatus === "BEFORE" && (
              <Button
                $text="즉시구매"
                $design="black"
                type="button"
                onClick={() => {
                  isLogin ? undefined : navigate("/login");
                }}
              />
            )}
          </div>
        </div>
      </StyledItemStatus>

      <Modal {...{ isOpen, closeModal, toggleModal }}>
        <>
          <h4>{modalMessage.title}</h4>
          <p>{modalMessage.description}</p>
          {modalMessage.title === "상품 입찰" ? (
            <>
              <TextInput
                type="text"
                id="currentAuctionPrice"
                register={register}
                title=""
                options={{
                  required: REQUIRED.bid,
                  onChange: (event) => allowOnlyNumber(event),
                  min: {
                    value: minValue,
                    message: MIN.bid(5),
                  },
                }}
                defaultValue={minValue.toString()}
                formState={formState}
              />
              <Button $design="black" $text="입찰" type="button" onClick={handleSubmit(onSubmit)} />
            </>
          ) : (
            <div className="button">
              <Button
                $design="black"
                $text="확인"
                type="button"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          )}
        </>
      </Modal>
    </>
  );
};

export default ItemStatus;
