import StatCard from "../components/DashboardCards/StatCard";
import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import EarningsChartSkeleton from "../components/skeleton/EarningsChartSkeleton";
import { useDashboardSummary } from "../hooks/useDashboardSummary";

import { useNavigate } from "react-router-dom";
import MemberTypeChartSkeleton from "../components/skeleton/MemberTypeChartSkeleton";
import { useGymId } from "../hooks/useGymId";

import EarningsChartLocked from "../components/locked/EarningChatLocked";
import MemberTypeChartLocked from "../components/locked/MemberTypeChartLocked";
import { useUserStore } from "../zustand/store";

const EarningsChart = React.lazy(() =>
  import("../components/DashboardCards/EarningsChart")
);
const MemberTypeChart = React.lazy(() =>
  import("../components/analysis/MemberTypeChart")
);
export default function Dashboard() {
  const gym_id = useGymId();
  const { data, isLoading } = useDashboardSummary(gym_id);

  const user = useUserStore((state) => state.user);

  const navigate = useNavigate();

  const { ref: earningsRef, inView: earningsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: memberTypeRef, inView: memberTypeInView } = useInView({
    triggerOnce: true,
  });

  const handleActiveMembersClick = () => navigate("/members?status=active");
  const handleExpiringSoonClick = () =>
    navigate("/members?status=expiringsoon");
  const handleTotalMembersClick = () => navigate("/members?status=all");
  const handlePendingMemberClick = () =>
    navigate("/members?status=pendingbalance");

  return (
    <div className="flex flex-col items-center px-3 py-2 bg-gradient-to-br from-blue-50 via-white to-purple-100  w-full overflow-x-hidden">
      {/* Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-md sm:max-w-lg md:max-w-2xl">
        <StatCard
          title="Active members"
          value={data ? data.activeMembers : "-"}
          color="text-blue-600"
          arrow
          onClick={handleActiveMembersClick}
        />
        <StatCard
          title="Expiring in 10 days"
          value={isLoading ? "..." : data?.expiringSoon}
          color="text-red-500"
          arrow
          onClick={handleExpiringSoonClick}
        />
        {/* <StatCard title="Earnings" value={data ? data.earnings : "-"} info /> */}
        <StatCard
          title="Total members"
          value={data ? data.totalMembers : "-"}
          arrow
          onClick={handleTotalMembersClick}
        />
        <StatCard
          title="Pending Balance"
          value={data ? data.pending_balance_members : "-"}
          color="text-red-600"
          arrow
          onClick={handlePendingMemberClick}
        />
      </div>

      {/* Lazy-loaded Chart */}
      <div ref={earningsRef} className="w-full mt-6 px-2 sm:px-4 max-w-4xl">
        <Suspense fallback={<EarningsChartSkeleton />}>
          {memberTypeInView ? (
            user?.role !== "trainer" ? (
              <EarningsChart earnings={data ? data.earnings : "-"} />
            ) : (
              <EarningsChartLocked />
            )
          ) : (
            <EarningsChartSkeleton />
          )}
        </Suspense>
      </div>
      {/* Lazy-loaded Chart */}

      <div ref={memberTypeRef} className="w-full mt-6 px-2 sm:px-4 max-w-4xl">
        <Suspense fallback={<MemberTypeChartSkeleton />}>
          {memberTypeInView ? (
            user?.role !== "trainer" ? (
              <MemberTypeChart />
            ) : (
              <MemberTypeChartLocked />
            )
          ) : (
            <MemberTypeChartSkeleton />
          )}
        </Suspense>
      </div>
      {/* Bottom Card */}
    </div>
  );
}
