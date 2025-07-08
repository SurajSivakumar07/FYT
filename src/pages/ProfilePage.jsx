import React, { useEffect, useState } from "react";
import MemberInformation from "../components/members/profile/MemberInformation";
import WhatsAppNotification from "../components/members/profile/WhatsAppNotification";
import Attendance from "../components/members/profile/Attendance";
import TrainerDetails from "../components/members/profile/TrainerDetails";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../services/supabase/supabase";
import { useMeberProfile } from "../hooks/useMemberProfile";
import EditMemberModal from "../components/members/profile/EditMemberModal";
import { useEditMemberProfile } from "../hooks/useEditMemberProfile";
import RenewModal from "../components/renew/RenewModal";
import { usePostRenew } from "../hooks/useRenewPost";
import PaymentBalanceModal from "../components/payment/PaymentBalanceModal";
import { PageLoader } from "../App";
import { useGymId } from "../hooks/useGymId";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRenewOpen, setRenewOpen] = useState(false);
  const [errorEditing, SetError] = useState(false);
  const [errorEditingMess, SetErrorMes] = useState(false);

  const [isBalanceOpen, setBalanceopen] = useState(false);

  const gym_id = useGymId();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const url = import.meta.env.VITE_API_URL;

  const {
    data: memberData = {},
    isLoading,
    error,
  } = useMeberProfile(gym_id, userId);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const { mutate: updateMember } = useEditMemberProfile();
  const { mutate: renewMeber } = usePostRenew();
  const renewSaveHandler = (data) => {
    renewMeber({ member_id: memberData?.member?.member_id, data });
  };
  const handleSave = async (updatedData) => {
    updateMember({
      memberId: memberData?.member?.member_id,
      updatedData,
    });
  };

  const resizeImage = (file, maxWidth, maxHeight, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to JPEG with specified quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob"));
            }
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !memberData?.member?.member_id || !gym_id) {
      alert("Missing file or member/gym ID");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please upload a JPEG or PNG image");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      let quality = 0.7;
      let resizedBlob = await resizeImage(file, 800, 800, quality);
      let sizeKB = resizedBlob.size / 1024;

      while (sizeKB > 500 && quality > 0.1) {
        quality -= 0.1;
        resizedBlob = await resizeImage(file, 800, 800, quality);
        sizeKB = resizedBlob.size / 1024;
      }

      if (sizeKB > 500) {
        alert("Could not compress image below 500 KB");
        return;
      }

      const filePath = `photos/${
        memberData.member.member_id
      }-${Date.now()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("member-photos")
        .upload(filePath, resizedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = supabase.storage
        .from("member-photos")
        .getPublicUrl(filePath);

      if (urlError) throw urlError;

      const photoUrl = urlData.publicUrl;

      // 🔥 Update photo URL in backend
      await axios.put(
        `${url}/gyms/${gym_id}/members/${memberData.member.member_id}/photo-url`,
        { photo_url: photoUrl }
      );

      queryClient.invalidateQueries(["memberprofile", gym_id, userId]);
      alert("Photo uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload photo");
    } finally {
      setUploading(false);
    }
  };

  const handleAddDietChart = async (url) => {
    try {
      await axios.put(`/gyms/${gym_id}/members/${userId}/diet-chart`, {
        diet_chart_url: url,
      });
      queryClient.invalidateQueries(["memberprofile", gym_id, userId]);
    } catch (err) {
      console.error("Failed to update diet chart:", err);
    }
  };

  if (isLoading) return PageLoader;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading profile.
      </div>
    );

  const member = memberData.member;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white min-h-screen">
      <div className="relative rounded-2xl overflow-hidden mb-6 min-h-[120px]">
        <div className="absolute inset-0 bg-gradient-to-r from-softBlue via-softPink to-blue-100 opacity-60"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <div className="text-center sm:text-left">
            {/* Member Name */}
            <h1 className="text-4xl font-extrabold text-black drop-shadow-sm mb-1">
              {member?.name}
            </h1>

            {/* Member ID */}
            <p className="text-base font-medium text-gray-500 mb-2">
              Member ID: {userId}
            </p>

            {/* Status and Payment Info Badges */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              {/* Status Badge */}
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                  member?.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                {member?.status === "active" ? "Active" : "Expired"}
              </span>

              {/* Payment Badge */}
              {memberData?.transactions[0]?.balance == null ||
              memberData?.transactions[0]?.balance === 0 ? (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Fully Paid
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold shadow-sm">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3"
                    />
                  </svg>
                  Balance: ₹{memberData?.transactions[0]?.balance}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
            <button
              className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
              onClick={() => setIsOpen(true)}
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
            {member?.status === "expired" ? (
              <button
                className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
                onClick={() => setRenewOpen(true)}
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
                Renew
              </button>
            ) : (
              ""
            )}
            {memberData?.transactions[0]?.balance > 0 && (
              <button
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:from-orange-500 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 mt-2"
                onClick={() => setBalanceopen(true)}
              >
                <span>
                  Update Balance
                  <span className="ml-2 bg-white/80 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">
                    ₹{memberData?.transactions[0]?.balance}
                  </span>
                </span>
              </button>
            )}
          </div>
          {errorEditing ? "" : errorEditingMess}
        </div>
      </div>

      <div className="bg-white/80 rounded-2xl shadow-lg p-6">
        <nav
          className="flex flex-wrap gap-2 mb-6 bg-white rounded-xl p-4 shadow-md"
          role="tablist"
        >
          {[
            "personal",
            "membership",
            "id-proof",
            "actions",
            "attendance",
            ...(member?.type === "pt" ? ["trainer"] : []),
          ].map((tab) => (
            <button
              key={tab}
              className={`tab-button flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-base ${
                activeTab === tab
                  ? "bg-white text-black drop-shadow-md"
                  : "bg-white text-black hover:bg-softBlue/10"
              }`}
              onClick={() => handleTabChange(tab)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTabChange(tab);
                }
              }}
              role="tab"
              aria-selected={activeTab === tab}
              tabIndex={0}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            </button>
          ))}
        </nav>

        <div className="card-container">
          {activeTab === "personal" && (
            <MemberInformation memberData={member} />
          )}
          {activeTab === "membership" && (
            <MemberInformation memberData={member} showMembership />
          )}
          {activeTab === "id-proof" && (
            <MemberInformation memberData={member} showIdProof />
          )}
          {activeTab === "actions" && <WhatsAppNotification />}
          {activeTab === "attendance" && <Attendance id={userId} />}
          {activeTab === "trainer" && member?.type === "pt" && (
            <TrainerDetails
              trainerData={{
                name: memberData.trainer?.name,
                trainer_id: memberData.trainer?.id,
                diet_chart_url: member?.diet_chart_url,
              }}
              onAddDietChart={handleAddDietChart}
            />
          )}
        </div>
      </div>
      <EditMemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        memberData={memberData.member}
        onSave={handleSave}
      />
      <RenewModal
        isOpen={isRenewOpen}
        onClose={() => setRenewOpen(false)}
        onSave={renewSaveHandler}
        memberId={memberData?.member?.member_id}
      />
      <PaymentBalanceModal
        isOpen={isBalanceOpen}
        onClose={() => setBalanceopen(false)}
        memberId={memberData?.member?.member_id}
        balanceAmt={memberData?.transactions[0]?.balance}
      />
    </div>
  );
};

export default ProfilePage;
