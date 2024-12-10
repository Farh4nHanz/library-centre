import { cva } from "class-variance-authority";
import {
  LayoutDashboard,
  Loader2,
  LucideLoader,
  Settings,
  UserCircle,
} from "lucide-react";

export const userSidebarMenu = [
  {
    group: "Label 1",
    menus: [
      {
        name: "Dashboard",
        link: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    group: "Label 2",
    menus: [
      {
        name: "Settings",
        link: "/settings",
        icon: Settings,
      },
      {
        name: "Profile",
        link: "/profile",
        icon: UserCircle,
      },
    ],
  },
  {
    group: "Label 3",
    menus: [
      {
        name: "Settings",
        link: "/settings",
        icon: Settings,
      },
      {
        name: "Profile",
        link: "/profile",
        icon: UserCircle,
      },
    ],
  },
] as const;

export const loader = cva("loader", {
  variants: {
    color: {
      white: "text-white",
      black: "text-black",
      blue: "text-blue-500",
      green: "text-green-500",
      red: "text-red-500",
      yellow: "text-yellow-500",
    },
    size: {
      xs: "size-2",
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
      xl: "size-10",
      xxl: "size-12",
    },
  },
  defaultVariants: {
    color: "black",
    size: "md",
  },
});

export const variantMap = {
  "1": Loader2,
  "2": LucideLoader,
};
