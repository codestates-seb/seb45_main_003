// 진주님이 주신 캐러셀 예제
import SwiperCore from "swiper";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

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
    slidesPerView: 3,
    spaceBetween: 50,
    pagination: {
      clickable: true,
    },
    navigation: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 1,
      depth: 100,
      modifier: 5,
      slideShadows: true,
    },
    initialSlide: 2,
  };

  const imgList = [image1, image2, image3, image4, image5, image6, image7];
  return (
    <>
      <Swiper {...swiperProps}>
        {imgList.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <img src={imgUrl} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
