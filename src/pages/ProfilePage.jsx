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

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorEditing, SetError] = useState(false);
  const [errorEditingMess, SetErrorMes] = useState(false);

  const gym_id = 1; // Consider making this dynamic
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

  const handleSave = async (updatedData) => {
    // try {
    //   const res = await axios.put(
    //     `${url}/members/${memberData.member.member_id}`,
    //     updatedData
    //   );

    //   if (res.status === 200) {
    //     alert("Updated successfully");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   SetErrorMes(err.message);
    //   SetError(true);
    // }
    updateMember({
      memberId: memberData.member.member_id,
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

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
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
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-softBlue via-white to-softPink" />
              <div className="relative group">
                <input
                  type="file"
                  id="profile-photo-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/jpeg,image/png"
                />
                <label
                  htmlFor="profile-photo-upload"
                  className="cursor-pointer"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 shadow hover:opacity-80 transition-opacity">
                    <img
                      src={
                        member?.photo_url && member.photo_url.trim() !== null
                          ? member.photo_url
                          : "https://www.svgrepo.com/show/513156/user.svg"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                    {uploading ? "Uploading..." : "Change"}
                  </div>
                </label>
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-black drop-shadow-sm mb-1">
                {member?.name}
              </h1>
              <p className="text-softBlue text-base font-medium mb-2">
                Member ID: {userId}
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
                {member?.status === "active" ? "Active" : "Inactive"}
              </span>
              {memberData?.transactions[0]?.balance == null ||
              memberData?.transactions[0]?.balance === 0 ? (
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm mt-2 ml-2">
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
                <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold shadow-sm mt-2 ml-2">
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

            {memberData?.transactions[0]?.balance > 0 && (
              <button
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:from-orange-500 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 mt-2"
                onClick={() => setIsOpen(true)}
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
          {/* {activeTab === "id-proof" && (
            <MemberInformation memberData={member} showIdProof />
          )} */}
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
    </div>
  );
};

export default ProfilePage;
