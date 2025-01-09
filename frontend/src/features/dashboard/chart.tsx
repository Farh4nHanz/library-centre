import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/** @features */
import { MonthSelect } from "@/features/dashboard/month-select";

/** @context */
import { useMonth } from "@/context/month-context";

/** @constants */
import { chartConfig, chartData } from "@/constants/dashboard";

/** @icons */
import { TrendingUp } from "lucide-react";

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
    return filteredData.reduce((curr, data) => curr + data.visitors, 0);
  }, [filteredData]);

  const trendPercentage = useMemo(() => {
    if (filteredData.length < 2) return String(0);
    const firstMonth = filteredData[0];
    const lastMonth = filteredData[filteredData.length - 1];
    const firstTotal = firstMonth.visitors;
    const lastTotal = lastMonth.visitors;
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
            <CardTitle>Visitors</CardTitle>
            <CardDescription>
              {isSameMonth(monthState.startMonth, monthState.endMonth)
                ? formatDisplayDate(monthState.startMonth)
                : `Period ${formatDisplayDate(
                    monthState.startMonth
                  )} - ${formatDisplayDate(monthState.endMonth)}`}
            </CardDescription>
          </div>
          <MonthSelect />
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={filteredData} margin={{ top: 20 }}>
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
            <Bar dataKey="visitors" fill="var(--color-dekstop)" radius={4}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
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
