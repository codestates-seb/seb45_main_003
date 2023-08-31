import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";

const Root = (): JSX.Element => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Root;
