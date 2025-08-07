import React, { useState } from "react";
import { useCreatePlan } from "../../hooks/useCreatePlan";

import { CheckCircle } from "lucide-react";
import { useGymId } from "../../hooks/useGymId";
export default function AddPlans() {
  const { mutate, isPending, isSuccess, isError, error } = useCreatePlan();
  const gymId = useGymId();
  const [planData, setPlanData] = useState({
    planName: "",
    duration: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlanData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: planData.planName,
      duration_days: parseInt(planData.duration),
      price: parseFloat(planData.price),
    };

    mutate(
      { data: payload, gym_id: gymId },
      {
        onSuccess: (res) => {
          console.log("Plan added:", res);
          handleReset();
        },
        onError: (err) => {
          console.error("Error:", err);
        },
      }
    );
  };

  const handleReset = () => {
    setPlanData({
      planName: "",
      duration: "",
      price: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            {/* Logo Section */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PlanCraft
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Add New Plan
            </h1>
            <p className="text-gray-600">
              Create a subscription plan for your service
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Plan Name
              </label>
              <input
                type="text"
                name="planName"
                value={planData.planName}
                onChange={handleInputChange}
                placeholder="e.g., Premium Plan"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Duration (Days)
              </label>
              <input
                type="number"
                name="duration"
                value={planData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 30"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={planData.price}
                onChange={handleInputChange}
                placeholder="e.g., 29.99"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isPending ? "Creating ..." : "Create Plan"}
              </button>
            </div>
          </div>
          {isSuccess ? (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 mr-2" />
              <p>Plan registered successfully!</p>
            </div>
          ) : (
            error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center rounded-lg shadow-sm">
                <p>{error.message}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
