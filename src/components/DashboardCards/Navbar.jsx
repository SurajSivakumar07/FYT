import React from "react";
import { FaBell, FaQuestionCircle, FaChevronDown } from "react-icons/fa";
import profile from "../../assets/profile.jpg";
import gymLogo from "../../assets/gym_logo.jpg";
export default function Navbar() {
  return (
    <div className="w-full bg-white shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Title */}
      <div className="flex items-center gap-3">
        <img
          src={gymLogo}
          alt="logo"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-1">
          Fitness center central
        </div>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <img
          src={profile} // Replace with your avatar path
          alt="user"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
