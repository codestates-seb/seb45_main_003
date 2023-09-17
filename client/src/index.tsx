import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import { GlobalFont } from "./styles/font";
import { GlobalStyle } from "./styles/global";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
AOS.init();

root.render(
  <>
    <GlobalFont />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </>,
);
