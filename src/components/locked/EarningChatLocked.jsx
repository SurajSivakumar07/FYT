import React from "react";
import { Lock } from "lucide-react"; // You can use any lock icon (lucide, heroicons, etc.)

export default function EarningsChartLocked() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full h-[300px] relative flex items-center justify-center opacity-60">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
        <Lock className="h-8 w-8 text-gray-500 mb-2" />
        <p className="text-sm text-gray-700 font-medium">Access Restricted</p>
        <p className="text-xs text-gray-500">Only for admins</p>
      </div>
      <div className="flex flex-col justify-between gap-4 w-full h-full animate-none">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-green-100 rounded w-1/4" />
        <div className="flex-1 bg-gray-100 rounded-md" />
      </div>
    </div>
  );
}
