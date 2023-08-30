import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalFont } from "./styles/font";
import { GlobalStyle } from "./styles/global";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalFont />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
);
