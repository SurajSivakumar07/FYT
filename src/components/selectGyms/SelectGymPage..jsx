import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetGym } from "../../hooks/gyms/useGymData";
import { useGymStore } from "../../zustand/store";
import { CheckCircle, MapPin, Loader2, ArrowLeft } from "lucide-react";

export default function SelectGymPage() {
  const location = useLocation();
  const gyms = location.state?.gyms || [];

  const [selectedGym, setSelectedGym] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loadingGym, setLoadingGym] = useState(null);
  const navigate = useNavigate();
  const setGyms = useGymStore((state) => state.setGyms);

  const url = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const gyms_data = useGymStore((state) => state.gyms);

  useEffect(() => {
    setGyms(gyms);
    console.log("Received gyms:", gyms);
    console.log("the gyms Data", gyms_data);
  }, [gyms]);

  const handleSelect = async (gym_id) => {
    setIsSubmitting(true);
    try {
      localStorage.setItem("gym_id", gym_id);

      setSelectedGym(gyms);

      navigate("/", { state: { gyms: gyms } });
    } catch (err) {
      console.error("Failed to set gym:", err);
      alert("Failed to select gym. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleBack = () => {
    console.log("Would navigate back");
    // navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Select Your Gym
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Choose from {gyms.length} available locations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {gyms.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Gyms Available
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any gym locations associated with your account.
              Please contact support for assistance.
            </p>
            <button
              onClick={handleBack}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gyms.map((gym) => {
              const isSelected = selectedGym === gym.gym_id;
              const isLoading = loadingGym === gym.gym_id;
              const isDisabled = isSubmitting;

              return (
                <div
                  key={gym.gym_id}
                  className={`relative group transition-all duration-300 ${
                    isDisabled && !isLoading ? "opacity-60" : ""
                  }`}
                >
                  <button
                    onClick={() => handleSelect(gym.gym_id, gym.name)}
                    disabled={isDisabled}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 transform ${
                      isSelected
                        ? "border-green-500 bg-green-50 shadow-lg scale-105"
                        : isLoading
                        ? "border-blue-500 bg-blue-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md hover:-translate-y-1"
                    } ${
                      isDisabled && !isLoading
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    {/* Status Icons */}
                    <div className="absolute top-4 right-4">
                      {isLoading && (
                        <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                      )}
                      {isSelected && !isLoading && (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      )}
                    </div>

                    {/* Gym Image */}
                    {gym.gym_photo && (
                      <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={gym.gym_photo}
                          alt={`${gym.name} photo`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Gym Info */}
                    <div className="space-y-2">
                      <h3
                        className={`text-xl font-semibold transition-colors ${
                          isSelected ? "text-green-800" : "text-gray-900"
                        }`}
                      >
                        {gym.name}
                      </h3>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {gym.address}
                        </span>
                      </div>
                    </div>

                    {/* Loading State Overlay */}
                    {isLoading && (
                      <div className="absolute inset-0 bg-white bg-opacity-50 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
                          <p className="text-sm font-medium text-blue-800">
                            Selecting gym...
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Success State Content */}
                    {isSelected && !isLoading && (
                      <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            Gym selected successfully!
                          </span>
                        </div>
                        <p className="text-xs text-green-700 mt-1">
                          Redirecting you to the dashboard...
                        </p>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Progress Indicator */}
        {isSubmitting && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-white rounded-full shadow-lg border px-6 py-3 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span className="text-sm font-medium text-gray-800">
                Setting up your gym...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
