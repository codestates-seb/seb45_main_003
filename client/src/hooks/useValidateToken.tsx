import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atoms";

export const useValidateToken = () => {
  const setLogin = useSetRecoilState(loginState);
  const accessToken = localStorage.getItem("accessToken");
  const validateAccessToken = async (accessToken: string) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/access`, {
        headers: {
          Authorization: accessToken,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      if (res) {
        setLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const getAccessToken = async (refreshToken: string) => {
              const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
                headers: {
                  Refresh: refreshToken,
                  "ngrok-skip-browser-warning": "69420",
                },
              });
              if (res.status === 200) {
                localStorage.setItem("accessToken", res.headers["authorization"]);
                setLogin(true);
              }
              if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  setLogin(false);
                }
              }
            };
            getAccessToken(refreshToken);
          }
        }
      }
    }
  };

  // useEffect(() => {
  //   if (accessToken) {
  //     validateAccessToken(accessToken);
  //   }
  // }, []);

  return { validateAccessToken, accessToken };
};
