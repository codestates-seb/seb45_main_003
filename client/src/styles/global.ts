import { createGlobalStyle } from "styled-components";
import arrow from "../assets/images/SelectArrow.svg";
import { COLOR } from "../constants/color";
import { FONT_SIZE } from "../constants/font";
import "./font.ts";

export const GlobalStyle = createGlobalStyle`
body {
  overflow-x: hidden;
}
body,
textarea, input {
  color: ${COLOR.darkText};
  margin: 0;
  font-family: "Pretendard";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
blockquote,
body,
dd,
dl,
dt,
fieldset,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
html,
iframe,
legend,
li,
ol,
p,
pre,
textarea,
ul {
  margin: 0;
  padding: 0;
  letter-spacing: -0.1px;
}
h1 {
  font-size: ${FONT_SIZE.font_32};
}
h2 {
  font-size: ${FONT_SIZE.font_24};
}
h3 {
  font-size: ${FONT_SIZE.font_20};
}
h4 {
  font-size: ${FONT_SIZE.font_18};
}
h5 {
  font-size: ${FONT_SIZE.font_16};
}
ul {
  list-style: none;
}
input:not([type=checkbox], [type=radio]), textarea {
  font-size: 1rem;
  padding: .5rem .75rem;
  border-radius: 6px;
  border: 1px solid ${COLOR.border};

  &:hover, &:focus {
    border: 1px solid ${COLOR.primary};
    outline: 1px solid ${COLOR.primary};
  }
}
input[type=number]::-webkit-outer-spin-button{-webkit-appearance: none;margin: 0;}
input[type=number]::-webkit-inner-spin-button{-webkit-appearance: none;margin: 0;}
textarea {
  resize: none;
}
.custom_select {
  display: flex;
  position: relative;
  
  select {
    font-family: "Pretendard";
    font-size: ${FONT_SIZE.font_16};
    padding: 0.5rem 0.75rem;
    width: 15rem;
    border-radius: 6px;
    border: 1px solid ${COLOR.border};
    background: ${COLOR.gray_100};
    outline: none;
    -webkit-appearance:none; 
    -moz-appearance:none; 
    appearance:none;
  }

  &::after {
    content: ""; 
    width: 1.5rem ;
    height: 1.5rem;
    background: url(${arrow}) no-repeat; 
    position: absolute;
    top: 50%;
    right: .5rem;
    transform: translateY(-50%);
    pointer-events: none;
  }
}


button{
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
}
* {
  
    &,
    &:after,
    &:before {
    box-sizing: border-box;
  }
}
img,
video {
  height: auto;
  max-width: 100%;
}
iframe {
  border: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
td,
th {
  padding: 0;
}
a {
  color: inherit;
  text-decoration: none;
  text-decoration: none;
}
`;
