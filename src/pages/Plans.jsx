import React, { useMemo, useState } from "react";
//

import { usePlans } from "../hooks/usePlans";
import { PageLoader } from "../App";
import { useGymId } from "../hooks/useGymId";

function Plans() {
  const gym_id = useGymId();
  const { data: plans = [], isLoading } = usePlans(gym_id);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const name = plan?.name?.toLowerCase?.() || "";
      const duration = plan?.duration_days?.toString() || "";
      const amount = plan?.price?.toString() || "";
      const search = searchTerm.toLowerCase();
      return (
        name.includes(search) ||
        duration.includes(search) ||
        amount.includes(search)
      );
    });
  }, [plans, searchTerm]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Plans</h1>
          <p className="text-gray-600 text-lg">View all available plans</p>
        </div>

        {/* Stats + Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {plans.length}
                </div>
                <div className="text-gray-600 text-sm">Total Plans</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {filteredPlans.length}
                </div>
                <div className="text-gray-600 text-sm">Showing</div>
              </div>
            </div>

            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Plan Cards */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            {searchTerm ? "No matching plans found." : "No plans available."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-gray-500">ID: {plan.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <p className="text-indigo-600 mb-2">
                  Duration: {plan.duration_days} Days
                </p>
                <p className="text-sm text-gray-700 font-semibold">
                  ₹ {parseFloat(plan.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Plans;
