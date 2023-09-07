import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atoms";

export const useValidateToken = () => {
  const setLogin = useSetRecoilState(loginState);
  const accessToken: string | null = localStorage.getItem("accessToken");
  const refreshToken: string | null = localStorage.getItem("refreshToken");
  const getAccessToken = async (refreshToken: string | null) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
        headers: {
          Refresh: refreshToken,
        },
      });
      if (res.status === 200) {
        localStorage.setItem("accessToken", res.headers["authorization"]);
        setLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          setLogin(false);
        }
      }
    }
  };
  const validateAccessToken = async (accessToken: string | null) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/access`, {
        headers: {
          Authorization: accessToken,
        },
      });
      if (res) {
        setLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          if (refreshToken) {
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

  return { validateAccessToken, getAccessToken, accessToken, refreshToken };
};
