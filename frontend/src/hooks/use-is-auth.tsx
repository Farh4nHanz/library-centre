import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";

export const useIsAuth = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return useEffect(() => {
    if (isAuthenticated && user) return navigate("/", { replace: true });
  }, [isAuthenticated, user, navigate]);
};
