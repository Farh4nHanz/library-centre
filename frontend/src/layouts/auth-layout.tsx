import { Outlet } from "react-router-dom";
import { useIsAuth } from "@/hooks/use-is-auth";

const AuthLayout = () => {
  useIsAuth();

  return (
    <div className="h-screen min-h-fit w-full flex justify-center items-center p-5">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
