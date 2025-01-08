import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

/** @context */
import { useAuth } from "@/context/user-context";

/** @hooks */
import { useAppDispatch } from "@/hooks/use-redux";

/** @redux */
import { setErrorMsg } from "@/redux/slices/auth-slice";

/** @components */
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TopBar } from "@/components/ui/top-bar";
import { Toaster } from "@/components/ui/toaster";

/** @features */
import { AdminSidebar } from "@/features/dashboard/admin-sidebar";

const DashboardLayout = () => {
  const { user } = useAuth();
  const path = sessionStorage.getItem("path")!;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      dispatch(setErrorMsg("You are not allowed to access this page!"));
      navigate(path, { replace: true });
    }
  }, [user?.role, dispatch, navigate, path]);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <TopBar />
        <Outlet />
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
