import React from "react";
import { FileText, Eye } from "lucide-react";

const DietChart = ({ dietChartUrl }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        <FileText className="w-5 h-5 mr-2 text-indigo-600" />
        Diet Chart
      </h2>
      {dietChartUrl ? (
        <a
          href={dietChartUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Diet Chart
        </a>
      ) : (
        <button
          onClick={() => {
            const url = prompt("Please enter a diet chart URL:");
            if (url) window.location.href = url; // Open link directly
          }}
          className="bg-indigo-600 text-white py-1.5 px-3 rounded-lg hover:bg-indigo-700 flex items-center transition-colors"
        >
          <FileText className="w-4 h-4 mr-2" />
          Add Diet Chart Link
        </button>
      )}
    </div>
  );
};

export default DietChart;
