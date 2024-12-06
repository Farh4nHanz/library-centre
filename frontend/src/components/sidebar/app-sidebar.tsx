/** @types */
import { type AppSidebarProps } from "@/types/props-type";

/** @components */
import { AdminSidebar } from "@/components/sidebar/admin-sidebar";

export const AppSidebar = ({ page }: AppSidebarProps) => {
  return page === "admin" ? <AdminSidebar /> : null;
};
