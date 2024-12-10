import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { usePath } from "@/hooks/use-path";

const UserLayout = () => {
  usePath();

  return (
    <SidebarProvider>
      <AppSidebar page="user" />
      <main className="relative w-full ps-3">
        <div className="py-2 fixed z-50 bg-white w-full">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default UserLayout;
