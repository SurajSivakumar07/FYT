import Navbar from "../components/DashboardCards/Navbar";
import StatCard from "../components/DashboardCards/StatCard";
import React, { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EarningsChartSkeleton from "../components/skeleton/EarningsChartSkeleton";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";
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
  const handleExpiryClick = () => {
    navigate("/members?status=expired");
  };

  return (
    <div className="flex flex-col items-center p-1  bg-gradient-to-br from-blue-50 via-white to-purple-100  h-min-100vh overflow-x-hidden">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        <StatCard
          title="Active members"
          value={data ? data.active_members : "-"}
          color="text-blue-600"
          arrow
          onClick={() => navigate("/members?status=active")}
        />
        <StatCard
          title="Expiring in 10 days"
          value={data ? data.expiring_soon : "-"}
          color="text-red-500"
          arrow
          onClick={() => navigate("/members?status=expiring")}
        />
        <StatCard title="Earnings" value={data ? data.earnings : "-"} info />
        <StatCard
          title="Total members"
          value={data ? data.total_members : "-"}
          arrow
          onClick={() => navigate("/members?status=all")}
        />
      </div>

      {/* 👇 Important: Attach `ref` to a wrapping div */}
      <div ref={ref} className="w-full max-w-4xl mt-6 px-3">
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
