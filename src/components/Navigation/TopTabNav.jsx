import React from "react";
import { NavLink } from "react-router-dom";

const tabs = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Members", path: "/members" },
  { name: "Earnings", path: "/earnings" },
  { name: "Settings", path: "/settings" },
];

export default function TopTabNav() {
  return (
    <div className="w-full bg-gray-900 px-4 py-2 flex gap-6 text-sm sm:text-base">
      {tabs.map((tab) => (
        <NavLink
          key={tab.name}
          to={tab.path}
          className={({ isActive }) =>
            `pb-2 transition-all ${
              isActive
                ? "text-white font-semibold border-b-2 border-purple-500"
                : "text-gray-400 hover:text-white"
            }`
          }
        >
          {tab.name}
        </NavLink>
      ))}
    </div>
  );
}
