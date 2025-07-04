import StatCard from "../components/DashboardCards/StatCard";
import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import EarningsChartSkeleton from "../components/skeleton/EarningsChartSkeleton";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

import { useNavigate } from "react-router-dom";

const EarningsChart = React.lazy(() =>
  import("../components/DashboardCards/EarningsChart")
);

export default function Dashboard() {
  const gym_id = 1;
  const { data, isLoading } = useDashboardSummary(gym_id);
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Move onClick handlers out of JSX to avoid inline function creation
  const handleActiveMembersClick = () => navigate("/members?status=active");
  const handleExpiringSoonClick = () => navigate("/members?status=expiring");
  const handleTotalMembersClick = () => navigate("/members?status=all");

  return (
    <div className="flex flex-col items-center p-1 bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen w-full overflow-x-hidden">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md overflow-x-hidden max-w-full">
        <StatCard
          title="Active members"
          value={data ? data.active_members : "-"}
          color="text-blue-600"
          arrow
          onClick={handleActiveMembersClick}
        />
        <StatCard
          title="Expiring in 10 days"
          value={data ? data.expiring_soon : "-"}
          color="text-red-500"
          arrow
          onClick={handleExpiringSoonClick}
        />
        <StatCard title="Earnings" value={data ? data.earnings : "-"} info />
        <StatCard
          title="Total members"
          value={data ? data.total_members : "-"}
          arrow
          onClick={handleTotalMembersClick}
        />
      </div>

      {/* 👇 Important: Attach `ref` to a wrapping div */}
      <div
        ref={ref}
        className="w-full max-w-4xl mt-6 px-3 overflow-x-hidden max-w-full"
      >
        <Suspense fallback={<EarningsChartSkeleton />}>
          {inView ? (
            <EarningsChart earnings={data ? data.earnings : "-"} />
          ) : (
            <EarningsChartSkeleton />
          )}
        </Suspense>
      </div>
    </div>
  );
}
