import { LayoutDashboard, Settings, UserCircle } from "lucide-react";

export const userSidebarMenu = [
  {
    label: "Label 1",
    name: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Label 2",
    name: "Settings",
    link: "/settings",
    icon: Settings,
  },
  {
    label: "Label 3",
    name: "Profile",
    link: "/profile",
    icon: UserCircle,
  },
] as const;
