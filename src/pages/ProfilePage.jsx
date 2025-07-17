import React, { useEffect, useState } from "react";
import MemberInformation from "../components/members/profile/MemberInformation";
import WhatsAppNotification from "../components/members/profile/WhatsAppNotification";
import Attendance from "../components/members/profile/Attendance";
import TrainerDetails from "../components/members/profile/TrainerDetails";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Ensure you import toast

import { supabase } from "../services/supabase/supabase";
import { useMemberProfile } from "../hooks/useMemberProfile";
import EditMemberModal from "../components/members/profile/EditMemberModal";
import { useEditMemberProfile } from "../hooks/useEditMemberProfile";
import RenewModal from "../components/renew/RenewModal";
import { usePostRenew } from "../hooks/useRenewPost";
import PaymentBalanceModal from "../components/payment/PaymentBalanceModal";
import { PageLoader } from "../App";
import { useGymId } from "../hooks/useGymId";
import UpdateTranscation from "../components/transcations/UpdateTranscation";

import { motion, AnimatePresence } from "framer-motion";
import {
  UserCircle,
  Edit3,
  RefreshCw,
  CreditCard,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Trash,
} from "lucide-react";
import { useDeleteMember } from "../hooks/useDeleteMember";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRenewOpen, setRenewOpen] = useState(false);
  const [errorEditing, SetError] = useState(false);
  const [errorEditingMess, SetErrorMes] = useState(false);

  const navigate = useNavigate();
  const [isBalanceOpen, setBalanceopen] = useState(false);
  const [isTranscatoinOpen, setTranscation] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const gym_id = useGymId();
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const url = import.meta.env.VITE_API_URL;
  const { mutate: deleteMember, isLoading: deletMeberLoading } =
    useDeleteMember(navigate);

  const {
    data: memberData = {},
    isLoading,
    error,
  } = useMemberProfile(gym_id, userId);

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
  const handleDeleteProfilePhoto = async () => {
    const { data, error } = await supabase.storage
      .from("member-photos")
      .remove([`photos/${memberData?.member?.member_id}.jpg`]);

    if (data) {
      console.log(data);

      const { data: dbResult, error: dbError } = await supabase
        .from("members")
        .update({ photo_url: null })
        .eq("member_id", memberData?.member?.member_id);
      if (dbError) {
        console.error("❌ DB update failed:", dbError.message);
      } else {
        console.log("✅ Cleared photo_url in DB:", dbResult);
      }
      queryClient.invalidateQueries(["members", gym_id]);
      queryClient.invalidateQueries(["memberprofile"]);
      toast.success("sucess");
    }
    if (error) {
      console.log(error);
      toast.error("failed", error);
    }
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

      const filePath = `photos/${memberData.member.member_id}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("member-photos")
        .upload(filePath, resizedBlob, {
          contentType: "image/jpeg",
        });

      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = supabase.storage
        .from("member-photos")
        .getPublicUrl(filePath);

      console.log("Uploaded path:", filePath);

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

  if (isLoading) return <PageLoader />;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500">
        Error loading profile.
      </div>
    );

  const member = memberData.member;

  const getButtonClasses = (variant) => {
    const baseClasses =
      "relative px-5 py-2.5 rounded-lg font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 group hover:shadow-xl transform hover:-translate-y-0.5";

    switch (variant) {
      case "primary":
        return `${baseClasses} bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 border border-gray-600`;
      case "balance":
        return `${baseClasses} bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700`;
      default:
        return baseClasses;
    }
  };

  const actionButtons = [
    {
      id: "edit",
      label: "Edit Profile",
      icon: Edit3,
      onClick: () => {
        setIsOpen(true);
        setShowActions(false);
      },
      variant: "primary",
    },
    // {
    //   id: "delete",
    //   lable: "Delete Member",
    //   icon: Trash,
    //   onClick: () => {
    //     handleDelete();
    //   },
    //   variant: "primary",
    // },
    {
      id: "transaction",
      label: "Update Transaction",
      icon: CreditCard,
      onClick: () => {
        setTranscation(true);
        setShowActions(false);
      },
      variant: "primary",
    },
    {
      id: "renew",
      label: "Renew Membership",
      icon: RefreshCw,
      onClick: () => {
        setRenewOpen(true);
        setShowActions(false);
      },
      variant: "primary",
      condition: member?.status === "expired",
    },
    {
      id: "balance",
      label: "Update Balance",
      icon: DollarSign,
      onClick: () => {
        setBalanceopen(true);
        setShowActions(false);
      },

      variant: "balance",
      condition: memberData?.transactions[0]?.balance > 0,
      badge: `₹${memberData?.transactions[0]?.balance}`,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white min-h-screen">
      {/* Header Section */}
      <div className="relative rounded-2xl mb-6 min-h-[120px]">
        <div className="absolute inset-0 bg-gradient-to-r from-softBlue via-softPink to-blue-100 opacity-60"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            {/* Profile Photo Section */}

            <div className="relative group shrink-0">
              {member?.photo_url && member.photo_url.trim() !== "" ? (
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer relative">
                  <img
                    src={member.photo_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this photo?"
                        )
                      ) {
                        handleDeleteProfilePhoto();
                      }
                    }}
                  />
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    id="profile-photo-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/jpeg,image/png"
                    disabled={uploading}
                  />
                  <label
                    htmlFor="profile-photo-upload"
                    className="cursor-pointer"
                  >
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors flex items-center justify-center shadow-xl">
                      {uploading ? (
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-1"></div>
                          <p className="text-xs text-blue-600">Uploading...</p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg
                            className="w-8 h-8 text-gray-400 mb-1 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                          <p className="text-xs text-gray-600">Upload Photo</p>
                        </div>
                      )}
                    </div>
                  </label>
                </>
              )}
            </div>
            {/* Member Info */}
            <div className="min-w-[200px] flex-1">
              <h1 className="text-4xl font-extrabold text-black drop-shadow-sm mb-1 break-words">
                {member?.name}
              </h1>
              <p className="text-softBlue text-base font-medium mb-2">
                Member ID: {userId}
              </p>

              {/* Status and Balance Badges */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    member?.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {member?.status === "active" ? (
                    <CheckCircle className="w-4 h-4 mr-1" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mr-1" />
                  )}
                  {member?.status === "active" ? "Active" : "Expired"}
                </span>

                {memberData?.transactions[0]?.balance == null ||
                memberData?.transactions[0]?.balance === 0 ? (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold shadow-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Fully Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold shadow-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    Balance: ₹{memberData?.transactions[0]?.balance}
                  </span>
                )}

                {member?.type === "pt" && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow-sm">
                    <User className="w-4 h-4 mr-1" />
                    Personal Trainer
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons Dropdown */}
          <div className="relative inline-block">
            <div className="flex items-center justify-end">
              <div className="relative">
                <button
                  className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-white/20 backdrop-blur-sm transition-all duration-200 group border border-white/20"
                  onClick={() => setShowActions(!showActions)}
                >
                  <div className="relative">Edit</div>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {member?.name}
                    </div>
                    <div className="text-xs text-gray-500">ID: {userId}</div>
                  </div>
                  {showActions ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 transition-transform" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform" />
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons Dropdown */}
            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[280px] z-[1000] sm:absolute sm:top-full sm:left-auto sm:right-0 sm:-translate-x-0 sm:-translate-y-0 sm:w-[280px]"
                >
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-full max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col gap-3 items-center">
                      {actionButtons.map((button) => {
                        if (button.condition !== undefined && !button.condition)
                          return null;

                        const IconComponent = button.icon;

                        return (
                          <button
                            key={button.id}
                            className={getButtonClasses(button.variant)}
                            onClick={button.onClick}
                            style={{ justifyContent: "center" }}
                          >
                            <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="flex-1 text-center">
                              {button.label}
                            </span>
                            {button.badge && (
                              <span className="bg-white/90 text-orange-700 px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
                                {button.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Status Indicator */}
                    {member?.status && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              member.status === "expired"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          ></div>
                          <span className="text-xs text-gray-600">
                            Status:{" "}
                            <span
                              className={`font-semibold ${
                                member.status === "expired"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {member.status.charAt(0).toUpperCase() +
                                member.status.slice(1)}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Member Since
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {member?.created_at
                              ? new Date(member.created_at).toLocaleDateString()
                              : "N/A"}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                            <User className="w-3 h-3" />
                            Type
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {member?.type?.toUpperCase() || "Regular"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {!errorEditing && errorEditingMess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-md"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{errorEditingMess}</span>
                </div>
              </motion.div>
            )}

            {/* Backdrop for mobile */}
            {showActions && (
              <div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[900] sm:hidden"
                onClick={() => setShowActions(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white/80 rounded-2xl shadow-lg p-4 sm:p-6">
        <nav
          className="flex flex-wrap sm:flex-nowrap gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto bg-white rounded-xl p-3 sm:p-4 shadow-md"
          role="tablist"
        >
          {[
            "personal",
            "membership",
            "id-proof",
            "actions",
            "attendance",
            "transcation",
            ...(member?.type === "pt" ? ["trainer"] : []),
          ].map((tab) => (
            <button
              key={tab}
              className={`tab-button whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-softBlue/50 shadow-sm text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-gradient-to-r from-softBlue to-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-softBlue/10 hover:text-softBlue"
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MemberInformation memberData={member} />
            </motion.div>
          )}
          {activeTab === "membership" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MemberInformation memberData={member} showMembership />
            </motion.div>
          )}
          {activeTab === "id-proof" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MemberInformation memberData={member} showIdProof />
            </motion.div>
          )}
          {activeTab === "transcation" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MemberInformation memberData={memberData} showTranscation />
            </motion.div>
          )}
          {activeTab === "actions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <WhatsAppNotification memberData={memberData} />
            </motion.div>
          )}
          {activeTab === "attendance" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Attendance id={userId} />
            </motion.div>
          )}
          {activeTab === "trainer" && member?.type === "pt" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TrainerDetails
                trainerData={{
                  name: memberData.trainer?.name,
                  trainer_id: memberData.trainer?.id,
                  diet_chart_url: member?.diet_chart_url,
                }}
                onAddDietChart={handleAddDietChart}
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Modals */}
      {/* <EditMemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        memberData={memberData.member}
        onSave={handleSave}
      /> */}
      <EditMemberModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        memberData={memberData.member}
        onSave={handleSave}
        oldTrainer={{
          id: memberData.trainer?.id,
          name: memberData.trainer?.name, // or derive it from trainers list
        }}
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
      <UpdateTranscation
        isOpen={isTranscatoinOpen}
        onClose={() => setTranscation(false)}
        memberId={memberData?.member?.member_id}
      />
    </div>
  );
};

export default ProfilePage;
