//캐러셀 작업
import SwiperCore from "swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

import styled from "styled-components";

// 이미지 파일의 경로
import image1 from "../../../assets/images/Carousel/unsplash1.jpg";
import image2 from "../../../assets/images/Carousel/unsplash2.jpg";
import image3 from "../../../assets/images/Carousel/unsplash3.jpg";
import image4 from "../../../assets/images/Carousel/unsplash4.jpg";
import image5 from "../../../assets/images/Carousel/unsplash5.jpg";
import image6 from "../../../assets/images/Carousel/unsplash6.jpg";
import image7 from "../../../assets/images/Carousel/unsplash7.jpg";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

const Layout = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: blue; */
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
    width: 100%;
    height: 33.875rem;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;
interface CustomSwiperProps extends ReactSwiperProps {
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
  centeredSlides: boolean;
  autoHeight: boolean;
  freeMode: boolean;
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

  const imgList = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <>
      <Layout>
        <Swiper {...swiperProps}>
          {imgList.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <img src={imgUrl} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Layout>
    </>
  );
};

export default Carousel;
