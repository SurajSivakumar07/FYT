import Navbar from "../components/DashboardCards/Navbar";
import StatCard from "../components/DashboardCards/StatCard";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EarningsChartSkeleton from "../components/skeleton/EarningsChartSkeleton";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";

const EarningsChart = React.lazy(() =>
  import("../components/DashboardCards/EarningsChart")
);

export default function Dashboard() {
  const gym_id = 1;
  const { data, isLoading } = useDashboardSummary(gym_id);

  useEffect(() => {
    console.log(data);
  });

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="flex flex-col items-center p-1 bg-gray-50 h-min-100vh overflow-x-hidden">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        <StatCard
          title="Active members"
          value={data ? data.active_members : "-"}
          color="text-blue-600"
          arrow
        />
        <StatCard
          title="Expiring in 10 days"
          value={data ? data.expiring_soon : "-"}
          color="text-red-500"
          arrow
        />
        <StatCard title="Earnings" value={data ? data.earnings : "-"} info />
        <StatCard
          title="Total members"
          value={data ? data.total_members : "-"}
          arrow
        />
      </div>

      {/* 👇 Important: Attach `ref` to a wrapping div */}
      <div ref={ref} className="w-full max-w-4xl mt-6">
        <Suspense fallback={<EarningsChartSkeleton />}>
          {inView ? (
            <EarningsChart earnings={data ? data.earnings : "-"} />
          ) : (
            <EarningsChartSkeleton />
          )}
        </Suspense>
      </div>
      <VirtualizedMemberList />
    </div>
  );
}
