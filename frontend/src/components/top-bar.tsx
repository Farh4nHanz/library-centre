import { Link, useLocation } from "react-router-dom";
import { adminSidebarMenu } from "@/constants";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const TopBar = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex sticky top-0 h-14 z-50 shrink-0 bg-background items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <Link to="/dashboard">Dashboard</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          {adminSidebarMenu.map((items) =>
            items.menus.map(
              (menu) =>
                menu.link.includes(pathname) && (
                  <BreadcrumbItem key={menu.name}>
                    <BreadcrumbPage>{menu.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                )
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
