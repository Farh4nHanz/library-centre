/** @features */
import { Chart } from "@/features/dashboard/chart";
import { RecentBorrowers } from "@/features/dashboard/recent-borrowers";
import { Statistics } from "@/features/dashboard/statistics";

/** @constants */
import { libraryStats } from "@/features/dashboard/constants";

const DashboardPage = () => {
  return (
    <div className="min-h-screen w-full p-4 space-y-10">
      <section className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
        <Statistics stats={libraryStats} />
      </section>

      <section className="min-h-fit grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-4">
        <Chart />
        <RecentBorrowers />
      </section>
    </div>
  );
};

export default DashboardPage;
