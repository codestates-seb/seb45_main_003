import { useRecoilState } from "recoil";
import { loginState } from "../atoms/atoms";
import axios from "axios";

export const useValidateToken = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    const validateAccessToken = async (accessToken: string) => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/`, accessToken);
        if (res) {
          setLogin(true);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`);
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.headers["authorization"]);
              setLogin(true);
            } else if (res.status === 401) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              setLogin(false);
            }
          }
        }
      }
    };
    validateAccessToken(accessToken);
  }
  console.log(login);
};
