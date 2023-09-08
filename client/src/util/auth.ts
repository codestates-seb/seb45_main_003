export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  return token;
};

export const getUserId = () => {
  const id = localStorage.getItem("Id");

  if (!id) {
    return null;
  }

  return id;
};
