import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useEffect } from "react";

const Dashboard = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar page="admin" />
      <main className="relative w-full ps-3">
        <div className="py-2 fixed z-50 bg-white w-full">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default Dashboard;
