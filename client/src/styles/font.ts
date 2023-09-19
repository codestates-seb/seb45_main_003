import { createGlobalStyle } from "styled-components";
import PretendardBold from "../fonts/Pretendard-Bold.woff";
import PretendardExtraBold from "../fonts/Pretendard-ExtraBold.woff";
import PretendardExtraLight from "../fonts/Pretendard-ExtraLight.woff";
import PretendardLight from "../fonts/Pretendard-Light.woff";
import PretendardMedium from "../fonts/Pretendard-Medium.woff";
import PretendardRegular from "../fonts/Pretendard-Regular.woff";
import PretendardSemiBold from "../fonts/Pretendard-SemiBold.woff";
import PretendardThin from "../fonts/Pretendard-Thin.woff";
import PretendardBlack from "./../fonts/Pretendard-Black.woff";

export const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url(${PretendardThin}) format("woff");
    font-weight: 100;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardExtraLight}) format("woff");
    font-weight: 200;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardLight}) format("woff");
    font-weight: 300;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardRegular}) format("woff");
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardMedium}) format("woff");
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardSemiBold}) format("woff");
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardBold}) format("woff");
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardExtraBold}) format("woff");
    font-weight: 800;
    font-display: swap;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"),url(${PretendardBlack}) format("woff");
    font-weight: 900;
    font-display: swap;
  }
`;
