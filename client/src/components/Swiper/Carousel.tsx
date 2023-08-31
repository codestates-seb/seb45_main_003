// Import Swiper React components
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "../Swiper/styles.css";

interface CustomSwiperProps extends ReactSwiperProps {
  slidesPerView?: number;
  spaceBetween?: number;
  pagination?: { clickable: boolean };
  navigation?: boolean;
}
const Carousel = (): JSX.Element => {
  const swiperProps: CustomSwiperProps = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    navigation: true,
  };
  return (
    <>
      <Swiper className="mySwiper" {...swiperProps}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
