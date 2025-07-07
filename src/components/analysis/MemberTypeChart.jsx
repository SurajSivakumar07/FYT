import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemberTrend } from "../../hooks/useMemberTrend";
import { useGymId } from "../../hooks/useGymId";

export default function MemberTypeChart() {
  const gym_id = useGymId();
  const { data = [], isLoading, error } = useMemberTrend(gym_id);

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-4xl mx-auto  ">
      <h2 className="text-base font-semibold text-gray-900 mb-2">
        Member Types Joined
      </h2>
      <div className="h-[200px] sm:h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Regular" fill="#60a5fa" />
            <Bar dataKey="SM" fill="#34d399" />
            <Bar dataKey="PT" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
