import React from "react";
import { Lock } from "lucide-react"; // Make sure to install: `npm install lucide-react`

export default function Locked({
  message = "Access Restricted",
  subtext = "You don't have permission to view this content.",
  height = "h-[250px]",
  className = "",
}) {
  return (
    <div
      className={`relative rounded-xl shadow bg-white p-4 sm:p-6 w-full overflow-hidden ${height} ${className}`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
        <Lock className="w-8 h-8 text-gray-500 mb-2" />
        <p className="text-sm font-semibold text-gray-700">{message}</p>
        <p className="text-xs text-gray-500">{subtext}</p>
      </div>

      {/* Background dummy skeleton */}
      <div className="opacity-40 pointer-events-none select-none space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-full bg-gray-100 rounded" />
      </div>
    </div>
  );
}
