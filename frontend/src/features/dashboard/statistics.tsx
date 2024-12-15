/** @types */
import { type StatisticProps } from "@/types/props-type";

/** @components */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Statistics = ({ stats }: StatisticProps) => {
  return stats?.map((stat, i) => (
    <Card key={i}>
      <CardHeader>
        <div className="flex flex-wrap justify-between items-center gap-2">
          <CardTitle>{stat.title}</CardTitle>
          <CardDescription>
            <stat.icon className="size-4" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-bold">{stat.value}</h1>
        <p className="text-muted-foreground text-sm">
          {stat.change.value >= 0 ? "+" : ""}
          {stat.change.value}% from {stat.change.timeframe}
        </p>
      </CardContent>
    </Card>
  ));
};
