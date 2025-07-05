import React, { useMemo, useState } from "react";

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

        {showIdProof && (
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              ID Proof & Documents
            </h2>
            <div className="border-2 border-softPink rounded-xl p-6 bg-softPink/5 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
                      />
                    </svg>
                    Document Type
                  </label>
                  <p className="font-medium text-black mt-2">
                    {memberData.id_proof.type}
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Document Number
                  </label>
                  <p className="font-medium text-black mt-2">
                    {memberData.id_proof.number}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase mb-2 block flex items-center gap-1">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Document Image
                </label>
                <div className="relative group max-w-lg">
                  <img
                    src={memberData.id_proof.document_url}
                    alt="ID Proof Document"
                    className="w-full h-48 object-cover rounded-lg border border-softPink shadow-md cursor-pointer transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                    onClick={() => setModalOpen(true)}
                  />
                  <div className="absolute top-2 right-2 flex gap-2 opacity-80 group-hover:opacity-100">
                    <button
                      className="bg-softBlue text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md hover:bg-softBlue/90"
                      aria-label="View full document"
                      onClick={() => setModalOpen(true)}
                    >
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12A9.001 9.001 0 0012 3c4.972 0 9.001 4.03 9.001 9s-4.029 9-9.001 9c-4.972 0-9-4.03-9-9zM18 12h.01"
                        />
                      </svg>
                      View Full
                    </button>
                    <a
                      href={memberData.id_proof.document_url}
                      download
                      className="bg-softPink text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-md hover:bg-softPink/90"
                      aria-label="Download document"
                    >
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
                          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                  {/* Modal/Lightbox */}
                  {modalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                      <div className="bg-white rounded-xl p-4 max-w-2xl w-full relative shadow-2xl">
                        <button
                          className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
                          onClick={() => setModalOpen(false)}
                          aria-label="Close"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <img
                          src={memberData.id_proof.document_url}
                          alt="ID Proof Document Full"
                          className="w-full h-[60vh] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

export default MemberInformation;
