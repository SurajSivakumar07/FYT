import { useState } from "react";
import { Building2, X, Repeat, MapPin, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGymStore } from "../../zustand/store";

export default function GymModalSwitcher() {
  const gyms = useGymStore((state) => state.gyms);
  const selectedGym = useGymStore((state) => state.selectedGym);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (gym) => {
    localStorage.setItem("gym_id", gym);
    setIsOpen(false);

    navigate("/");
    window.location.reload();
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  return (
    <>
      {/* Gym Info + Open Modal Icon */}
      <div
        className="flex items-center gap-2 cursor-pointer text-base sm:text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 h-4"
        onClick={() => setIsOpen(true)}
      >
        <Repeat
          size={10}
          className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        />
        <span className="hidden sm:inline">Switch Gym</span>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
          style={{
            animation: "fadeIn 0.3s ease-out",
          }}
        >
          <div
            className="bg-white w-full max-w-md rounded-xl shadow-2xl relative"
            style={{
              animation: "slideIn 0.3s ease-out",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Building2 size={20} className="text-blue-600" />
                </div>
                <h2 className="text-l font-bold text-gray-900">Select a Gym</h2>
              </div>

              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                onClick={handleModalClose}
              >
                <X size={20} />
              </button>
            </div>

            {/* Gym List */}
            <div className="max-h-80 overflow-y-auto py-2">
              {gyms.length === 0 ? (
                <div className="p-8 text-center">
                  <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No gyms available</p>
                </div>
              ) : (
                gyms.map((gym, index) => {
                  const isSelected = selectedGym?.gym_id === gym.gym_id;

                  return (
                    <div key={gym.gym_id}>
                      <div
                        onClick={() => handleSelect(gym.gym_id)}
                        className={`p-4 mx-3 my-2 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                          isSelected
                            ? "bg-blue-50 border-blue-200 shadow-sm"
                            : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3
                                className={`font-semibold ${
                                  isSelected ? "text-blue-900" : "text-gray-900"
                                }`}
                              >
                                {gym.name}
                              </h3>
                              {isSelected && (
                                <div className="p-1 bg-blue-600 rounded-full">
                                  <Check size={12} className="text-white" />
                                </div>
                              )}
                            </div>

                            <div className="flex items-start gap-2">
                              <MapPin
                                size={14}
                                className="text-gray-400 mt-0.5 flex-shrink-0"
                              />
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {gym.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle divider for items except last */}
                      {index < gyms.length - 1 && (
                        <div className="mx-6 border-b border-gray-100"></div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 rounded-b-xl border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Select a gym to switch your current location
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
