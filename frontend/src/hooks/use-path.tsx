import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const usePath = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);
};