import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGymName } from "../../hooks/gyms/useGymData";
export default function DynamicAttendace() {
  const { gymId } = useParams();
  const [memberId, setMemberId] = useState("");
  const [isStored, setIsStored] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem("member_id");
    if (savedId) {
      setMemberId(savedId);
      setIsStored(true);
    }
  }, []);

  const {
    data: gym,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["gymName", gymId],
    queryFn: () => getGymName(gymId),
    enabled: !!gymId,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save memberId in localStorage
    localStorage.setItem("member_id", memberId);
    setIsStored(true);
    setEditing(false);

    // Get current date and time
    const now = new Date();
    const date = now.toISOString().split("T")[0]; // "YYYY-MM-DD"
    const time = now.toISOString().split("T")[1].split(".")[0]; // "HH:MM:SS"

    const payload = {
      member_id: memberId,
      gym_id: gymId,
      date: date,
      check_in_time: time,
    };

    try {
      const res = await fetch("http://localhost:8000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Attendance failed");

      const result = await res.json();
      console.log("✅ Attendance marked:", result);
      alert("Attendance marked successfully!");
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Failed to mark attendance.");
    }
  };

  const handleManualEntry = () => {
    setEditing(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Attendance - Gym:</h2>

      {!editing && isStored ? (
        <div className="space-y-4">
          <p>
            Welcome back, Member ID: <strong>{memberId}</strong>
            <span>{gym?.name}</span>
          </p>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
            onClick={handleSubmit}
          >
            Continue
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded w-full"
            onClick={handleManualEntry}
          >
            Enter Member ID Manually
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            Member ID:
            <input
              className="border p-2 w-full mt-1"
              type="text"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
