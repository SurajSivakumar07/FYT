import React, { useState, useRef, useEffect, useCallback, memo } from "react";

const SearchAndFilter = memo(
  ({
    search,
    setSearch,
    type,
    setType,
    statusFilter,
    setStatusFilter,
    month,
    setMonth,
    year,
    setYear,
  }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const activeFiltersCount =
      (search ? 1 : 0) +
      (type ? 1 : 0) +
      (statusFilter !== "all" ? 1 : 0) +
      (month ? 1 : 0);
    const handleMonthSelect = useCallback(
      (value) => {
        setMonth(value);
        setIsDropdownOpen(false);
      },
      [setMonth]
    );

    const monthOptions = [
      { value: "", label: "All Months", icon: "📅" },
      { value: "01", label: "January", icon: "❄️" },
      { value: "02", label: "February", icon: "❤️" },
      { value: "03", label: "March", icon: "🌼" },
      { value: "04", label: "April", icon: "🌸" },
      { value: "05", label: "May", icon: "☀️" },
      { value: "06", label: "June", icon: "🌿" },
      { value: "07", label: "July", icon: "🎆" },
      { value: "08", label: "August", icon: "🏖️" },
      { value: "09", label: "September", icon: "🍂" },
      { value: "10", label: "October", icon: "🎃" },
      { value: "11", label: "November", icon: "🍁" },
      { value: "12", label: "December", icon: "🎄" },
    ];

    const memberTypes = [
      { value: "", label: "All Member Types", icon: "👥" },
      { value: "pt", label: "Personal Trainer", icon: "🏋️" },
      { value: "sm", label: "Strength Member", icon: "💪" },
      { value: "regular", label: "Regular Member", icon: "👤" },
    ];

    const activityStatusOptions = [
      { value: "all", label: "All Status", icon: "📋" },
      { value: "active", label: "Active", icon: "✅" },
      { value: "expired", label: "Expired", icon: "❌" },
      { value: "expiring", label: "Expiring Soon", icon: "⏳" },
    ];
    const yearOptions = [
      { value: "", label: "All Years", icon: "📆" },
      { value: "2024", label: "2024", icon: "📅" },
      { value: "2025", label: "2025", icon: "📅" },
      // Add more as needed
    ];
    // Memoized handlers to prevent unnecessary re-renders
    const clearAllFilters = useCallback(() => {
      setSearch("");
      setType("");
      setStatusFilter("all");
      setMonth("");
      setIsFilterOpen(false);
    }, [setSearch, setType, setStatusFilter, setMonth]);

    const handleTypeSelect = useCallback(
      (value) => {
        setType(value);
        setIsDropdownOpen(false);
      },
      [setType]
    );

    const handleStatusSelect = useCallback(
      (value) => {
        setStatusFilter(value);
        setIsDropdownOpen(false);
      },
      [setStatusFilter]
    );

    const handleSearchChange = useCallback(
      (e) => {
        setSearch(e.target.value);
      },
      [setSearch]
    );

    const handleSearchClear = useCallback(() => {
      setSearch("");
    }, [setSearch]);

    const toggleDropdown = useCallback(() => {
      setIsDropdownOpen(!isDropdownOpen);
      setIsFilterOpen(false);
    }, [isDropdownOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
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
                aria-hidden="true"
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
              placeholder="Search by name or phone..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all duration-200"
              aria-label="Search members"
            />
            {search && (
              <button
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-100 rounded-r-lg transition-colors duration-200"
                aria-label="Clear search"
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
              onClick={toggleDropdown}
              className={`relative p-3 rounded-lg border transition-all duration-200 ${
                isDropdownOpen || activeFiltersCount > 0
                  ? "bg-blue-50 border-blue-200 text-blue-600 shadow-md"
                  : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100 hover:shadow-sm"
              }`}
              aria-label={`Filter options ${
                activeFiltersCount > 0 ? `(${activeFiltersCount} active)` : ""
              }`}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
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
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden transition-all duration-200 ${
                isDropdownOpen
                  ? "opacity-100 translate-y-0 visible"
                  : "opacity-0 -translate-y-2 invisible"
              }`}
              role="menu"
              aria-hidden={!isDropdownOpen}
            >
              <div className="p-5">
                {/* Type Filter */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Filter by Type
                    </h4>
                    {type && (
                      <button
                        onClick={() => setType("")}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
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
                        className={`w-full px-3 py-2.5 text-left rounded-lg flex items-center gap-3 transition-all duration-200 ${
                          type === option.value
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                        role="menuitem"
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Year Filter */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Filter by Join Year
                    </h4>
                    {year && (
                      <button
                        onClick={() => setYear("")}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {yearOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setYear(option.value)}
                        className={`w-full px-3 py-2.5 text-left rounded-lg flex items-center gap-3 transition-all duration-200 ${
                          year === option.value
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 border border-transparent"
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
                {/* Calendar Filter */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Filter by Join Month
                    </h4>
                    {month && (
                      <button
                        onClick={() => setMonth("")}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {monthOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleMonthSelect(option.value)}
                        className={`w-full px-3 py-2.5 text-left rounded-lg flex items-center gap-3 transition-all duration-200 ${
                          month === option.value
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                        role="menuitem"
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
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Filter by Status
                    </h4>
                    {statusFilter !== "all" && (
                      <button
                        onClick={() => setStatusFilter("all")}
                        className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
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
                        className={`w-full px-3 py-2.5 text-left rounded-lg flex items-center gap-3 transition-all duration-200 ${
                          statusFilter === option.value
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "hover:bg-gray-50 border border-transparent"
                        }`}
                        role="menuitem"
                      >
                        <span className="text-lg">{option.icon}</span>
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Clear All Button */}
                {activeFiltersCount > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={clearAllFilters}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-600">
            <span className="font-medium text-gray-700">Active Filters:</span>
            {search && (
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2">
                <span className="font-medium">"{search}"</span>
                <button
                  onClick={handleSearchClear}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Remove search filter"
                >
                  ✕
                </button>
              </span>
            )}
            {type && (
              <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full flex items-center gap-2">
                <span className="font-medium">
                  {type === "pt"
                    ? "🏋️ Trainer"
                    : type === "sm"
                    ? "💪 Strength"
                    : "👤 Regular"}
                </span>
                <button
                  onClick={() => setType("")}
                  className="text-green-600 hover:text-green-800 transition-colors"
                  aria-label="Remove type filter"
                >
                  ✕
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2">
                <span className="font-medium">
                  {statusFilter === "active"
                    ? "✅ Active"
                    : statusFilter === "expired"
                    ? "❌ Expired"
                    : "⏳ Expiring"}
                </span>
                <button
                  onClick={() => setStatusFilter("all")}
                  className="text-yellow-600 hover:text-yellow-800 transition-colors"
                  aria-label="Remove status filter"
                >
                  ✕
                </button>
              </span>
            )}
            {month && (
              <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2">
                <span className="font-medium">
                  📅 {monthOptions.find((m) => m.value === month)?.label}
                </span>
                <button
                  onClick={() => setMonth("")}
                  className="text-purple-600 hover:text-purple-800 transition-colors"
                  aria-label="Remove month filter"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

SearchAndFilter.displayName = "SearchAndFilter";

export default SearchAndFilter;
