// Import Swiper React components
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

import "../Swiper/styles.css";
import { Navigation } from "swiper/modules";

// SwiperCore.use([Navigation, Pagination]);

const Box = styled.div`
  width: 300px;
  height: 300px;
  background-color: aqua;
`;
interface CustomSwiperProps extends ReactSwiperProps {
  slidesPerView?: number;
  spaceBetween?: number;
  pagination?: { clickable: boolean };
  navigation?: boolean;
  modules?: object;
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
      <div id="app">
        <Swiper modules={[Navigation]} className="mySwiper" {...swiperProps}>
          <SwiperSlide>
            <Box>Slide 1</Box>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
