import React, { useMemo, useState } from "react";
import {
  Search,
  Phone,
  Calendar,
  MessageSquare,
  Users,
  ChevronDown,
} from "lucide-react";

import { useGymId } from "../hooks/useGymId";
import { useEnquiry } from "../hooks/useEnquiry";
import { useUpdateEnquiryStatus } from "../hooks/useMembers";
import EnquiryEditModal from "../components/enquiry/EnquiryEditModal";

function Enquiries() {
  const gym_id = useGymId();
  const { data: enquiries = [], isLoading } = useEnquiry(gym_id);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const name = e?.name?.toLowerCase?.() || "";
      const phone = e?.phone_number?.toLowerCase?.() || "";
      const message = e?.message?.toLowerCase?.() || "";
      const followDate = e?.enquiry_date
        ? new Date(e.enquiry_date)
            .toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .toLowerCase()
        : "";
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        name.includes(search) ||
        phone.includes(search) ||
        message.includes(search) ||
        followDate.includes(search);

      const matchesStatus = statusFilter === "all" || e.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" || e.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [enquiries, searchTerm, statusFilter, priorityFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-green-100 text-green-800 border-green-200";
      case "contacted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "joined":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isDueToday = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const { mutate: updateEnquiryStatus } = useUpdateEnquiryStatus();

  const handleStatusUpdate = (id, newStatus) => {
    updateEnquiryStatus({ enquiryId: id, status: newStatus, gym_id: gym_id });
  };
  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {filteredEnquiries.length} of {enquiries.length} enquiries
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enquiries.length}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Total Enquiries
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enquiries.filter((e) => e.status === "new").length}
                </div>
                <div className="text-sm font-medium text-gray-500">New</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {enquiries.filter((e) => e.status === "contacted").length}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Contacted
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {
                    enquiries.filter(
                      (e) => e.enquiry_date && isDueToday(e.enquiry_date)
                    ).length
                  }
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Due Today
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, message, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="pending">Pending</option>
                  <option value="joined">Joined</option>
                  <option value="closed">Closed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries List */}
        <div className="space-y-6">
          {filteredEnquiries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No enquiries found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            filteredEnquiries.map((e) => (
              <div
                key={e.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-row items-start justify-between gap-4 flex-wrap">
                  {/* Left: Avatar + Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-[200px]">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm uppercase shadow-sm">
                      {e.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-gray-700">
                      <div className="font-semibold text-base text-gray-900">
                        {e.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <a
                          href={`tel:${e.phone_number}`}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          {e.phone_number}
                        </a>
                      </div>
                      <div className="flex items-start gap-1">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="italic">"{e.message}"</span>
                      </div>
                      {e.enquiry_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span
                            className={
                              isDueToday(e.enquiry_date)
                                ? "text-red-600 font-semibold"
                                : "text-gray-700"
                            }
                          >
                            Follow-up:{" "}
                            {new Date(e.enquiry_date).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                            e.status
                          )}`}
                        >
                          {e.status}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            e.priority
                          )}`}
                        >
                          {e.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-row flex-wrap items-center gap-2 min-w-[220px]">
                    <select
                      value={e.status}
                      onChange={(event) =>
                        handleStatusUpdate(e.id, event.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="pending">Pending</option>
                      <option value="joined">Joined</option>
                      <option value="closed">Closed</option>
                    </select>

                    <button
                      onClick={() =>
                        window.open(`tel:${e.phone_number}`, "_self")
                      }
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEnquiry(e);
                        setEditModalOpen(true);
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <EnquiryEditModal
        open={editModalOpen}
        enquiry={selectedEnquiry}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedEnquiry(null);
        }}
      />
    </div>
  );
}

export default Enquiries;
