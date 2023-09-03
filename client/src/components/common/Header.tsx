// Header.tsx
import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../atoms/atoms";
// import { useUserActions } from "../header/useUser";
import HeaderLogin from "../header/HeaderLogin";
// import HeaderLogout from "../header/HeaderLogout";

const Header: React.FC = () => {
  const user = useRecoilValue(userState);
  // const { login, logout } = useUserActions();

  return (
    <header>
      {user ? (
        <>
          <HeaderLogin />

          {/* <HeaderLogout /> */}
        </>
      ) : (
        <>
          <HeaderLogin />
          {/* <span>Please log in.</span>
          <button
            onClick={() =>
              login({
                name: "John Doe",
                email: "john.doe@example.com",
                // ... other fields
              })
            }
          >
            Login
          </button> */}
        </>
      )}
    </header>
  );
};

export default Header;
