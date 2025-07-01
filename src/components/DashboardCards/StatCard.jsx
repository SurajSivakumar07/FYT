import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function StatCard({ title, value, color = "text-black" }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col gap-2 w-43 transition-all hover:shadow-md ">
      <h4 className="text-sm font-medium text-gray-800">{title}</h4>
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-semibold ${color}`}>{value}</span>
        <FaArrowRight className="text-gray-900 text-base" />
      </div>
    </div>
  );
}
