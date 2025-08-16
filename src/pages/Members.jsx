// // src/pages/members/MembersPage.jsx
// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import SearchAndFilter from "../components/members/SearchAndFilter";
// import { useMembers } from "../hooks/useMembers";
// import { useDebounce } from "../hooks/useDebounce";
// import VirtualizedMemberList from "../components/members/VirtualizedMemberList";
// import { useLocation } from "react-router-dom";
// import { useGymId } from "../hooks/useGymId";

// import { lazyWithPreload } from "../utlis/lazywithPrelaod";

// // Loading skeleton component
// const MemberProfile = lazyWithPreload(() => import("./ProfilePage"));

// const MemberListSkeleton = () => (
//   <div className="space-y-4">
//     {Array.from({ length: 5 }).map((_, index) => (
//       <div
//         key={index}
//         className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
//       >
//         <div className="flex items-center">
//           <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
//           <div className="flex-1">
//             <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
//             <div className="h-3 bg-gray-300 rounded w-1/2"></div>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// export default function Members() {
//   const gym_id = useGymId();
//   const location = useLocation();
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [monthRange, setMonthRange] = useState([]);
//   const { data: members = [], isLoading, error, refetch } = useMembers(gym_id);

//   const [search, setSearch] = useState("");
//   const [type, setType] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Debounce search input to reduce filtering frequency
//   const debouncedSearch = useDebounce(search, 300);

//   // Memoize expensive filter operations
//   const filteredMembers = useMemo(() => {
//     if (!members.length) return [];

//     const now = new Date();
//     const tenDaysLater = new Date();
//     tenDaysLater.setDate(now.getDate() + 10);

//     return members.filter((member) => {
//       const matchSearch =
//         member.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//         member.phone_number?.includes(debouncedSearch);

//       const matchType = type ? member.type === type : true;

//       const expiryDate = new Date(member.end_date);
//       const isExpired = expiryDate < now;
//       const isExpiringSoon = expiryDate >= now && expiryDate <= tenDaysLater;
//       const pendingBalance = member.balance > 0;
//       const matchStatus =
//         statusFilter === "all"
//           ? true
//           : statusFilter === "expired"
//           ? isExpired
//           : statusFilter === "active"
//           ? !isExpired
//           : statusFilter === "expiring"
//           ? isExpiringSoon
//           : statusFilter === "pending_balance"
//           ? pendingBalance
//           : true;

//       // Format start date
//       const startDate = member.start_date ? new Date(member.start_date) : null;
//       const joinMonth = startDate ? startDate.toISOString().slice(5, 7) : "";
//       const joinYear = startDate ? startDate.getFullYear().toString() : "";

//       const matchMonth = !month || joinMonth === month;
//       const matchYear = !year || joinYear === year;

//       return matchSearch && matchType && matchStatus && matchMonth && matchYear;
//     });
//   }, [members, debouncedSearch, type, statusFilter, month, year]);

//   // Memoize search and filter handlers
//   const handleSearchChange = useCallback((value) => {
//     setSearch(value);
//   }, []);

//   const handleTypeChange = useCallback((value) => {
//     setType(value);
//   }, []);

//   const handleStatusChange = useCallback((value) => {
//     setStatusFilter(value);
//   }, []);

//   // Handle URL-based status filtering
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const statusParam = params.get("status");

//     if (
//       ["expired", "active", "expiring", "pending_balance"].includes(statusParam)
//     ) {
//       setStatusFilter(statusParam);
//     } else {
//       setStatusFilter("all");
//     }
//   }, [location.search]);

//   useEffect(() => {
//     if (gym_id) {
//       refetch(); // ✅ now works
//     }
//   }, [gym_id]);

//   useEffect(() => {
//     MemberProfile.preload();
//   }, []);

//   // Error state
//   if (error) {
//     return (
//       <div className="p-4">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <div className="text-red-400 mb-4">
//             <svg
//               className="w-12 h-12 mx-auto"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//           </div>
//           <h3 className="text-lg font-medium text-red-800 mb-2">
//             Failed to load members
//           </h3>
//           <p className="text-red-600 mb-4">
//             There was an error loading the member list. Please try again.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-7xl mx-auto w-screen">
//       {/* Header with member count */}
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">Members</h1>
//         {!isLoading && (
//           <p className="text-gray-600">
//             {filteredMembers.length} of {members.length} members
//             {debouncedSearch && ` matching "${debouncedSearch}"`}
//           </p>
//         )}
//       </div>

//       {/* Search and Filter */}
//       <div className="mb-6">
//         <SearchAndFilter
//           search={search}
//           setSearch={setSearch}
//           type={type}
//           setType={setType}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//           month={month}
//           setMonth={setMonth}
//           year={year}
//           setYear={setYear}
//         />
//       </div>

//       {/* Loading State */}
//       {isLoading ? (
//         <MemberListSkeleton />
//       ) : (
//         <div className="h-[calc(100vh-220px)]   scrollbar-hide">
//           <VirtualizedMemberList members={filteredMembers} />
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchAndFilter from "../components/members/SearchAndFilter";
import { useMembers } from "../hooks/useMembers";
import { useDebounce } from "../hooks/useDebounce";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";
import { useGymId } from "../hooks/useGymId";

const MemberListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function Members() {
  const gym_id = useGymId();
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Read all filter values directly from the URL
  const search = searchParams.get("search") || "";
  const type = searchParams.get("member_type") || "";
  const statusFilter = searchParams.get("status") || "all";
  const month = searchParams.get("join_month") || "";
  const year = searchParams.get("join_year") || "";
  const plan = searchParams.get("plan_id") || "";
  const debouncedSearch = useDebounce(search, 300);

  // 2. Create setter functions that update the URL
  const updateParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams, { replace: true });
  };

  const setSearch = (value) => updateParams("search", value);
  const setType = (value) => updateParams("member_type", value);
  const setStatusFilter = (value) =>
    value === "all"
      ? updateParams("status", "")
      : updateParams("status", value);
  const setMonth = (value) => updateParams("join_month", value);
  const setYear = (value) => updateParams("join_year", value);
  const setPlan = (value) => updateParams("plan_id", value);

  // 3. Assemble the filters object to send to the backend
  const apiFilters = useMemo(() => {
    const typeMap = { Trainer: "pt", Strength: "sm", Regular: "regular" };

    return {
      search: debouncedSearch,
      status: statusFilter,
      member_type: typeMap[type] || type,
      join_year: year,
      join_month: month,
      plan_id: plan,
    };
  }, [debouncedSearch, statusFilter, type, year, month, plan]);

  // 4. Call the useMembers hook, which handles the API call
  const {
    data: members = [],
    isLoading,
    error,
  } = useMembers(gym_id, apiFilters);

  if (error) {
    /* ... error UI ... */
  }

  return (
    <div className="p-4 max-w-7xl mx-auto w-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Members</h1>
        {!isLoading && (
          <p className="text-gray-600">
            Showing {members.length} members found
          </p>
        )}
      </div>

      {/* Filter Component */}
      <div className="mb-6">
        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          plan={plan}
          setPlan={setPlan}
        />
      </div>

      {/* Member List */}
      {isLoading ? (
        <MemberListSkeleton />
      ) : (
        <div className="h-[calc(100vh-220px)] scrollbar-hide">
          <VirtualizedMemberList members={members} />
        </div>
      )}
    </div>
  );
}
