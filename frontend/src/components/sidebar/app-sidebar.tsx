/** @types */
import { type AppSidebarProps } from "@/types/props-type";

/** @features */
import { AdminSidebar } from "@/features/dashboard/sidebar";

export const AppSidebar = ({ page }: AppSidebarProps) => {
  return page === "admin" ? <AdminSidebar /> : null;
};
