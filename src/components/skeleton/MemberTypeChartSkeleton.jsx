import React from "react";

export default function MemberTypeChartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-4xl mx-auto animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-[200px] sm:h-[250px] bg-gray-100 rounded" />
    </div>
  );
}
