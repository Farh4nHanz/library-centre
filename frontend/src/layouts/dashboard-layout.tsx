import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopBar } from "@/components/ui/top-bar";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/context/user-context";
import { useAppDispatch } from "@/hooks/use-redux";
import { setErrorMsg } from "@/redux/slices/auth-slice";

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
      <AppSidebar page="admin" />
      <SidebarInset>
        <TopBar />
        <Outlet />
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
