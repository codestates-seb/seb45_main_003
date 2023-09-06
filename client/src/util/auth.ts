export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  return token;
};
