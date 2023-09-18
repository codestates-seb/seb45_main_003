// 이펙트 카드 < 카드 넘기기 효과 >
import SwiperCore from "swiper";
import { EffectCards } from "swiper/modules";
import { SwiperProps as ReactSwiperProps, Swiper, SwiperSlide } from "swiper/react";

import styled from "styled-components";

// 이미지 파일의 경로
import image1 from "../../../assets/images/main/Member/A.png";
import image2 from "../../../assets/images/main/Member/B.png";
import image3 from "../../../assets/images/main/Member/C.png";
import image4 from "../../../assets/images/main/Member/D.png";
import image5 from "../../../assets/images/main/Member/E.png";
import image6 from "../../../assets/images/main/Member/F.png";
import image7 from "../../../assets/images/main/Member/G.png";
import image8 from "../../../assets/images/main/Member/H.png";

import "swiper/css";
import "swiper/css/effect-cards";

const Box = styled.div`
  max-width: 22.5rem;
  width: 35%;

  border-radius: 0.375rem;
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1.125rem;
    font-size: 1.375rem;
    font-weight: bold;
    color: #fff;
    height: 31.25rem;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

// 모듈 종류
SwiperCore.use([EffectCards]);

interface CustomSwiperProps extends ReactSwiperProps {
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

  const imgList = [image1, image2, image3, image4, image5, image6, image7, image8];

  return (
    <>
      <Box>
        <Swiper {...swiperProps}>
          {imgList.map((imgUrl, index) => (
            <SwiperSlide key={index} className={index === 0 ? "first" : ""}>
              <img src={imgUrl} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

export default EffectCard;
