import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";
import { useAppSelector } from "@/hooks/use-redux";

export const useIsAuth = () => {
  const { isLoading } = useAuth();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return useEffect(() => {
    if (!isLoading && isAuthenticated) return navigate("/", { replace: true });
  }, [isLoading, isAuthenticated, navigate]);
};
