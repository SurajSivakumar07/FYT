import React from "react";

const TrainerDetails = ({ trainerData, onAddDietChart }) => {
  const handleAddDietChart = () => {
    const url = prompt("Enter diet chart URL:");
    if (url) {
      onAddDietChart(url);
    }
  };

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
        <div className="sm:col-span-2">
          <label className="text-xs text-gray-500 uppercase">Diet Chart</label>
          <div className="flex items-center mt-2">
            {trainerData.diet_chart_url ? (
              <>
                <svg
                  className="w-4 h-4 mr-2 text-softBlue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.414-1.414m2.828-9.656l-4 4m0 0l-1.414 1.414a4 4 0 005.656 0l4-4"
                  ></path>
                </svg>
                <a
                  href={trainerData.diet_chart_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-softBlue hover:text-softBlue/80"
                >
                  View Diet Chart
                </a>
              </>
            ) : (
              <button
                onClick={handleAddDietChart}
                className="bg-softBlue text-white py-1.5 px-3 rounded-lg hover:bg-softBlue/90 flex items-center transition-all duration-200"
                aria-label="Add diet chart"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                Add Diet Chart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
