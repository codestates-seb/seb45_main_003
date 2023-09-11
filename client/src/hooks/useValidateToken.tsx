import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atoms/atoms";
import { authInstance } from "../interceptors/interceptors";

export const useValidateToken = () => {
  const setLogin = useSetRecoilState(loginState);
  const accessToken: string | null = localStorage.getItem("accessToken");
  const refreshToken: string | null = localStorage.getItem("refreshToken");
  const validateAccessToken = async () => {
    try {
      const res = await authInstance.get(`/access`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Refresh: refreshToken,
        },
      });
      if (res.status === 200) {
        setLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return { validateAccessToken, accessToken, refreshToken };
};
