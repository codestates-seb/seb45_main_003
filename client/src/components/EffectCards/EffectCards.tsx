// 이펙트 카드
import SwiperCore from "swiper";
import { EffectCards } from "swiper/modules";
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
import "swiper/css/effect-cards";

const Box = styled.div`
  /* height: 18.75rem; */
  width: 18.75rem;
  height: 31.25rem;
  border-radius: 0.375rem;
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    height: 25rem;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

// 모듈 종류
SwiperCore.use([EffectCards]);

interface CustomSwiperProps extends ReactSwiperProps {
  // slidesPerView?: number;
  spaceBetween?: number;
  effect?: string;
  grabCursor?: boolean;
  initialSlide?: number;
  cardsEffect?: { perSlideOffset?: number };
}

const EffectCard = (): JSX.Element => {
  const swiperProps: CustomSwiperProps = {
    // spaceBetween: 0,
    effect: "cards",
    grabCursor: true,
    initialSlide: 0,
    cardsEffect: { perSlideOffset: 10 },
  };

  const imgList = [image1, image2, image3, image4, image5, image6, image7];

  return (
    <>
      <Box>
        <Swiper {...swiperProps}>
          {imgList.map((imgUrl, index) => (
            <SwiperSlide key={index}>
              <img src={imgUrl} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default EffectCard;
