import axios from "axios";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { GlobalFont } from "./styles/font";
import { GlobalStyle } from "./styles/global";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    <GlobalFont />
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </>,
);
