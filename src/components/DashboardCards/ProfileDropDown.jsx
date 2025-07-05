import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProfileDropDown() {
  const [isOpen, setIsOpen] = useState(true);
  const modalRef = useRef();
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm"></div>
      )}

      {/* Floating Modal */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
        ref={modalRef}
      >
        <div className="bg-white rounded-3xl shadow-lg p-4 w-72 sm:w-80 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800 text-base">
              Quick Actions
            </h4>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex flex-col gap-3 text-sm text-gray-700">
            <button
              className="hover:bg-gray-100 rounded px-3 py-2 text-left"
              onClick={() => {
                setIsOpen(false);
                navigate("/add-member");
              }}
            >
              ➕ Add Member
            </button>
            <button
              className="hover:bg-gray-100 rounded px-3 py-2 text-left"
              onClick={() => {
                setIsOpen(false);
                navigate("/add-plan");
              }}
            >
              📋 Create Plan
            </button>
            <button
              className="hover:bg-gray-100 rounded px-3 py-2 text-left"
              onClick={() => {
                setIsOpen(false);
                navigate("/add-trainer");
              }}
            >
              🏋🏼 Add Trainer
            </button>
            <button
              className="hover:bg-gray-100 rounded px-3 py-2 text-left"
              onClick={() => {
                setIsOpen(false);
                navigate("/add-enquiry");
              }}
            >
              ? Add Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
