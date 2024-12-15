import { cva } from "class-variance-authority";
import { ChartConfig } from "@/components/ui/chart";
import {
  LayoutDashboard,
  Loader2,
  LucideLoader,
  Settings,
  UserCircle,
  ChartNoAxesCombined,
  BookCopy,
  NotebookText,
  ShoppingBag,
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
        link: "/dashboard/statistics",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    group: "Books Management",
    menus: [
      {
        name: "Books",
        link: "/dashboard/books",
        icon: BookCopy,
      },
      {
        name: "Categories",
        link: "/dashboard/books/categories",
        icon: NotebookText,
      },
      {
        name: "Borrowed Books",
        link: "/dashboard/books/borrowed",
        icon: ShoppingBag,
      },
    ],
  },
  {
    group: "User Management",
    menus: [
      {
        name: "Users",
        link: "/dashboard/users",
        icon: UsersRound,
      },
      {
        name: "User Activity",
        link: "/dashboard/users/activity",
        icon: Activity,
      },
    ],
  },
  {
    group: "Settings",
    menus: [
      {
        name: "Library Settings",
        link: "/dashboard/settings/library",
        icon: Settings,
      },
      {
        name: "Profile",
        link: "/dashboard/settings/profile",
        icon: UserCircle,
      },
    ],
  },
  {
    group: "Help & Support",
    menus: [
      {
        name: "FAQs",
        link: "/dashboard/help/faqs",
        icon: CircleHelp,
      },
      {
        name: "Contact Support",
        link: "/dashboard/help/contact",
        icon: PhoneCall,
      },
    ],
  },
];

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

export const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 305 },
  { month: "March", visitors: 237 },
  { month: "April", visitors: 73 },
  { month: "May", visitors: 209 },
  { month: "June", visitors: 214 },
  { month: "July", visitors: 220 },
  { month: "August", visitors: 230 },
  { month: "September", visitors: 240 },
  { month: "October", visitors: 250 },
  { month: "November", visitors: 260 },
  { month: "December", visitors: 270 },
] as const;

export const chartConfig = {
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;
