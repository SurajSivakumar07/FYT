// src/pages/members/MembersPage.jsx
import React, { useState } from "react";
import SearchAndFilter from "../components/members/SearchAndFilter";
import { useMembers } from "../hooks/useMembers";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";
import { useLocation } from "react-router-dom";
import { useMemo, useEffect } from "react";

export default function Members() {
  const gym_id = 1;
  const location = useLocation();

  const { data: members = [], isLoading } = useMembers(gym_id);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // Filter logic (can be memoized)
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMembers = useMemo(() => {
    const now = new Date();
    const tenDaysLater = new Date();
    tenDaysLater.setDate(now.getDate() + 10);

    return members.filter((member) => {
      const matchSearch = member.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchType = type ? member.type === type : true;

      const expiryDate = new Date(member.end_date);
      const isExpired = expiryDate < now;
      const isExpiringSoon = expiryDate >= now && expiryDate <= tenDaysLater;

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "expired"
          ? isExpired
          : statusFilter === "active"
          ? !isExpired
          : statusFilter === "expiring"
          ? isExpiringSoon
          : true;

      return matchSearch && matchType && matchStatus;
    });
  }, [members, search, type, statusFilter]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status");

    if (
      statusParam === "expired" ||
      statusParam === "active" ||
      statusParam === "expiring"
    ) {
      setStatusFilter(statusParam);
    } else {
      setStatusFilter("all");
    }
  }, [location.search]);
  return (
    <div className="p-4">
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {isLoading ? (
        <div className="text-center text-gray-500 py-10">
          Loading members...
        </div>
      ) : (
        <VirtualizedMemberList members={filteredMembers} />
      )}
    </div>
  );
}
