import { Home, Plus, User, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function BottomNav() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
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
                navigate("/log-payment");
              }}
            >
              💰 Log Payment
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-10 bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-full px-8 py-3">
          <NavLink to="/" className="group">
            <Home className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors" />
          </NavLink>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="bg-black text-white p-3 rounded-full shadow-lg flex items-center justify-center -mt-8 border-4 border-white"
          >
            <Plus className="w-6 h-6" />
          </button>

          <NavLink to="/members" className="group">
            <User className="w-6 h-6 text-gray-500 group-hover:text-black transition-colors" />
          </NavLink>
        </div>
      </nav>
    </>
  );
}
