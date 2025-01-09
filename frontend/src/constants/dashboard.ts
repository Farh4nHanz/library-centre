import { ChartConfig } from "@/components/ui/chart";
import { Users, BookOpen, BookCopy, ShoppingBag } from "lucide-react";

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

export const libraryStats = [
  {
    title: "Total Books in Library",
    value: "20.000",
    change: {
      value: 4.5,
      timeframe: "last month",
    },
    icon: BookCopy,
  },
  {
    title: "Total Books Borrowed",
    value: "1.234",
    change: {
      value: 12.5,
      timeframe: "last month",
    },
    icon: ShoppingBag,
  },
  {
    title: "Active Readers",
    value: "789",
    change: {
      value: 5.2,
      timeframe: "last month",
    },
    icon: Users,
  },
  {
    title: "Average Reading Time",
    value: "3.5 hours",
    change: {
      value: 8.7,
      timeframe: "last month",
    },
    icon: BookOpen,
  },
];

export const BOOK_QUERY_KEY = ["books", "book"] as const;
