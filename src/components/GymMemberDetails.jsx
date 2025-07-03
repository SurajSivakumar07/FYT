import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  MessageSquare,
  Bell,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Camera,
  Eye,
} from "lucide-react";

const GymMemberDetails = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const memberData = {
    gym_id: "GYM001",
    member_id: "MEM2024001",
    name: "John Doe",
    phone_number: "+91 9876543210",
    email: "john.doe@email.com",
    dob: "1990-05-15",
    gender: "Male",
    blood_group: "B+",
    address: "123 Main Street, Coimbatore, Tamil Nadu 641001",
    membership_plan_id: "PLAN001",
    start_date: "2024-01-15",
    end_date: "2024-12-15",
    status: "active",
    type: "regular",
    trainer_id: "TR001",
    transaction: {
      member_id: "MEM2024001",
      gym_id: "GYM001",
      amount_paid: "12000",
      transaction_type: "membership",
      payment_date: "2024-01-15",
      status: "paid",
      balance: 0,
    },
    membership_plan: "Annual Gold Plan",
    trainer_name: "Mike Johnson",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    id_proof: {
      type: "Aadhaar Card",
      number: "1234 5678 9012",
      document_url:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
    },
  };

  const attendanceData = {
    "2024-07-01": true,
    "2024-07-02": true,
    "2024-07-03": false,
    "2024-07-05": true,
    "2024-07-06": true,
    "2024-07-08": true,
    "2024-07-09": false,
    "2024-07-10": true,
    "2024-07-12": true,
    "2024-07-13": true,
    "2024-07-15": true,
    "2024-07-16": true,
    "2024-07-17": false,
    "2024-07-19": true,
    "2024-07-20": true,
    "2024-07-22": true,
    "2024-07-23": true,
    "2024-07-24": false,
    "2024-07-26": true,
    "2024-07-27": true,
    "2024-07-29": true,
    "2024-07-30": true,
  };

  const getAttendanceCount = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return Object.keys(attendanceData).filter((date) => {
      const d = new Date(date);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear &&
        attendanceData[date]
      );
    }).length;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateDaysUntilExpiry = () => {
    const endDate = new Date(memberData.end_date);
    const today = new Date();
    const timeDiff = endDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isAttended = attendanceData[dateKey];
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center text-sm rounded-full transition-all duration-200 ${
            isAttended
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } ${isToday ? "ring-2 ring-indigo-400" : ""}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const daysUntilExpiry = calculateDaysUntilExpiry();

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="relative group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg transform transition-transform duration-300 group-hover:scale-105">
                  <img
                    src={memberData.photo_url}
                    alt={memberData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md">
                  <Camera className="w-4 h-4 text-indigo-600" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {memberData.name}
                </h1>
                <p className="text-indigo-100 mt-1 text-sm sm:text-base">
                  Member ID: {memberData.member_id}
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-medium tracking-wide ${
                  memberData.status === "active"
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"
                }`}
              >
                {memberData.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 sm:p-8">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-indigo-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="flex items-center mt-2">
                    <Phone className="w-4 h-4 mr-2 text-indigo-400" />
                    <span className="font-medium text-gray-800">
                      {memberData.phone_number}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Email
                  </label>
                  <div className="flex items-center mt-2">
                    <Mail className="w-4 h-4 mr-2 text-indigo-400" />
                    <span className="font-medium text-gray-800">
                      {memberData.email}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Date of Birth
                  </label>
                  <div className="flex items-center mt-2">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-400" />
                    <span className="font-medium text-gray-800">
                      {formatDate(memberData.dob)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Gender
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {memberData.gender}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Blood Group
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {memberData.blood_group}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Member Type
                  </label>
                  <p className="font-medium text-gray-800 mt-2 capitalize">
                    {memberData.type}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Address
                  </label>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-2 text-indigo-400" />
                    <span className="font-medium text-gray-800">
                      {memberData.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Details */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                Membership Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Membership Plan
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {memberData.membership_plan}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Trainer
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {memberData.trainer_name}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Start Date
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {formatDate(memberData.start_date)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    End Date
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {formatDate(memberData.end_date)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Days Until Expiry
                  </label>
                  <p
                    className={`font-medium mt-2 ${
                      daysUntilExpiry <= 30 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {daysUntilExpiry} days
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                Payment Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Amount Paid
                  </label>
                  <p className="font-medium text-lg text-gray-800 mt-2">
                    ₹{memberData.transaction.amount_paid}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Payment Date
                  </label>
                  <p className="font-medium text-gray-800 mt-2">
                    {formatDate(memberData.transaction.payment_date)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Payment Status
                  </label>
                  <div className="flex items-center mt-2">
                    {memberData.transaction.balance === 0 ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        <span className="font-medium text-green-600">
                          Fully Paid
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="font-medium text-orange-600">
                          Pending: ₹{memberData.transaction.balance}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide">
                    Transaction Type
                  </label>
                  <p className="font-medium text-gray-800 mt-2 capitalize">
                    {memberData.transaction.transaction_type}
                  </p>
                </div>
              </div>
            </div>

            {/* ID Proof Section */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                ID Proof & Documents
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                      Document Type
                    </label>
                    <p className="font-medium text-gray-800 mt-2">
                      {memberData.id_proof.type}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wide">
                      Document Number
                    </label>
                    <p className="font-medium text-gray-800 mt-2">
                      {memberData.id_proof.number}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">
                    Document Image
                  </label>
                  <div className="relative group">
                    <img
                      src={memberData.id_proof.document_url}
                      alt="ID Proof Document"
                      className="w-full max-w-md h-32 object-cover rounded-lg border border-gray-200 transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                      <button className="bg-white text-gray-800 px-4 py-1.5 rounded-full text-sm font-medium flex items-center transform transition-transform duration-200 hover:scale-105">
                        <Eye className="w-4 h-4 mr-1" />
                        View Full
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center transition-all duration-200 hover:shadow-md">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Invoice via WhatsApp
                </button>
                <button className="w-full bg-amber-500 text-white py-2.5 px-4 rounded-lg hover:bg-amber-600 flex items-center justify-center transition-all duration-200 hover:shadow-md">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Expiry Reminder
                </button>
              </div>
            </div>

            {/* Attendance Calendar */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Attendance</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-1.5 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-indigo-600" />
                  </button>
                  <span className="text-sm font-medium text-gray-800">
                    {currentDate.toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-1.5 hover:bg-indigo-50 rounded-full transition-colors duration-200"
                  >
                    <ChevronRight className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-center bg-indigo-50 p-4 rounded-xl">
                  <p className="text-3xl font-bold text-indigo-600">
                    {getAttendanceCount()}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium">
                    Days Attended This Month
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600 font-medium mb-3">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>

              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

              <div className="mt-4 flex items-center justify-between text-xs font-medium">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">Attended</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
                  <span className="text-gray-700">Absent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymMemberDetails;
