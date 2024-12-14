import { useCallback, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  format,
  eachMonthOfInterval,
  isBefore,
  isAfter,
  startOfYear,
  endOfYear,
} from "date-fns";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  const [monthState, setMonthState] = useState({
    startMonth: startOfYear(new Date()),
    endMonth: endOfYear(new Date()),
  });

  const months = useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    });
  }, []);

  const filteredData = useMemo(() => {
    return chartData.filter((_, i) => {
      const dateData = new Date(currentYear, i);
      return (
        (isAfter(dateData, monthState.startMonth) ||
          dateData.getTime() === monthState.startMonth.getTime()) &&
        (isBefore(dateData, monthState.endMonth) ||
          dateData.getTime() === monthState.endMonth.getTime())
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

  const handleStartMonthChange = useCallback(
    (value: string) => {
      const newStartMonth = new Date(value);
      setMonthState((m) => ({
        ...m,
        startMonth: newStartMonth,
      }));

      if (isAfter(newStartMonth, monthState.endMonth)) {
        setMonthState((m) => ({
          ...m,
          endMonth: newStartMonth,
        }));
      }
    },
    [monthState.endMonth]
  );

  const handleEndMonthChange = useCallback(
    (value: string) => {
      const newEndMonth = new Date(value);
      setMonthState((m) => ({
        ...m,
        endMonth: newEndMonth,
      }));

      if (isBefore(newEndMonth, monthState.startMonth)) {
        setMonthState((m) => ({
          ...m,
          startMonth: newEndMonth,
        }));
      }
    },
    [monthState.startMonth]
  );

  const formatSelectDate = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  const formatDisplayDate = (date: Date) => {
    return format(date, "MMMM yyyy");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>
              {monthState.startMonth.getTime() === monthState.endMonth.getTime()
                ? formatDisplayDate(monthState.startMonth)
                : `${formatDisplayDate(
                    monthState.startMonth
                  )} - ${formatDisplayDate(monthState.endMonth)}`}
            </CardDescription>
          </div>

          <div className="flex justify-between items-center gap-2">
            <Select
              value={formatSelectDate(monthState.startMonth)}
              onValueChange={handleStartMonthChange}
            >
              <SelectTrigger className="min-w-fit">
                <SelectValue placeholder="Start month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select Start Month</SelectLabel>
                  {months.map((month) => (
                    <SelectItem
                      key={`start-${formatSelectDate(month)}`}
                      value={formatSelectDate(month)}
                    >
                      {format(month, "MMMM")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Separator orientation="horizontal" className="w-2" />

            <Select
              value={formatSelectDate(monthState.endMonth)}
              onValueChange={handleEndMonthChange}
            >
              <SelectTrigger className="min-w-fit">
                <SelectValue placeholder="End month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select End Month</SelectLabel>
                  {months.map((month) => (
                    <SelectItem
                      key={`end-${formatSelectDate(month)}`}
                      value={formatSelectDate(month)}
                      disabled={isBefore(month, monthState.startMonth)}
                    >
                      {format(month, "MMMM")}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
