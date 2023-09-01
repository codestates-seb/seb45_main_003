import { createGlobalStyle } from "styled-components";
import "./font.ts";

export const GlobalStyle = createGlobalStyle`
body,
textarea {
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
  font-size: 2rem;
}
h2 {
  font-size: 1.5rem;
}
h3 {
  font-size: 1.25rem;
}
h4 {
  font-size: 1.125rem;
}
h5 {
  font-size: 1rem;
}
ul {
  list-style: none;
}
button,
input {
  height: 2.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  border-radius: 6px;
  border: .0625rem solid #e0e0e0;
}
select {
  margin: 0;
  padding: 0;
}
button{
  cursor: pointer;

  &:hover {
    cursor: pointer;
  }
}
* {
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
