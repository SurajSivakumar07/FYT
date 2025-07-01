// src/pages/members/MembersPage.jsx
import React, { useState } from "react";
import SearchAndFilter from "../components/members/SearchAndFilter";
import { useMembers } from "../hooks/useMembers";
import VirtualizedMemberList from "../components/members/VirtualizedMemberList";

export default function Members() {
  const gym_id = 1;
  const { data: members = [], isLoading } = useMembers(gym_id);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  // Filter logic (can be memoized)
  const filteredMembers = members.filter((m) => {
    return (
      m.name.toLowerCase().includes(search.toLowerCase()) &&
      (type === "" || m.type === type)
    );
  });

  return (
    <div className="p-4">
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
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
