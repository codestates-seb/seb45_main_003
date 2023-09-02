//캐러셀 작업
import SwiperCore from "swiper";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

import styled from "styled-components";

// 이미지 파일의 경로
import image1 from "../../assets/images/Carousel/unsplash1.jpg";
import image2 from "../../assets/images/Carousel/unsplash2.jpg";
import image3 from "../../assets/images/Carousel/unsplash3.jpg";
import image4 from "../../assets/images/Carousel/unsplash4.jpg";
import image5 from "../../assets/images/Carousel/unsplash5.jpg";
import image6 from "../../assets/images/Carousel/unsplash6.jpg";
import image7 from "../../assets/images/Carousel/unsplash7.jpg";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import "./styles.css";

SwiperCore.use([Pagination, Navigation, EffectCoverflow]);

const Layout = styled.div`
  display: flex;
  justify-content: center;
  /* background-color: blue; */
  margin: 0 auto;
  width: calc(100% - 3rem);
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;
const Box = styled.div`
  justify-content: center;
  /* background-color: red; */

  .swiper {
    width: 56.25rem;
    height: 25rem;

    padding: 0px 9.375rem;
  }
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
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
}

const Carousel = (): JSX.Element => {
  const swiperProps: CustomSwiperProps = {
    slidesPerView: 1,
    spaceBetween: 250,
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
  };

  const imgList = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <>
      <Layout>
        <Box>
          <Swiper {...swiperProps}>
            {imgList.map((imgUrl, index) => (
              <SwiperSlide key={index}>
                <img src={imgUrl} alt={`Slide ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Layout>
    </>
  );
};

export default Carousel;
