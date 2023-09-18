import styled from "styled-components";

export const BackGround = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
`;
export const StyledMain = styled.section`
  max-width: 1440px;
  margin: 0 auto;
`;

export const ContentBox = styled.div`
  /* background-color: #616161; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 19.625rem;

  /* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드 */

  .EffectCard {
    width: 100%;
    padding: 150px 0 0;
    display: flex;
    justify-content: center;
    gap: 6.25rem;

    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .GrandTitle {
        /* background-color: #616161; */

        margin-left: 5rem;
        color: #222;
        font-family: Pretendard Variable;
        font-size: 3rem;
        font-style: normal;
        font-weight: 800;
        text-align: left;
      }

      .Text2 {
        /* background-color: #db3636; */
        margin-top: 2.625rem;
        margin-left: 5rem;

        color: #616161;
        font-family: Pretendard Variable;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 800;
        line-height: 1.5;
      }
    }
  }

  /* 순차 적으로 컨텐츠 배치 : 기능 소개 1*/

  .Function1 {
    display: flex;
    justify-content: center;
    /* background-color: blue; */

    margin-top: 18.125rem;
    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .Text1 {
        /* background-color: #616161; */
        flex-direction: column;
        justify-content: start;
        flex-shrink: 0;
        margin-left: 9.3125rem;
        color: #222;
        font-family: Pretendard Variable;
        font-size: 3rem;
        font-style: normal;
        font-weight: 800;
      }

      .Text2 {
        /* background-color: #db3636; */
        margin-top: 2.625rem;
        margin-left: 11.25rem;

        color: #616161;
        font-family: Pretendard Variable;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 800;
        line-height: 1.5;
      }
    }
    .FunctionImg {
      margin-left: 1rem;
      width: 50%;
      flex-shrink: 0;
      border-radius: 0.375rem;
      background:
        url(../../assets/images/main/image-3.png),
        lightgray 50% / cover no-repeat;
    }
  }
  @media (max-width: 64rem) {
    padding-bottom: 7.5rem;

    .EffectCard {
      padding: 0;
      flex-flow: column;

      & > div {
        max-width: 16.25rem;
        width: 100%;
        margin: 0 auto;

        .swiper-slide {
          height: 22.5rem;
        }
      }

      .TextBox1 {
        max-width: unset;

        .GrandTitle {
          width: 100%;
          margin: 0;
        }

        .Text2 {
          margin: 0;
          text-align: center;
          word-break: keep-all;
        }
      }
    }

    .Function1 {
      margin-top: 7.5rem;
      flex-flow: column-reverse;
      gap: 1.5rem;

      &.reverse {
        flex-flow: column;
      }

      .TextBox1 {
        .Text1 {
          margin: 0 0 1rem 0;
          text-align: center;
          color: #222;
          font-size: 2rem;
        }

        .Text2 {
          /* background-color: #db3636; */
          margin: 0;
          font-size: 1.25rem;
          font-style: normal;
          font-weight: 800;
          line-height: 1.5;
          text-align: center;
          word-break: keep-all;
        }
      }
      .FunctionImg {
        margin-left: 0;
        width: 100%;
      }
    }
  }
`;

export const MainTitle = styled.div`
  margin-top: 3.625rem;
  color: #222;
  text-align: center;
  font-family: Pretendard Variable;
  font-size: 5.75rem;
  font-style: normal;
  font-weight: 800;
  line-height: 6.25rem; /* 108.696% */

  @media (max-width: 64rem) {
    font-size: 3rem;
    line-height: 1.2;
  }
`;
export const SecondTitle = styled.div`
  color: #222;
  font-family: Pretendard Variable;
  text-align: center;
  font-size: 3rem;
  font-style: normal;
  font-weight: 800;
  line-height: 5rem;
  margin-bottom: 3.125rem;

  @media (max-width: 64rem) {
    font-size: 2rem;
    line-height: 1.2;
  }
`;
