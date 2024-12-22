import { Navigate, Outlet } from "react-router-dom";
import { type User } from "@/types";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopBar } from "@/components/ui/top-bar";

const DashboardLayout = () => {
  const user: User = JSON.parse(localStorage.getItem("user") as string);
  const path = sessionStorage.getItem("path") || "/";

  if (user.role !== "admin") return <Navigate to={path} replace={true} />;

  return (
    <SidebarProvider>
      <AppSidebar page="admin" />
      <SidebarInset>
        <TopBar />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
