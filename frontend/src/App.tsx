import { Outlet } from "react-router-dom";
import { useAxiosInterceptors } from "@/hooks/use-axios-interceptors";

const App = () => {
  useAxiosInterceptors();

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
