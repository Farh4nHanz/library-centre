import { useEffect } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import { useNavigate } from "react-router-dom";

export const useIsAuth = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return useEffect(() => {
    if (isAuthenticated && user) return navigate("/", { replace: true });
  }, [isAuthenticated, user, navigate]);
};
