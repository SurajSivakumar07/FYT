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

  const handleActiveMembersClick = () => navigate("/members?status=active");
  const handleExpiringSoonClick = () => navigate("/members?status=expiring");
  const handleTotalMembersClick = () => navigate("/members?status=all");
  const handlePendingMemberClick = () =>
    navigate("/members?status=pending_balance");

  return (
    <div className="flex flex-col items-center px-2 sm:px-3 py-1 sm:py-2 bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-[calc(100vh-140px)] w-full overflow-x-hidden">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-md sm:max-w-lg md:max-w-2xl mb-3 sm:mb-4">
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

      {/* Lazy-loaded Chart */}
      <div ref={ref} className="w-full px-1 sm:px-2 max-w-4xl mb-3 sm:mb-4">
        <Suspense fallback={<EarningsChartSkeleton />}>
          {inView ? (
            <EarningsChart earnings={data ? data.earnings : "-"} />
          ) : (
            <EarningsChartSkeleton />
          )}
        </Suspense>
      </div>

      {/* Bottom Card */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 px-1 sm:px-2 max-w-4xl w-full">
        <StatCard
          title="Pending Balance"
          value={data ? data.pending_balance_members : "-"}
          color="text-red-600"
          arrow
          onClick={handlePendingMemberClick}
        />
      </div>
    </div>
  );
}
