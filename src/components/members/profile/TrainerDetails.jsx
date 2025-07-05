import React from "react";

const TrainerDetails = ({ trainerData, onAddDietChart }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
        <svg
          className="w-5 h-5 mr-2 text-softBlue"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        Trainer Details
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 uppercase">
            Trainer Name
          </label>
          <p className="font-medium text-black mt-2">{trainerData.name}</p>
        </div>
        <div>
          <label className="text-xs text-gray-500 uppercase">Trainer ID</label>
          <p className="font-medium text-black mt-2">
            {trainerData.trainer_id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
