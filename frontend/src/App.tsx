import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    sessionStorage.setItem("path", pathname);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="relative w-full ps-3">
        <div className="py-2 fixed z-50 bg-white w-full">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default App;
