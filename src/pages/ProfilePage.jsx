import React, { useState } from "react";
import MemberInformation from "../components/members/profile/MemberInformation";
import WhatsAppNotification from "../components/members/profile/WhatsAppNotification";
import Attendance from "../components/members/profile/Attendance";
import TrainerDetails from "../components/members/profile/TrainerDetails";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [memberData, setMemberData] = useState({
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
    type: "pt",
    trainer_id: "TR001",
    trainer_name: "Mike Johnson",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    id_proof: {
      type: "Aadhaar Card",
      number: "1234 5678 9012",
      document_url:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop",
    },
    diet_chart_url: "https://example.com/diet-chart.pdf", // Can be set to null to test "Add" option
  });

  const [attendanceData, setAttendanceData] = useState({
    // Sample data; can be set to {} to test "Add Attendance" option
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
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddAttendance = (date) => {
    setAttendanceData((prev) => ({
      ...prev,
      [date]: true,
    }));
  };

  const handleAddDietChart = (url) => {
    setMemberData((prev) => ({
      ...prev,
      diet_chart_url: url,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-white to-blue-20 min-h-screen">
      {/* Profile Header Banner */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6"
        style={{ minHeight: "120px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-softBlue via-softPink to-blue-200 opacity-60"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-softBlue via-white to-softPink" />
              <img
                src={memberData.photo_url}
                alt={memberData.name}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-xl relative z-10"
              />
              <span className="absolute bottom-2 right-2 bg-softBlue text-white rounded-full p-2 shadow-md flex items-center z-20">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-black drop-shadow-sm mb-1">
                {memberData.name}
              </h1>
              <p className="text-softBlue text-base font-medium mb-2">
                Member ID: {memberData.member_id}
              </p>
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                {memberData.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
            <button
              className="bg-softBlue text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
              aria-label="Edit Profile"
              // onClick={handleEditProfile} // Uncomment and implement if needed
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6-6M3 17.25V21h3.75l11.06-11.06a2.121 2.121 0 00-3-3L3 17.25z"
                />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* End Profile Header Banner */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-6">
        <nav className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-4 shadow-md">
          <button
            className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
              activeTab === "personal"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                : "bg-gray-100 text-black hover:bg-softBlue/10"
            }`}
            onClick={() => handleTabChange("personal")}
            aria-selected={activeTab === "personal"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Personal Info
          </button>
          <button
            className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
              activeTab === "membership"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                : "bg-gray-100 text-black hover:bg-softBlue/10"
            }`}
            onClick={() => handleTabChange("membership")}
            aria-selected={activeTab === "membership"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h10M9 6h6"
              />
            </svg>
            Membership
          </button>
          {memberData.type === "pt" && (
            <button
              className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
                activeTab === "trainer"
                  ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                  : "bg-gray-100 text-black hover:bg-softBlue/10"
              }`}
              onClick={() => handleTabChange("trainer")}
              aria-selected={activeTab === "trainer"}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Trainer
            </button>
          )}
          <button
            className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
              activeTab === "id-proof"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                : "bg-gray-100 text-black hover:bg-softBlue/10"
            }`}
            onClick={() => handleTabChange("id-proof")}
            aria-selected={activeTab === "id-proof"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            ID Proof
          </button>
          <button
            className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
              activeTab === "actions"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                : "bg-gray-100 text-black hover:bg-softBlue/10"
            }`}
            onClick={() => handleTabChange("actions")}
            aria-selected={activeTab === "actions"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.414l1.405-1.405z"
              />
            </svg>
            Actions
          </button>
          <button
            className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
              activeTab === "attendance"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white drop-shadow-md"
                : "bg-gray-100 text-black hover:bg-softBlue/10"
            }`}
            onClick={() => handleTabChange("attendance")}
            aria-selected={activeTab === "attendance"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Attendance
          </button>
        </nav>

        <div className="card-container">
          <div
            className={`tab-content ${
              activeTab === "personal" ? "animate-flip" : "hidden"
            }`}
          >
            <MemberInformation memberData={memberData} />
          </div>
          <div
            className={`tab-content ${
              activeTab === "membership" ? "animate-flip" : "hidden"
            }`}
          >
            <MemberInformation memberData={memberData} showMembership />
          </div>
          {memberData.type === "pt" && (
            <div
              className={`tab-content ${
                activeTab === "trainer" ? "animate-flip" : "hidden"
              }`}
            >
              <TrainerDetails
                trainerData={{
                  name: memberData.trainer_name,
                  trainer_id: memberData.trainer_id,
                  diet_chart_url: memberData.diet_chart_url,
                }}
                onAddDietChart={handleAddDietChart}
              />
            </div>
          )}
          <div
            className={`tab-content ${
              activeTab === "id-proof" ? "animate-flip" : "hidden"
            }`}
          >
            <MemberInformation memberData={memberData} showIdProof />
          </div>
          <div
            className={`tab-content ${
              activeTab === "actions" ? "animate-flip" : "hidden"
            }`}
          >
            <WhatsAppNotification />
          </div>
          <div
            className={`tab-content ${
              activeTab === "attendance" ? "animate-flip" : "hidden"
            }`}
          >
            <Attendance
              attendanceData={attendanceData}
              onAddAttendance={handleAddAttendance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
