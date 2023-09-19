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
          Refresh: refreshToken,
        },
      });
      if (res.status === 200) {
        setLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 406 || 500) {
          setLogin(false);
        }
      }
    }
  };

  return { validateAccessToken, accessToken, refreshToken };
};
