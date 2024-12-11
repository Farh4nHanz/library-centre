import { cva } from "class-variance-authority";
import {
  LayoutDashboard,
  Loader2,
  LucideLoader,
  Settings,
  UserCircle,
  ChartNoAxesCombined,
  BookCopy,
  BookPlus,
  NotebookText,
  ShoppingBag,
  UserRoundPlus,
  UsersRound,
  Activity,
  CircleHelp,
  PhoneCall,
} from "lucide-react";

export const adminSidebarMenu = [
  {
    group: "Dashboard",
    menus: [
      {
        name: "Home",
        link: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Statistics",
        link: "/statistics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    group: "Books Management",
    menus: [
      {
        name: "View All Books",
        link: "books",
        icon: BookCopy,
      },
      {
        name: "Add New Book",
        link: "books/add",
        icon: BookPlus,
      },
      {
        name: "Categories",
        link: "books/categories",
        icon: NotebookText,
      },
      {
        name: "Borrowed Books",
        link: "books/borrowed",
        icon: ShoppingBag,
      },
    ],
  },
  {
    group: "User Management",
    menus: [
      {
        name: "View All Users",
        link: "/users",
        icon: UsersRound,
      },
      {
        name: "Add New User",
        link: "/users/add",
        icon: UserRoundPlus,
      },
      {
        name: "User Activity",
        link: "/users/activity",
        icon: Activity,
      },
    ],
  },
  {
    group: "Settings",
    menus: [
      {
        name: "Library Settings",
        link: "/settings/library",
        icon: Settings,
      },
      {
        name: "Profile",
        link: "/settings/profile",
        icon: UserCircle,
      },
    ],
  },
  {
    group: "Help & Support",
    menus: [
      {
        name: "FAQs",
        link: "/help/faqs",
        icon: CircleHelp,
      },
      {
        name: "Contact Support",
        link: "/help/contact",
        icon: PhoneCall,
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
