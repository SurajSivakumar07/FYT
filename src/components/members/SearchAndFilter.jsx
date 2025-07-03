import React, { useState, useRef, useEffect } from "react";

export default function SearchAndFilter({
  search,
  setSearch,
  type,
  setType,
  statusFilter,
  setStatusFilter,
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeFiltersCount =
    (search ? 1 : 0) + (type ? 1 : 0) + (statusFilter ? 1 : 0);

  const memberTypes = [
    { value: "", label: "All Member Types", icon: "👥" },
    { value: "pt", label: "Personal Trainer", icon: "🏋️" },
    { value: "sm", label: "Strength Member", icon: "💪" },
    { value: "regular", label: "Regular Member", icon: "👤" },
  ];

  const activityStatusOptions = [
    { value: "", label: "All Status", icon: "📋" },
    { value: "active", label: "Active", icon: "✅" },
    { value: "expired", label: "Expired", icon: "❌" },
    { value: "expiring", label: "Expiring Soon", icon: "⏳" },
  ];

  const selectedType =
    memberTypes.find((item) => item.value === type) || memberTypes[0];

  const clearAllFilters = () => {
    setSearch("");
    setType("");
    setStatusFilter("");
    setIsFilterOpen(false);
  };

  const handleTypeSelect = (value) => {
    setType(value);
    setIsDropdownOpen(false);
  };

  const handleStatusSelect = (value) => {
    setStatusFilter(value);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when filter panel opens
  useEffect(() => {
    if (isFilterOpen) {
      setIsDropdownOpen(false);
    }
  }, [isFilterOpen]);

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg
                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setIsDropdownOpen(!isDropdownOpen);
              setIsFilterOpen(false);
            }}
            className={`relative p-3 rounded-lg border transition-all ${
              isDropdownOpen || activeFiltersCount > 0
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
            }`}
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
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-200 ${
              isDropdownOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-2 invisible"
            }`}
          >
            <div className="p-4">
              {/* Type Filter */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Filter by Type
                  </h4>
                  {type && (
                    <button
                      onClick={() => setType("")}
                      className="text-xs text-blue-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {memberTypes.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTypeSelect(option.value)}
                      className={`w-full px-3 py-2 text-left rounded-lg flex items-center gap-3 ${
                        type === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Status Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Filter by Status
                  </h4>
                  {statusFilter && (
                    <button
                      onClick={() => setStatusFilter("")}
                      className="text-xs text-blue-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {activityStatusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleStatusSelect(option.value)}
                      className={`w-full px-3 py-2 text-left rounded-lg flex items-center gap-3 ${
                        statusFilter === option.value
                          ? "bg-blue-50 text-blue-700"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filter Tags */}
      {activeFiltersCount > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="font-medium">Active Filters:</span>
          {search && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              "{search}"
              <button
                onClick={() => setSearch("")}
                className="ml-1 text-blue-600"
              >
                ✕
              </button>
            </span>
          )}
          {type && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
              {type === "pt"
                ? "🏋️ Trainer"
                : type === "sm"
                ? "💪 Strength"
                : "👤 Regular"}
              <button
                onClick={() => setType("")}
                className="ml-1 text-green-600"
              >
                ✕
              </button>
            </span>
          )}
          {statusFilter && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
              {statusFilter === "active"
                ? "✅ Active"
                : statusFilter === "expired"
                ? "❌ Expired"
                : "⏳ Expiring"}
              <button
                onClick={() => setStatusFilter("")}
                className="ml-1 text-yellow-600"
              >
                ✕
              </button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="ml-auto text-red-600 hover:underline text-xs"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
