// import React, { useState, useRef, useEffect, useCallback, memo } from "react";

// const SearchAndFilter = memo(
//   ({
//     search,
//     setSearch,
//     type,
//     setType,
//     statusFilter,
//     setStatusFilter,
//     month,
//     setMonth,
//     year,
//     setYear,
//   }) => {
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);

//     const activeFiltersCount =
//       (search ? 1 : 0) +
//       (type ? 1 : 0) +
//       (statusFilter !== "all" ? 1 : 0) +
//       (month ? 1 : 0) +
//       (year ? 1 : 0);

//     const handleMonthSelect = useCallback(
//       (value) => {
//         setMonth(value);
//         setIsDropdownOpen(false);
//       },
//       [setMonth]
//     );

//     const handleYearSelect = useCallback(
//       (value) => {
//         setYear(value);
//         setIsDropdownOpen(false);
//       },
//       [setYear]
//     );

//     const monthOptions = [
//       { value: "", label: "All Months", icon: "📅" },
//       { value: "01", label: "January", icon: "❄️" },
//       { value: "02", label: "February", icon: "❤️" },
//       { value: "03", label: "March", icon: "🌼" },
//       { value: "04", label: "April", icon: "🌸" },
//       { value: "05", label: "May", icon: "☀️" },
//       { value: "06", label: "June", icon: "🌿" },
//       { value: "07", label: "July", icon: "🎆" },
//       { value: "08", label: "August", icon: "🏖️" },
//       { value: "09", label: "September", icon: "🍂" },
//       { value: "10", label: "October", icon: "🎃" },
//       { value: "11", label: "November", icon: "🍁" },
//       { value: "12", label: "December", icon: "🎄" },
//     ];

//     const memberTypes = [
//       { value: "", label: "All Types", icon: "👥" },
//       { value: "pt", label: "Trainer", icon: "🏋️" },
//       { value: "sm", label: "Strength", icon: "💪" },
//       { value: "regular", label: "Regular", icon: "👤" },
//     ];

//     const activityStatusOptions = [
//       { value: "all", label: "All Status", icon: "📋" },
//       { value: "active", label: "Active", icon: "✅" },
//       { value: "expired", label: "Expired", icon: "❌" },
//       { value: "expiring", label: "Expiring Soon", icon: "⏳" },
//       { value: "pending_balance", label: "Pending Balance", icon: "💰" },
//     ];

//     const yearOptions = [
//       { value: "", label: "All Years", icon: "📆" },
//       { value: "2024", label: "2024", icon: "📅" },
//       { value: "2025", label: "2025", icon: "📅" },
//     ];

//     const clearAllFilters = useCallback(() => {
//       setSearch("");
//       setType("");
//       setStatusFilter("all");
//       setMonth("");
//       setYear("");
//       setIsFilterOpen(false);
//     }, [setSearch, setType, setStatusFilter, setMonth, setYear]);

//     const handleTypeSelect = useCallback(
//       (value) => {
//         setType(value);
//         setIsDropdownOpen(false);
//       },
//       [setType]
//     );

//     const handleStatusSelect = useCallback(
//       (value) => {
//         setStatusFilter(value);
//         setIsDropdownOpen(false);
//       },
//       [setStatusFilter]
//     );

//     const handleSearchChange = useCallback(
//       (e) => {
//         setSearch(e.target.value);
//       },
//       [setSearch]
//     );

//     const handleSearchClear = useCallback(() => {
//       setSearch("");
//     }, [setSearch]);

//     const toggleDropdown = useCallback(() => {
//       setIsDropdownOpen(!isDropdownOpen);
//       setIsFilterOpen(false);
//     }, [isDropdownOpen]);

//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (
//           dropdownRef.current &&
//           !dropdownRef.current.contains(event.target)
//         ) {
//           setIsDropdownOpen(false);
//         }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//         document.removeEventListener("mousedown", handleClickOutside);
//       };
//     }, []);

//     useEffect(() => {
//       if (isFilterOpen) {
//         setIsDropdownOpen(false);
//       }
//     }, [isFilterOpen]);

//     const getStatusLabel = (status) => {
//       switch (status) {
//         case "active":
//           return "✅ Active";
//         case "expired":
//           return "❌ Expired";
//         case "expiring":
//           return "⏳ Expiring";
//         case "pending_balance":
//           return "💰 Pending Balance";
//         default:
//           return "📋 All Status";
//       }
//     };

//     return (
//       <div className="w-full max-w-4xl mx-auto p-4">
//         <div className="flex items-center gap-3">
//           {/* Search */}
//           <div className="flex-1 relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <svg
//                 className="h-5 w-5 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search members..."
//               value={search}
//               onChange={handleSearchChange}
//               className="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm hover:shadow-md transition-all duration-300"
//               aria-label="Search members"
//             />
//             {search && (
//               <button
//                 onClick={handleSearchClear}
//                 className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
//                 aria-label="Clear search"
//               >
//                 <svg
//                   className="h-5 w-5 text-gray-500 hover:text-gray-700"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>

//           {/* Filter Button */}
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={toggleDropdown}
//               className={`relative p-3 rounded-xl border transition-all duration-300 shadow-sm ${
//                 isDropdownOpen || activeFiltersCount > 0
//                   ? "bg-blue-100 border-blue-300 text-blue-700 hover:shadow-md"
//                   : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-md"
//               }`}
//               aria-label={`Filter options ${
//                 activeFiltersCount > 0 ? `(${activeFiltersCount} active)` : ""
//               }`}
//               aria-haspopup="true"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
//                 />
//               </svg>
//               {activeFiltersCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow">
//                   {activeFiltersCount}
//                 </span>
//               )}
//             </button>

//             {/* Dropdown Menu */}
//             <div
//               className={`fixed inset-x-0 top-0 h-screen bg-white z-50 transition-all duration-500 ease-in-out transform ${
//                 isDropdownOpen
//                   ? "opacity-100 translate-y-0"
//                   : "opacity-0 translate-y-full pointer-events-none"
//               }`}
//               role="menu"
//               aria-hidden={!isDropdownOpen}
//             >
//               {/* Header */}
//               <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
//                 <h3 className="text-xl font-bold text-gray-900">Filters</h3>
//                 <button
//                   onClick={() => setIsDropdownOpen(false)}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
//                   aria-label="Close filters"
//                 >
//                   <svg
//                     className="h-6 w-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>

//               {/* Scrollable Content */}
//               <div
//                 className="flex-1 overflow-y-auto p-6 space-y-6"
//                 style={{ maxHeight: "calc(100vh - 140px)" }}
//               >
//                 {/* Type Filter */}
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-base font-semibold text-gray-900">
//                       Member Type
//                     </h4>
//                     {type && (
//                       <button
//                         onClick={() => setType("")}
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//                     {memberTypes.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleTypeSelect(option.value)}
//                         className={`p-3 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-sm ${
//                           type === option.value
//                             ? "bg-blue-100 text-blue-800 border border-blue-300"
//                             : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
//                         }`}
//                         role="menuitem"
//                       >
//                         <span className="text-lg">{option.icon}</span>
//                         <span className="text-sm font-medium truncate">
//                           {option.label}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Status Filter */}
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-base font-semibold text-gray-900">
//                       Status
//                     </h4>
//                     {statusFilter !== "all" && (
//                       <button
//                         onClick={() => setStatusFilter("all")}
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                     {activityStatusOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleStatusSelect(option.value)}
//                         className={`p-3 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-sm ${
//                           statusFilter === option.value
//                             ? "bg-blue-100 text-blue-800 border border-blue-300"
//                             : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
//                         }`}
//                         role="menuitem"
//                       >
//                         <span className="text-lg">{option.icon}</span>
//                         <span className="text-sm font-medium truncate">
//                           {option.label}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Year Filter */}
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-base font-semibold text-gray-900">
//                       Join Year
//                     </h4>
//                     {year && (
//                       <button
//                         onClick={() => setYear("")}
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-3 gap-3 sm:grid-cols-3">
//                     {yearOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleYearSelect(option.value)}
//                         className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-all duration-200 shadow-sm ${
//                           year === option.value
//                             ? "bg-blue-100 text-blue-800 border border-blue-300"
//                             : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
//                         }`}
//                       >
//                         <span className="text-lg">{option.icon}</span>
//                         <span className="text-sm font-medium">
//                           {option.label}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Month Filter */}
//                 <div>
//                   <div className="flex justify-between items-center mb-3">
//                     <h4 className="text-base font-semibold text-gray-900">
//                       Join Month
//                     </h4>
//                     {month && (
//                       <button
//                         onClick={() => setMonth("")}
//                         className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
//                       >
//                         Clear
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-h-64 overflow-y-auto">
//                     {monthOptions.map((option) => (
//                       <button
//                         key={option.value}
//                         onClick={() => handleMonthSelect(option.value)}
//                         className={`p-3 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-sm ${
//                           month === option.value
//                             ? "bg-blue-100 text-blue-800 border border-blue-300"
//                             : "bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
//                         }`}
//                         role="menuitem"
//                       >
//                         <span className="text-lg">{option.icon}</span>
//                         <span className="text-sm font-medium truncate">
//                           {option.label}
//                         </span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Active Filter Tags */}
//         {activeFiltersCount > 0 && (
//           <div className="px-4 pt-4 pb-2 flex flex-wrap gap-2">
//             {search && (
//               <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
//                 <span>"{search}"</span>
//                 <button
//                   onClick={handleSearchClear}
//                   className="text-blue-600 hover:text-blue-800 transition-colors"
//                   aria-label="Remove search filter"
//                 >
//                   ✕
//                 </button>
//               </span>
//             )}
//             {type && (
//               <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
//                 <span>
//                   {type === "pt"
//                     ? "🏋️ Trainer"
//                     : type === "sm"
//                     ? "💪 Strength"
//                     : "👤 Regular"}
//                 </span>
//                 <button
//                   onClick={() => setType("")}
//                   className="text-green-600 hover:text-green-800 transition-colors"
//                   aria-label="Remove type filter"
//                 >
//                   ✕
//                 </button>
//               </span>
//             )}
//             {statusFilter !== "all" && (
//               <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
//                 <span>{getStatusLabel(statusFilter)}</span>
//                 <button
//                   onClick={() => setStatusFilter("all")}
//                   className="text-yellow-600 hover:text-yellow-800 transition-colors"
//                   aria-label="Remove status filter"
//                 >
//                   ✕
//                 </button>
//               </span>
//             )}
//             {year && (
//               <span className="px-3 py-1.5 bg-indigo-100 text-indigo-800 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
//                 <span>📅 {year}</span>
//                 <button
//                   onClick={() => setYear("")}
//                   className="text-indigo-600 hover:text-indigo-800 transition-colors"
//                   aria-label="Remove year filter"
//                 >
//                   ✕
//                 </button>
//               </span>
//             )}
//             {month && (
//               <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full flex items-center gap-2 text-sm font-medium shadow-sm">
//                 <span>
//                   📅 {monthOptions.find((m) => m.value === month)?.label}
//                 </span>
//                 <button
//                   onClick={() => setMonth("")}
//                   className="text-purple-600 hover:text-purple-800 transition-colors"
//                   aria-label="Remove month filter"
//                 >
//                   ✕
//                 </button>
//               </span>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   }
// );

// SearchAndFilter.displayName = "SearchAndFilter";

// export default SearchAndFilter;
import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import { usePlans } from "../../hooks/usePlans";
import { useGymId } from "../../hooks/useGymId";

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
    plan,
    setPlan,
  }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const gym_id = useGymId();
    const { data: plans = [] } = usePlans(gym_id);

    const activeFiltersCount =
      (search ? 1 : 0) +
      (type ? 1 : 0) +
      (statusFilter && statusFilter !== "all" ? 1 : 0) +
      (month ? 1 : 0) +
      (year ? 1 : 0) +
      (plan ? 1 : 0);

    const handleSelect = useCallback((setter, value) => setter(value), []);
    const handleSearchChange = useCallback(
      (e) => setSearch(e.target.value),
      [setSearch]
    );
    const handleSearchClear = useCallback(() => setSearch(""), [setSearch]);
    const toggleDropdown = useCallback(
      () => setIsDropdownOpen((prev) => !prev),
      []
    );
    const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);

    const clearAllFilters = useCallback(() => {
      setSearch("");
      setType("");
      setStatusFilter("all");
      setMonth("");
      setYear("");
      setPlan("");
    }, [setSearch, setType, setStatusFilter, setMonth, setYear, setPlan]);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          closeDropdown();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);

    const monthOptions = [
      { value: "", label: "All Months" },
      { value: "1", label: "January" },
      { value: "2", label: "February" },
      { value: "3", label: "March" },
      { value: "4", label: "April" },
      { value: "5", label: "May" },
      { value: "6", label: "June" },
      { value: "7", label: "July" },
      { value: "8", label: "August" },
      { value: "9", label: "September" },
      { value: "10", label: "October" },
      { value: "11", label: "November" },
      { value: "12", label: "December" },
    ];

    const memberTypes = [
      { value: "", label: "All Types" },
      { value: "Trainer", label: "Trainer" },
      { value: "Strength", label: "Strength" },
      { value: "Regular", label: "Regular" },
    ];

    const activityStatusOptions = [
      { value: "all", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "expired", label: "Expired" },
      { value: "expiringsoon", label: "Expiring Soon" },
      { value: "pendingbalance", label: "Pending Balance" },
    ];

    const yearOptions = [
      { value: "", label: "All" },
      { value: "2024", label: "2024" },
      { value: "2025", label: "2025" },
      { value: "2026", label: "2026" },
    ];

    const getLabel = (options, value) =>
      options.find((o) => o.value === value)?.label || "";
    const getPlanName = (planId) =>
      plans.find((p) => p.id == planId)?.name || "Selected Plan"; // Use == here too for consistency

    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <svg
              className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Search members..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            {search && (
              <button
                onClick={handleSearchClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Button */}
          <div>
            <button
              onClick={toggleDropdown}
              className={`relative p-2.5 rounded-lg border transition-all duration-200 shadow-sm ${
                activeFiltersCount > 0
                  ? "bg-blue-100 border-blue-300 text-blue-700"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h18M7 12h10m-7 8h4"
                />
              </svg>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-semibold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFiltersCount > 0 && (
          <div className="pt-4 flex flex-wrap gap-2">
            {search && (
              <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                Search: "{search}"
                <button
                  onClick={handleSearchClear}
                  className="text-gray-500 hover:text-gray-900"
                >
                  ✕
                </button>
              </span>
            )}
            {type && (
              <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                {getLabel(memberTypes, type)}
                <button
                  onClick={() => setType("")}
                  className="text-green-600 hover:text-green-900"
                >
                  ✕
                </button>
              </span>
            )}
            {statusFilter && statusFilter !== "all" && (
              <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                {getLabel(activityStatusOptions, statusFilter)}
                <button
                  onClick={() => setStatusFilter("all")}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  ✕
                </button>
              </span>
            )}
            {year && (
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                Year: {year}
                <button
                  onClick={() => setYear("")}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  ✕
                </button>
              </span>
            )}
            {month && (
              <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                {getLabel(monthOptions, month)}
                <button
                  onClick={() => setMonth("")}
                  className="text-purple-600 hover:text-purple-900"
                >
                  ✕
                </button>
              </span>
            )}
            {plan && (
              <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
                {getPlanName(plan)}
                <button
                  onClick={() => setPlan("")}
                  className="text-pink-600 hover:text-pink-900"
                >
                  ✕
                </button>
              </span>
            )}
          </div>
        )}

        {/* Slide-out Panel UI */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isDropdownOpen
              ? "bg-black bg-opacity-50"
              : "bg-opacity-0 pointer-events-none"
          }`}
          onClick={closeDropdown}
        ></div>
        {/* ✅ FIX: Moved ref to this div */}
        <div
          ref={dropdownRef}
          className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isDropdownOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={closeDropdown}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
              >
                <svg
                  className="h-6 w-6"
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
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Type Filter */}
              <div>
                <h4 className="font-medium text-gray-600 mb-2 text-sm">
                  Member Type
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {memberTypes.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => handleSelect(setType, o.value)}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        type === o.value
                          ? "bg-blue-500 text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <h4 className="font-medium text-gray-600 mb-2 text-sm">
                  Status
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activityStatusOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => handleSelect(setStatusFilter, o.value)}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        statusFilter === o.value
                          ? "bg-blue-500 text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SCROLLABLE: Plan Filter */}
              <div>
                <h4 className="font-medium text-gray-600 mb-2 text-sm">
                  Filter By Plan
                </h4>
                <div className="max-h-48 overflow-y-auto pr-2 -mr-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                  {plans.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(setPlan, p.id)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        plan == p.id
                          ? "bg-blue-500 text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Filter */}
              <div>
                <h4 className="font-medium text-gray-600 mb-2 text-sm">
                  Join Year
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {yearOptions.map((o) => (
                    <button
                      key={o.value}
                      onClick={() => handleSelect(setYear, o.value)}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        year === o.value
                          ? "bg-blue-500 text-white font-semibold"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* SCROLLABLE: Month Filter */}
              <div>
                <h4 className="font-medium text-gray-600 mb-2 text-sm">
                  Join Month
                </h4>
                <div className="max-h-56 overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
                  <div className="grid grid-cols-2 gap-2">
                    {monthOptions.map((o) => (
                      <button
                        key={o.value}
                        onClick={() => handleSelect(setMonth, o.value)}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          month === o.value
                            ? "bg-blue-500 text-white font-semibold"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={closeDropdown}
                className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SearchAndFilter.displayName = "SearchAndFilter";
export default SearchAndFilter;
