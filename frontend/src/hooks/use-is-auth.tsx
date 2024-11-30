import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/user-context";

export const useIsAuth = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return useEffect(() => {
    if (!isLoading && user) return navigate("/", { replace: true });
  }, [isLoading, user, navigate]);
};
