import React from "react";

const MemberInformation = ({ memberData, showMembership, showIdProof }) => {
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

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      {!showMembership && !showIdProof && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
            <svg
              className="w-5 h-5 mr-2 text-softBlue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Phone Number
              </label>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 mr-2 text-softBlue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span className="font-medium text-black">
                  {memberData.phone_number}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Email</label>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 mr-2 text-softBlue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l9-6 9 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                  ></path>
                </svg>
                <span className="font-medium text-black">
                  {memberData.email}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Date of Birth
              </label>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 mr-2 text-softBlue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="font-medium text-black">
                  {formatDate(memberData.dob)}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Gender</label>
              <p className="font-medium text-black mt-2">{memberData.gender}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Blood Group
              </label>
              <p className="font-medium text-black mt-2">
                {memberData.blood_group}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Member Type
              </label>
              <p className="font-medium text-black mt-2 capitalize">
                {memberData.type}
              </p>
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-500 uppercase">Address</label>
              <div className="flex items-center mt-2">
                <svg
                  className="w-4 h-4 mr-2 text-softBlue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6s-6-6-6 6h12"
                  ></path>
                </svg>
                <span className="font-medium text-black">
                  {memberData.address}
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {showMembership && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
            <svg
              className="w-5 h-5 mr-2 text-softBlue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h10M9 6h6"
              ></path>
            </svg>
            Membership Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Membership Plan
              </label>
              <p className="font-medium text-black mt-2">
                {memberData.membership_plan_id}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">Trainer</label>
              <p className="font-medium text-black mt-2">
                {memberData.trainer_name}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Start Date
              </label>
              <p className="font-medium text-black mt-2">
                {formatDate(memberData.start_date)}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                End Date
              </label>
              <p className="font-medium text-black mt-2">
                {formatDate(memberData.end_date)}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Days Until Expiry
              </label>
              <p className="font-medium text-softPink mt-2">
                {calculateDaysUntilExpiry()} days
              </p>
            </div>
          </div>
        </>
      )}

      {showIdProof && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
            <svg
              className="w-5 h-5 mr-2 text-softBlue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            ID Proof & Documents
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Document Type
                </label>
                <p className="font-medium text-black mt-2">
                  {memberData.id_proof.type}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Document Number
                </label>
                <p className="font-medium text-black mt-2">
                  {memberData.id_proof.number}
                </p>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase mb-2 block">
                Document Image
              </label>
              <div className="relative group">
                <img
                  src={memberData.id_proof.document_url}
                  alt="ID Proof Document"
                  className="w-full max-w-md h-32 object-cover rounded-lg border border-softPink shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                  <button
                    className="bg-softBlue text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center shadow-md"
                    aria-label="View full document"
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
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12A9.001 9.001 0 0012 3c4.972 0 9.001 4.03 9.001 9s-4.029 9-9.001 9c-4.972 0-9-4.03-9-9zM18 12h.01"
                      ></path>
                    </svg>
                    View Full
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberInformation;
