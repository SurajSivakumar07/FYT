import React, { useMemo, useState } from "react";
import { Edit3, Search, Calendar, DollarSign, X } from "lucide-react";
import { usePlans, useUpdatePlan } from "../hooks/usePlans";
import { useGymId } from "../hooks/useGymId";
import { PageLoader } from "../App";

function Plans() {
  const gym_id = useGymId();
  const { data: plans = [], isLoading } = usePlans(gym_id);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingPlan, setEditingPlan] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    duration_days: "",
    price: "",
  });
  const { mutate: updatePlan, isLoading: PlansUpdate } = useUpdatePlan();

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

  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setEditForm({
      name: plan.name,
      duration_days: plan.duration_days.toString(),
      price: plan.price.toString(),
    });
    setShowEditModal(true);
  };
  const handleEditSubmit = () => {
    console.log("Updating plan:", editingPlan.id, editForm);

    const payload = {
      ...editForm,
      price: parseFloat(editForm.price),
      duration_days: parseInt(editForm.duration_days),
    };

    updatePlan({
      planId: editingPlan.id,
      updatedData: payload,
    });

    setShowEditModal(false);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingPlan(null);
    setEditForm({ name: "", duration_days: "", price: "" });
  };

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br   p-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold  bg-black bg-clip-text text-transparent mb-3">
            Membership Plans
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Manage and view all available plans
          </p>
        </div>

        {/* Enhanced Stats + Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="text-center group">
                <div className="text-4xl font-bold text-black-600 group-hover:scale-110 transition-transform">
                  {plans.length}
                </div>
                <div className="text-slate-500 text-sm font-medium">
                  Total Plans
                </div>
              </div>
              <div className="h-12 w-px bg-slate-200"></div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-black-600 group-hover:scale-110 transition-transform">
                  {filteredPlans.length}
                </div>
                <div className="text-slate-500 text-sm font-medium">
                  Showing
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search plans by name, duration, or price..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/70 backdrop-blur-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Plan Cards */}
        {filteredPlans.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">🏋️</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {searchTerm ? "No matching plans found" : "No plans available"}
              </h3>
              <p className="text-slate-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Start by adding your first plan"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">
                      #{plan.id}
                    </span>
                    <button
                      onClick={() => handleEditClick(plan)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-indigo-100 rounded-lg"
                    >
                      <Edit3 className="h-4 w-4 text-black-600" />
                    </button>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-indigo-600 transition-colors">
                    {plan.name}
                  </h3>

                  {/* Plan Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Duration
                        </p>
                        <p className="text-indigo-600 font-semibold">
                          {plan.duration_days} Days
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">
                          Price
                        </p>
                        <p className="text-green-600 font-bold text-lg">
                          ₹{parseFloat(plan.price).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleEditClick(plan)}
                    className="w-full mt-6 py-3   bg-blue-600   text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Edit Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Plan</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  value={editForm.duration_days}
                  onChange={(e) =>
                    setEditForm({ ...editForm, duration_days: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="flex-1 px-4 py-3 bg-blue-600   text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Plans;
