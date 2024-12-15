import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { format, isBefore, isAfter, isSameMonth } from "date-fns";

/** @components */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/** @features */
import { SelectMonth } from "@/features/dashboard/chart/select-month";

/** @context */
import { useMonth } from "@/context/month-context";
/** @icons */
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 220, mobile: 150 },
  { month: "August", desktop: 230, mobile: 160 },
  { month: "September", desktop: 240, mobile: 170 },
  { month: "October", desktop: 250, mobile: 180 },
  { month: "November", desktop: 260, mobile: 190 },
  { month: "December", desktop: 270, mobile: 200 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const Chart = () => {
  const currentYear = new Date().getFullYear();
  const { monthState } = useMonth();

  const filteredData = useMemo(() => {
    return chartData.filter((_, i) => {
      const dateData = new Date(currentYear, i);
      return (
        (isAfter(dateData, monthState.startMonth) ||
          isSameMonth(dateData, monthState.startMonth)) &&
        (isBefore(dateData, monthState.endMonth) ||
          isSameMonth(dateData, monthState.endMonth))
      );
    });
  }, [currentYear, monthState.startMonth, monthState.endMonth]);

  const totalVisitors = useMemo(() => {
    return filteredData.reduce(
      (curr, data) => curr + data.desktop + data.mobile,
      0
    );
  }, [filteredData]);

  const trendPercentage = useMemo(() => {
    if (filteredData.length < 2) return String(0);
    const firstMonth = filteredData[0];
    const lastMonth = filteredData[filteredData.length - 1];
    const firstTotal = firstMonth.desktop + firstMonth.mobile;
    const lastTotal = lastMonth.desktop + lastMonth.mobile;
    return (((lastTotal - firstTotal) / firstTotal) * 100).toFixed(1);
  }, [filteredData]);

  const formatDisplayDate = (date: Date) => {
    return format(date, "MMMM yyyy");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="space-y-1">
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>
              {isSameMonth(monthState.startMonth, monthState.endMonth)
                ? formatDisplayDate(monthState.startMonth)
                : `Period ${formatDisplayDate(
                    monthState.startMonth
                  )} - ${formatDisplayDate(monthState.endMonth)}`}
            </CardDescription>
          </div>
          <SelectMonth />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {parseFloat(trendPercentage) > 0 ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(parseFloat(trendPercentage))}%{" "}
          <TrendingUp
            className={`h-4 w-4 ${
              parseFloat(trendPercentage) < 0 ? "rotate-180" : ""
            }`}
          />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total of {totalVisitors} visitors for the selected period
        </div>
      </CardFooter>
    </Card>
  );
};
