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
  width: calc(100% - 3rem);
  margin: 0 auto;
  overflow: hidden;
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
    padding: 150px 0 0;
    display: flex;
    justify-content: center;
    gap: 2.5rem;

    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .GrandTitle {
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

        text-align: center;
      }

      .Text2 {
        /* background-color: #db3636; */
        margin-top: 2.625rem;
        margin-left: 12.9375rem;

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
        url(../../assets/images/main/image-3.png>),
        lightgray 50% / cover no-repeat;
    }
  }
  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
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
`;
