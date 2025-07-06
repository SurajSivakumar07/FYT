import React, { useMemo, useState, useEffect } from "react";
import { supabase } from "../../../services/supabase/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
const MemberInformation = React.memo(
  ({ memberData, showMembership, showIdProof }) => {
    const formattedDob = useMemo(() => {
      return new Date(memberData.dob).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }, [memberData.dob]);

    const formattedStartDate = useMemo(() => {
      return new Date(memberData.start_date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }, [memberData.start_date]);

    const formattedEndDate = useMemo(() => {
      return new Date(memberData.end_date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }, [memberData.end_date]);

    const daysUntilExpiry = useMemo(() => {
      const endDate = new Date(memberData.end_date);
      const today = new Date();
      const timeDiff = endDate - today;
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    }, [memberData.end_date]);

    const [modalOpen, setModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const { userId } = useParams();
    const [documentUrl, setDocumentUrl] = useState(memberData.doucumet_url);
    // Update local state when memberData changes
    useEffect(() => {
      setDocumentUrl(memberData.document_url);
    }, [memberData.document_url]);
    const queryClient = useQueryClient();
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
    const url = import.meta.env.VITE_API_URL;

    const handleFileChangeDocument = async (e) => {
      console.log("inside the button of the document url url");
      const gym_id = 1;
      const file = e.target.files[0];
      if (!file || !memberData?.member_id || !gym_id) {
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

        const filePath = `photosdocument/${
          memberData?.member_id
        }-${Date.now()}.jpg`;

        const { error: uploadError } = await supabase.storage
          .from("members-document")
          .upload(filePath, resizedBlob, {
            contentType: "image/jpeg",
          });

        if (uploadError) throw uploadError;

        const { data: urlData, error: urlError } = supabase.storage
          .from("members-document")
          .getPublicUrl(filePath);

        if (urlError) throw urlError;

        const photoUrl = urlData.publicUrl;
        console.log(photoUrl);

        //Update photo URL in backend
        try {
          console.log("inside the file of document url");

          await axios.put(
            `${url}/gyms/${gym_id}/members/${memberData.member_id}/document-url`,
            { document_url: photoUrl }
          );
          setDocumentUrl(photoUrl);
        } catch (err) {
          console.log(err);
        }

        queryClient.invalidateQueries(["memberprofile", gym_id, userId]);
        alert("Photo uploaded successfully!");
      } catch (err) {
        console.error("Upload error:", err);
        alert("Failed to upload photo");
      } finally {
        setUploading(false);
      }
    };

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
        {/* Personal Info Section */}
        {!showMembership && !showIdProof && (
          <>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-black gap-2">
              <svg
                className="w-6 h-6 text-softBlue"
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
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Phone Number
                </label>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-black">
                    {memberData.phone_number}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l9-6 9 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                    />
                  </svg>
                  Email
                </label>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-black">
                    {memberData.email}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
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
                  Date of Birth
                </label>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-black">{formattedDob}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
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
                  Gender
                </label>
                <p className="font-medium text-black mt-2">
                  {memberData.gender}
                </p>
              </div>
              <div>
                <label
                  className="text-xs text-gray-500 uppercase flex items-center gap-1"
                  title="Blood group is important for emergency situations."
                >
                  <svg
                    className="w-4 h-4 text-softBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v4m0 8v4m4-4h4m-8 0H4"
                    />
                  </svg>
                  Blood Group
                </label>
                <p className="font-medium text-black mt-2">
                  {memberData.blood_group}
                </p>
              </div>
              <div>
                <label
                  className="text-xs text-gray-500 uppercase flex items-center gap-1"
                  title="Type of membership: PT = Personal Training, GT = Group Training, etc."
                >
                  <svg
                    className="w-4 h-4 text-softBlue"
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
                  Member Type
                </label>
                <p className="font-medium text-black mt-2 capitalize">
                  {memberData.type}
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6s-6-6-6 6h12"
                    />
                  </svg>
                  Address
                </label>
                <div className="flex items-center mt-2">
                  <span className="font-medium text-black">
                    {memberData.address}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Membership Section */}
        {showMembership && (
          <>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-black gap-2">
              <svg
                className="w-6 h-6 text-softBlue"
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
              Membership Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2a4 4 0 014-4h2a4 4 0 014 4v2"
                    />
                  </svg>
                  Membership Plan
                </label>
                <p className="font-medium text-black mt-2">
                  {memberData.membership_plan_id}
                </p>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
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
                  Start Date
                </label>
                <p className="font-medium text-black mt-2">
                  {formattedStartDate}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-softBlue"
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
                  End Date
                </label>
                <p className="font-medium text-black mt-2">
                  {formattedEndDate}
                </p>
              </div>
              <div>
                <label
                  className="text-xs text-gray-500 uppercase flex items-center gap-1"
                  title="Days left until membership expires."
                >
                  <svg
                    className="w-4 h-4 text-softPink"
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
                  Days Until Expiry
                </label>
                <p className="font-medium text-softPink mt-2">
                  {daysUntilExpiry} days
                </p>
              </div>

              {memberData.diet_chart && (
                <div>
                  <a
                    href={memberData.diet_chart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Diet Chart
                  </a>
                </div>
              )}
            </div>
          </>
        )}

        <div className="p-6">
          {showIdProof && (
            <>
              <h2 className="text-2xl font-bold mb-6 flex items-center text-black gap-2">
                <svg
                  className="w-6 h-6 text-blue-600"
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
                ID Proof & Documents
              </h2>

              <div className="">
                <div>
                  <label className="text-xs text-gray-500 uppercase mb-2 block flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Document Image
                  </label>

                  <div className="relative group max-w-lg">
                    {documentUrl ? ( // Changed from memberData.doucumet_url to documentUrl
                      <img
                        src={documentUrl}
                        alt="Document Preview"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <input
                          type="file"
                          id="document-upload"
                          onChange={handleFileChangeDocument}
                          className="hidden"
                          accept="image/jpeg,image/png"
                          disabled={uploading}
                        />
                        <label
                          htmlFor="document-upload"
                          className="cursor-pointer w-full max-w-md"
                        >
                          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-white shadow hover:shadow-lg transition-shadow flex flex-col items-center justify-center">
                            {uploading ? (
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                <p className="text-blue-600 font-medium">
                                  Uploading...
                                </p>
                              </div>
                            ) : (
                              <div className="text-center">
                                <svg
                                  className="w-12 h-12 text-gray-400 mb-2 mx-auto"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  />
                                </svg>
                                <p className="text-gray-600 font-medium">
                                  Upload Document
                                </p>
                                <p className="text-gray-400 text-sm mt-1">
                                  Click to select file
                                </p>
                              </div>
                            )}
                          </div>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

export default MemberInformation;
