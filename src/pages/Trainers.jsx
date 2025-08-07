import React, { useMemo, useState } from "react";
import { Edit3, Phone, Search, User, X } from "lucide-react";
import { PageLoader } from "../App";
import { useTrainers, useUpdateTrainer } from "../hooks/useTrainers";
import { useGymId } from "../hooks/useGymId";

function Trainers() {
  const gym_id = useGymId();
  const { mutate: updateTrainer, isPending: isUpdating } = useUpdateTrainer();

  const { data: trainers = [], isLoading } = useTrainers(gym_id);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    specialty: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const name = trainer?.name?.toLowerCase?.() || "";
      const specialty = trainer?.specialty?.toLowerCase?.() || "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || specialty.includes(search);
    });
  }, [trainers, searchTerm]);

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer.id);
    setEditForm({
      name: trainer.name || "",
      specialty: trainer.specialty || "",
      phone: trainer.phone || "",
    });
    setErrors({});
  };

  const handleSave = (trainerId) => {
    // Validation
    const newErrors = {};
    if (!editForm.name.trim()) newErrors.name = "Name is required";
    if (!editForm.specialty.trim())
      newErrors.specialty = "Specialty is required";
    if (!editForm.phone.trim()) newErrors.phone = "Phone is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateTrainer({
      id: trainerId,
      data: {
        name: editForm.name,
        specialty: editForm.specialty,
        phone: editForm.phone,
      },
    });
  };

  const handleCancel = () => {
    setEditingTrainer(null);
    setEditForm({ name: "", specialty: "", phone: "" });
    setErrors({});
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trainers</h1>
          <p className="text-gray-600">
            Manage your gym's professional trainers
          </p>
        </div>

        {/* Stats + Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold     text-black">
                  {trainers.length}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  Total Trainers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {filteredTrainers.length}
                </div>
                <div className="text-gray-600 text-sm font-medium">Showing</div>
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <input
                  type="text"
                  placeholder="Search trainers by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white/50 backdrop-blur-sm transition-all"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Trainers Display */}
        {filteredTrainers.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? "No trainers found" : "No trainers yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? "Try adjusting your search terms or browse all trainers"
                : "Add your first trainer to get started with your gym management"}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {editingTrainer === trainer.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Edit Trainer
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {trainer.id}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter trainer name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialty
                      </label>
                      <input
                        type="text"
                        value={editForm.specialty}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            specialty: e.target.value,
                          })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.specialty
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter specialty"
                      />
                      {errors.specialty && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.specialty}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSave(trainer.id)}
                        disabled={isUpdating}
                        // className="...opacity-80 disabled:cursor-not-allowed"
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                        <User className="w-8 h-8 text-indigo-600" />
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        ID: {trainer.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {trainer.name}
                    </h3>
                    <p className="text-indigo-600 font-medium mb-2">
                      {trainer.specialty}
                    </p>
                    <p className="text-sm text-gray-600 mb-6 flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {trainer.phone}
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          window.open(`tel:${trainer.phone}`, "_self")
                        }
                        className="flex-1  bg-black hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Phone className="h-4 w-4" />
                        Call
                      </button>
                      <button
                        onClick={() => handleEdit(trainer)}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trainers;
