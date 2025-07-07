import React, { useMemo, useState } from "react";
import { useTrainers } from "../hooks/useTrainers";
import { PageLoader } from "../App";

import { useNavigate } from "react-router-dom";
import { useGymId } from "../hooks/useGymId";

function Trainers() {
  const gym_id = useGymId();
  const { data: trainers = [], isLoading } = useTrainers(gym_id);

  const [searchTerm, setSearchTerm] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const name = trainer?.name?.toLowerCase?.() || "";
      const specialty = trainer?.specialty?.toLowerCase?.() || "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || specialty.includes(search);
    });
  }, [trainers, searchTerm]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        {/* Stats + Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {trainers.length}
                </div>
                <div className="text-gray-600 text-sm">Total Trainers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {filteredTrainers.length}
                </div>
                <div className="text-gray-600 text-sm">Showing</div>
              </div>
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <input
                  type="text"
                  placeholder="Search trainers..."
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

              <button
                onClick={() => navigate("/add-trainer")}
                className=" bg-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Trainer
              </button>
            </div>
          </div>
        </div>

        {/* Add Trainer Form */}

        {/* Trainers Display */}
        {filteredTrainers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms"
                : "No trainers found. Add your first trainer to get started."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">
                    ID: {trainer.id}
                  </span>
                </div>
                <h3 className="text-xl font-semibold">{trainer.name}</h3>
                <p className="text-indigo-600 mb-2">{trainer.specialty}</p>
                <p className="text-sm text-gray-600 mb-4">{trainer.phone}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(`tel:${trainer.phone}`, "_self")}
                    className="flex-1 bg-white- text-black  px-4 py-2 rounded hover:bg-indigo-200 border"
                  >
                    Call
                  </button>
                  {/* <button
                    onClick={() => deleteTrainer(trainer.id)}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200"
                  >
                    Delete
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Trainers;
