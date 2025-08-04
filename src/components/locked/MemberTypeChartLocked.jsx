import React from "react";
import { Lock } from "lucide-react"; // Optional: install with `npm install lucide-react`

export default function MemberTypeChartLocked() {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 w-full max-w-4xl mx-auto relative opacity-60">
      {/* Overlay lock message */}
      <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <Lock className="w-8 h-8 text-gray-500 mb-2" />
        <p className="text-sm text-gray-700 font-medium">Access Restricted</p>
        <p className="text-xs text-gray-500">Only for admins</p>
      </div>

      {/* Placeholder skeleton (blurred behind) */}
      <div className="animate-none">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-[200px] sm:h-[250px] bg-gray-100 rounded" />
      </div>
    </div>
  );
}
