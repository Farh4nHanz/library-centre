import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { TopBar } from "@/components/ui/top-bar";
import { usePath } from "@/hooks/use-path";

const DashboardLayout = () => {
  usePath();

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
