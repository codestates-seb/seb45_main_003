// UserProfile.tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/atoms";

const UserProfile: React.FC = () => {
  const user = useRecoilValue(userState);

  if (!user) {
    return <div>Please log in.</div>;
  }

  return <div>Welcome, {user.name}!</div>;
};

export default UserProfile;
