//캐러셀 작업
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";
import { COLOR } from "../../../constants/color";
import { API_PATHS } from "../../../constants/path";
import { Data } from "../../productList/List";
import "./styles.css";

SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

const Layout = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  margin-bottom: 6.25rem;
  .swiper {
    max-height: 33.875rem;

    margin: 0;
    padding-left: 12%;
    padding-right: 12%;
  }
  .swiper-slide {
    position: relative;
    width: 100%;
    height: 33.875rem;
    overflow: hidden;

    .loading,
    .error,
    .empty {
      width: 100%;
      height: 100%;
      background: ${COLOR.primary};
      position: relative;
    }

    .blur {
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      filter: blur(5px);
      -webkit-filter: blur(5px);
      width: 110%;
      height: 110%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .black {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .image_box {
    width: 50%;
    max-width: 15rem;
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      aspect-ratio: 1/1;
      object-fit: cover;
      border-radius: 1.25rem;
    }

    h2 {
      font-size: 2rem;
      margin: 0 0 0.5rem;
    }

    h2,
    p {
      color: #fff;
    }

    a {
      overflow: hidden;
    }

    .title {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.25rem;
      font-weight: 700;
      text-align: center;
      margin: 0.75rem 0 0.25rem;
    }

    .price {
      font-size: 1rem;
    }
  }

  @media (max-width: 64rem) {
    .swiper {
      width: 100%;
      padding: 0;
    }

    .swiper-slide {
      height: 22.5rem;
    }
  }
`;
export interface CustomSwiperProps extends ReactSwiperProps {
  slidesPerView?: number;
  spaceBetween?: number;
  pagination?: { clickable: boolean };
  navigation?: boolean;
  effect?: string;
  coverflowEffect?: {
    rotate: number;
    stretch: number;
    depth: number;
    modifier: number;
    slideShadows: boolean;
  };
  initialSlide?: number;
  centeredSlides?: boolean;
  autoHeight?: boolean;
  freeMode?: boolean;
}

const Carousel = (): JSX.Element => {
  const swiperProps: CustomSwiperProps = {
    slidesPerView: 1,
    spaceBetween: 350,
    pagination: {
      clickable: true,
    },
    navigation: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 2,
      depth: 80,
      modifier: 5,
      slideShadows: true,
    },
    initialSlide: 2,
    centeredSlides: true,
    autoHeight: true,
    freeMode: true,
  };

  const location = useLocation();

  const getData = async () => {
    const params = { page: 0, size: 10 };

    const response = await axios.get(API_PATHS.products.default(""), {
      params: params,
    });

    return response.data;
  };

  const { isLoading, data, error } = useQuery<Data>(["CarouselProductList", location], getData);

  return (
    <>
      <Layout>
        <Swiper {...swiperProps}>
          {isLoading && (
            <SwiperSlide key={"lodaing"}>
              <div className="loading"></div>
              <div className="image_box">
                <h2>Loading..</h2>
                <p>슬라이드를 로딩 중입니다.</p>
              </div>
            </SwiperSlide>
          )}
          {data && data.content?.length > 0 && (
            <>
              {data.content.map((el) => (
                <SwiperSlide key={el.productId}>
                  <div className="blur" style={{ backgroundImage: `url(${el.images[0].path})` }}>
                    <div className="black"></div>
                  </div>
                  <Link to={`/product/${el.productId}`} className="image_box">
                    <img src={el.images[0].path} alt="슬라이드 이미지" />
                    <p className="title">{el.title}</p>
                    {el.auction && (
                      <p className="price">
                        현재 입찰가 {el.currentAuctionPrice?.toLocaleString()} 원
                      </p>
                    )}
                    {!el.auction && (
                      <p className="price">
                        즉시 구매가 {el.immediatelyBuyPrice.toLocaleString()} 원
                      </p>
                    )}
                  </Link>
                </SwiperSlide>
              ))}
            </>
          )}
          {data && data.content?.length === 0 && (
            <SwiperSlide key={"empty"}>
              <div className="empty"></div>
              <div className="image_box">
                <h2>Empty</h2>
                <p>상품을 준비중입니다.</p>
              </div>
            </SwiperSlide>
          )}
          {(error as Error) && (
            <SwiperSlide key={"error"}>
              <div className="error"></div>
              <div className="image_box">
                <h2>Error</h2>
                <p>에러가 발생했습니다.</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </Layout>
    </>
  );
};

export default Carousel;
