import React from "react";

export default function EarningsChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse w-full h-[300px] flex flex-col justify-between gap-4">
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-8 bg-gray-300 rounded w-1/2" />
      <div className="h-4 bg-green-100 rounded w-1/4" />
      <div className="flex-1 bg-gray-100 rounded-md" />
    </div>
  );
}
