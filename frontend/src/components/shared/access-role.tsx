import { Navigate } from "react-router-dom";
import { AccessRoleProps } from "@/types/props-type";
import { useAuth } from "@/context/user-context";

export const AccessRole = ({ role, children }: AccessRoleProps) => {
  const { user } = useAuth();
  const path = sessionStorage.getItem("path") || "/";

  if (!user?.role.includes(role)) return <Navigate to={path} replace={true} />;

  return children;
};
