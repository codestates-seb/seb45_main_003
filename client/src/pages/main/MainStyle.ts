import styled from "styled-components";

export const StyledMain = styled.main`
  max-width: 1440px;
  width: calc(100% - 3rem);
  margin: 0 auto;

  @media (max-width: 64rem) {
    width: calc(100% - 2rem);
  }
`;

export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  margin: 0 auto;
  width: calc(100% - 3rem);

  /* 순차 적으로 컨텐츠 배치 : 캐러셀 하단 이펙트카드 */

  .EffectCard {
    display: flex;
    justify-content: center;
    background-color: red;
    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .GrandTitle {
        background-color: #616161;

        flex-direction: column;
        justify-content: start;
        flex-shrink: 0;
        margin-left: 9.3125rem;

        color: #222;
        font-family: Pretendard Variable;
        font-size: 3.75rem;
        font-style: normal;
        font-weight: 800;
        line-height: 5rem; /* 133.333% */
      }

      .Text2 {
        background-color: #db3636;

        margin-left: 12.9375rem;

        color: #616161;
        font-family: Pretendard Variable;
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 800;
        line-height: 3.625rem; /* 161.111% */
      }
    }
  }

  /* 순차 적으로 컨텐츠 배치 : 기능 소개 1*/

  .Function1 {
    display: flex;
    justify-content: center;
    background-color: blue;

    margin-top: 18.125rem;
    .TextBox1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;

      .Text1 {
        background-color: #616161;

        flex-direction: column;
        justify-content: start;
        flex-shrink: 0;
        margin-left: 9.3125rem;

        color: #222;
        font-family: Pretendard Variable;
        font-size: 60px;
        font-style: normal;
        font-weight: 800;
        line-height: 60px; /* 100% */
      }

      .Text2 {
        background-color: #db3636;

        margin-left: 11.25rem;

        color: #616161;
        font-family: Pretendard Variable;
        font-size: 2.25rem;
        font-style: normal;
        font-weight: 800;
        line-height: 3.625rem; /* 161.111% */
      }
    }
    .FunctionImg {
      margin-left: 1rem;
      width: 50.8125rem;
      height: 29.875rem;
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
  font-size: 92px;
  font-style: normal;
  font-weight: 800;
  line-height: 100px; /* 108.696% */
`;
export const SecondTitle = styled.div`
  color: #222;
  font-family: Pretendard Variable;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 80px;
  margin-bottom: 3.125rem;
`;
