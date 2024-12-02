import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);

  return (
    <div className="h-screen min-h-fit w-full flex justify-center items-center p-5">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
