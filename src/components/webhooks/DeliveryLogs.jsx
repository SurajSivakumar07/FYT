import React, { useEffect, useState } from "react";

import {
  Phone,
  MessageSquare,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react";

import { useWebhookLogs } from "../../hooks/whatsapp/useWebhooks";
const DeliveryLogs = () => {
  const { data: logs = [], isLoading, error } = useWebhookLogs();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "sent":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status.toLowerCase()) {
      case "delivered":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "sent":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.member_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.to_number.includes(searchTerm) ||
      log.template_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || log.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading delivery logs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
          <XCircle className="w-5 h-5 text-red-500 mr-3" />
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No delivery logs found
          </h3>
          <p className="text-gray-600">
            No WhatsApp delivery logs are available at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          WhatsApp Delivery Logs
        </h1>
        <p className="text-gray-600">
          Monitor message delivery status and track communication with members
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by member ID, phone number, or template name..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="sent">Sent</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Messages",
            value: logs.length,
            icon: MessageSquare,
            color: "blue",
          },
          {
            label: "Delivered",
            value: logs.filter((l) => l.status === "delivered").length,
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Sent",
            value: logs.filter((l) => l.status === "sent").length,
            icon: AlertCircle,
            color: "yellow",
          },
          {
            label: "Failed",
            value: logs.filter((l) => l.status === "failed").length,
            icon: XCircle,
            color: "red",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
            </div>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Member
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Template
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Event Time
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr
                  key={log.message_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {log.member_id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-mono">
                      {log.to_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(log.status)}
                      <span className={`ml-2 ${getStatusBadge(log.status)}`}>
                        {log.status.charAt(0).toUpperCase() +
                          log.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {log.template_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(log.event_timestamp).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(log.event_timestamp).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredLogs.length === 0 && (searchTerm || statusFilter !== "all") && (
        <div className="text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching logs found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryLogs;
