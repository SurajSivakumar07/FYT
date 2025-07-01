import React from "react";

export default function FilterPanel({ filter, setFilter }) {
  return (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm"
    >
      <option value="">All Members</option>
      <option value="pt">Personal Training</option>
      <option value="sm">Standard Membership</option>
      <option value="regular">Regular</option>
    </select>
  );
}
