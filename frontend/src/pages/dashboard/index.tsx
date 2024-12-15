/** @components */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** @features */
import { Chart } from "@/features/dashboard/chart";
import { RecentBorrowers } from "@/features/dashboard/recent-borrowers";

/** @icons */
import { Users2 } from "lucide-react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full p-4 space-y-10">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex flex-wrap justify-between items-center gap-2">
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                  <Users2 size={20} />
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <h1 className="text-2xl font-bold">$45,231.89</h1>
              <p className="text-muted-foreground text-sm">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="min-h-fit grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-4">
        <Chart />
        <RecentBorrowers />
      </section>
    </div>
  );
};

export default DashboardPage;
