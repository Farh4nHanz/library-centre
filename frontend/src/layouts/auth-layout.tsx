import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen min-h-fit w-full flex justify-center items-center p-5">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
