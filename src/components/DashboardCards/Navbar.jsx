import React, { useState, useRef, useEffect, use } from "react";

import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../services/supabase/supabase";
import {
  BarChart3,
  UserSearch,
  Dumbbell,
  ListOrdered,
  FileClock,
  LogOut,
  Settings,
} from "lucide-react";
import { useLogoutSession } from "../../hooks/logout/useLogout";
import { useGymData } from "../../hooks/gyms/useGymData";
import { useGymStore } from "../../zustand/store";
import GymModalSwitcher from "../selectGyms/GymSwitcher";
const Navbar = React.memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();
  const navigate = useNavigate();

  const { data: gym_data, isLoading: gym_data_loading, error } = useGymData();

  const queryClient = useQueryClient();
  const { mutateAsync: logoutSession, isLoading } = useLogoutSession();
  const handleLogout = async () => {
    setIsOpen(false);
    const sessionId = localStorage.getItem("session_id");

    try {
      await logoutSession(sessionId);
      await supabase.auth.signOut();
      queryClient.clear();
      localStorage.clear();

      navigate("/signin");
    } catch (err) {
      console.error("Logout flow failed:", err);
      // Errors already handled by the hook
    }
  };

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

  const multiple_gyms_list = useGymStore((state) => state.gyms);

  return (
    <>
      {/* <div className="w-full bg-white shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between"> */}
      {/* Left: Logo + Title */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between z-50">
        <div className="flex items-center gap-3">
          <img
            src={gym_data?.gym_photo}
            alt="logo"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div
            className="text-base sm:text-lg font-semibold text-black flex items-center gap-2 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            {gym_data?.name}
            {multiple_gyms_list.length > 1 && <GymModalSwitcher />}
          </div>
        </div>

        {/* Right: Icons */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <User />
        </div>
      </div>
      <div>
        {/* Backdrop */}
        {isOpen && (
          <div className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm"></div>
        )}

        {/* Floating Modal */}
        <div
          className={`absolute top-14 right-4 z-40 transition-all duration-300 ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          ref={modalRef}
        >
          <div className="bg-white rounded-xl shadow-lg p-4 w-39 border border-gray-200 text-center">
            {/* Logo Section */}

            {/* Action buttons */}
            <div className="flex flex-col gap-2 text-sm text-gray-700 text-left">
              {/* Analysis - Uncomment if needed */}

              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2 "
                onClick={() => {
                  setIsOpen(false);
                  navigate("/enquries");
                }}
              >
                <UserSearch size={18} />
                Enquiry
              </button>

              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/view-trainer");
                }}
              >
                <Dumbbell size={18} />
                Trainers
              </button>

              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/view-plans");
                }}
              >
                <ListOrdered size={18} />
                Plans
              </button>

              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/logs");
                }}
              >
                <FileClock size={18} />
                Logs
              </button>
              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/settings");
                }}
              >
                <Settings size={18} />
                Settings
              </button>

              <button
                className="hover:bg-gray-100 rounded-md px-3 py-2 flex items-center gap-2"
                onClick={handleLogout}
                disabled={isLoading}
              >
                <LogOut size={18} />
                {isLoading ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Navbar;
