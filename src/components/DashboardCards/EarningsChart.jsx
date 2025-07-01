import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FaInfoCircle } from "react-icons/fa";
import { useEarningsSummary } from "../../hooks/useEarningsChart";
import EarningsChartSkeleton from "../skeleton/EarningsChartSkeleton";

export default function EarningsChart({ earnings }) {
  const gym_id = 1;
  const { data, isLoading, error } = useEarningsSummary(gym_id);

  if (isLoading) return <EarningsChartSkeleton />;

  if (error || !data) {
    return (
      <div className="text-center text-red-500 text-sm py-6">
        Failed to load chart.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-4xl mx-auto mt-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            Earnings <FaInfoCircle className="text-gray-400 text-sm" />
          </h2>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">
            ${earnings}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs sm:text-sm items-center flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-400 rounded-full"></span> Membership
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span> Payments
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[200px] sm:h-[250px] flex ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, bottom: 0, left: 0 }}
          >
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="membership"
              stroke="#f87171"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Memberships"
            />
            <Line
              type="monotone"
              dataKey="payments"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 2 }}
              name="Payments"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
