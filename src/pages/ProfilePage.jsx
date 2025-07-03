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
      <div className="bg-white/80 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={memberData.photo_url}
                alt={memberData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-softPink shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-softBlue rounded-full p-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">
                {memberData.name}
              </h1>
              <p className="text-softBlue text-sm">
                Member ID: {memberData.member_id}
              </p>
            </div>
          </div>
          <span className="px-4 py-2 bg-softBlue/20 text-softBlue font-medium rounded-full text-sm">
            ACTIVE
          </span>
        </div>

        <nav className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-4 shadow-md">
          <button
            className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "personal"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleTabChange("personal")}
            aria-selected={activeTab === "personal"}
          >
            Personal Info
          </button>
          <button
            className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "membership"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleTabChange("membership")}
            aria-selected={activeTab === "membership"}
          >
            Membership
          </button>
          {memberData.type === "pt" && (
            <button
              className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                activeTab === "trainer"
                  ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                  : "bg-white text-black"
              }`}
              onClick={() => handleTabChange("trainer")}
              aria-selected={activeTab === "trainer"}
            >
              Trainer
            </button>
          )}
          <button
            className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "id-proof"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleTabChange("id-proof")}
            aria-selected={activeTab === "id-proof"}
          >
            ID Proof
          </button>
          <button
            className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "actions"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleTabChange("actions")}
            aria-selected={activeTab === "actions"}
          >
            Actions
          </button>
          <button
            className={`tab-button px-4 py-2 rounded-md font-medium transition-all duration-200 ${
              activeTab === "attendance"
                ? "bg-gradient-to-r from-softBlue to-softPink text-white bg-black"
                : "bg-white text-black"
            }`}
            onClick={() => handleTabChange("attendance")}
            aria-selected={activeTab === "attendance"}
          >
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
