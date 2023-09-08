export const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  return token;
};

export const getUserId = () => {
  const id = localStorage.getItem("member_id");

  if (!id) {
    return null;
  }

  return id;
};
