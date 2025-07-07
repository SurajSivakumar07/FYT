import React, { useMemo, useState } from "react";
// Replace with your actual hook
import { PageLoader } from "../App";
import { useEnquiry } from "../hooks/useEnquiry";
import { useGymId } from "../hooks/useGymId";

function Enquiries() {
  const gym_id = useGymId();
  const { data: enquiries = [], isLoading } = useEnquiry(gym_id);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const name = e?.name?.toLowerCase?.() || "";
      const phone = e?.phone_number?.toLowerCase?.() || "";
      const message = e?.message?.toLowerCase?.() || "";
      const search = searchTerm.toLowerCase();
      return (
        name.includes(search) ||
        phone.includes(search) ||
        message.includes(search)
      );
    });
  }, [enquiries, searchTerm]);

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Enquiries</h1>
          <p className="text-gray-600 text-lg">Manage customer enquiries</p>
        </div>

        {/* Stats + Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {enquiries.length}
                </div>
                <div className="text-gray-600 text-sm">Total Enquiries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">
                  {filteredEnquiries.length}
                </div>
                <div className="text-gray-600 text-sm">Showing</div>
              </div>
            </div>

            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Enquiries Grid */}
        {filteredEnquiries.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            {searchTerm
              ? "No matching enquiries found."
              : "No enquiries available."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEnquiries.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 14h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500">ID: {e.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {e.name}
                </h3>
                <p className="text-indigo-600 mb-2">{e.phone_number}</p>
                <p className="text-sm text-gray-700 mb-2 italic">
                  “{e.message}”
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Enquiries;
