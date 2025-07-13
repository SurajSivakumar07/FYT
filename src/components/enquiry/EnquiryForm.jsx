// import React, { useState } from "react";
// import { CheckCircle } from "lucide-react";
// import { usePostEnquiry } from "../../hooks/usePostEnquiry";
// import { useGymId } from "../../hooks/useGymId";

// export default function EnquiryForm() {
//   const gym_id = useGymId();

//   const [error, setError] = useState("");
//   const [enquiry, setEnquiry] = useState({
//     gym_id: gym_id,
//     name: "",
//     phone_number: "",
//     message: "",
//     follow_up_date: "",
//     priority: "low",
//     status: "new",
//   });

//   const {
//     mutate,
//     isPending,
//     isSuccess,
//     isError,
//     error: apiError,
//   } = usePostEnquiry();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEnquiry((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (
//       !enquiry.name ||
//       !enquiry.phone_number ||
//       !enquiry.message ||
//       !enquiry.follow_up_date
//     ) {
//       setError({ message: "All fields are required." });
//       return;
//     }

//     // Convert to actual Date object
//     const followUpDate = new Date(enquiry.follow_up_date);

//     const payload = {
//       gym_id: enquiry.gym_id,
//       name: enquiry.name,
//       phone_number: enquiry.phone_number,
//       message: enquiry.message,
//       follow_up_date: followUpDate,
//       priority: enquiry.priority,
//       status: enquiry.status,
//     };

//     mutate(payload, {
//       onSuccess: () => {
//         setEnquiry({
//           gym_id: gym_id,
//           name: "",
//           phone_number: "",
//           message: "",
//           follow_up_date: "",
//           priority: "Medium",
//           status: "pending",
//         });
//       },
//       onError: (err) => {
//         console.log(err);
//       },
//     });
//   };

//   return (
//     <div>
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
//           <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
//           <div className="absolute top-40 right-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
//           <div className="absolute bottom-20 left-20 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
//         </div>

//         <div className="max-w-md mx-auto relative z-10">
//           <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
//             <div className="text-center mb-8">
//               <div className="mb-6">
//                 <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
//                   <svg
//                     className="w-10 h-10 text-white"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="mt-4">
//                   <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                     Enquiry
//                   </h2>
//                   <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-2 rounded-full"></div>
//                 </div>
//               </div>

//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 Add New Enquiry
//               </h1>
//             </div>

//             <div className="space-y-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Client Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={enquiry.name}
//                   onChange={handleInputChange}
//                   placeholder="e.g., Alex"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Client Number
//                 </label>
//                 <input
//                   type="text"
//                   name="phone_number"
//                   value={enquiry.phone_number}
//                   onChange={handleInputChange}
//                   placeholder="e.g., 9033921234"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Details
//                 </label>
//                 <input
//                   type="text"
//                   name="message"
//                   value={enquiry.message}
//                   onChange={handleInputChange}
//                   placeholder="Follow up message details"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Follow-Up Date
//                 </label>
//                 <input
//                   type="date"
//                   name="follow_up_date"
//                   value={enquiry.follow_up_date}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-semibold text-gray-700">
//                   Priority
//                 </label>
//                 <select
//                   name="priority"
//                   value={enquiry.priority}
//                   onChange={handleInputChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
//                   required
//                 >
//                   <option value="Low">Low</option>
//                   <option value="Medium">Medium</option>
//                   <option value="High">High</option>
//                 </select>
//               </div>

//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
//                 >
//                   {isPending ? "Adding ... " : "Submit Enquiry"}
//                 </button>
//               </div>
//             </div>

//             {isSuccess ? (
//               <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center rounded-lg shadow-sm">
//                 <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
//                 <p>Submitted Enquiry!</p>
//               </div>
//             ) : (
//               apiError && (
//                 <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center rounded-lg shadow-sm">
//                   <p>{apiError.message}</p>
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { usePostEnquiry, useUpdateEnquiry } from "../../hooks/usePostEnquiry";
import { useGymId } from "../../hooks/useGymId";

export default function EnquiryForm({
  initialData = null,
  mode = "create",
  onSuccess = () => {},
}) {
  const gym_id = useGymId();
  const [error, setError] = useState("");
  const [enquiry, setEnquiry] = useState({
    gym_id: gym_id,
    name: "",
    phone_number: "",
    message: "",
    follow_up_date: "",
    priority: "Low",
    status: "new",
  });

  const {
    mutate: postEnquiry,
    isPending: isPosting,
    isSuccess: postSuccess,
    isError: postError,
    error: postApiError,
  } = usePostEnquiry();

  const {
    mutate: updateEnquiry,
    isPending: isUpdating,
    isSuccess: updateSuccess,
    isError: updateError,
    error: updateApiError,
  } = useUpdateEnquiry(); // You'll create this hook

  useEffect(() => {
    if (initialData && mode === "edit") {
      setEnquiry({
        gym_id: initialData.gym_id || gym_id,
        name: initialData.name || "",
        phone_number: initialData.phone_number || "",
        message: initialData.message || "",
        follow_up_date: initialData.follow_up_date?.slice(0, 10) || "",
        priority: initialData.priority || "Low",
        status: initialData.status || "new",
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setError("");

    if (
      !enquiry.name ||
      !enquiry.phone_number ||
      !enquiry.message ||
      !enquiry.follow_up_date
    ) {
      setError({ message: "All fields are required." });
      return;
    }

    const followUpDate = new Date(enquiry.follow_up_date);

    const payload = {
      ...enquiry,
      follow_up_date: followUpDate,
    };

    if (mode === "edit") {
      updateEnquiry(
        { enquiry_id: initialData.enquiry_id, data: payload },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      postEnquiry(payload, {
        onSuccess: () => {
          setEnquiry({
            gym_id: gym_id,
            name: "",
            phone_number: "",
            message: "",
            follow_up_date: "",
            priority: "Low",
            status: "new",
          });
          onSuccess();
        },
      });
    }
  };

  const isSuccess = mode === "edit" ? updateSuccess : postSuccess;
  const isPending = mode === "edit" ? isUpdating : isPosting;
  const apiError = mode === "edit" ? updateApiError : postApiError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-md mx-auto relative z-10">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {mode === "edit" ? "Edit Enquiry" : "New Enquiry"}
                </h2>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {["name", "phone_number", "message", "follow_up_date"].map(
              (field) => (
                <div className="space-y-2" key={field}>
                  <label className="block text-sm font-semibold text-gray-700 capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type={field === "follow_up_date" ? "date" : "text"}
                    name={field}
                    value={enquiry[field]}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white"
                  />
                </div>
              )
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={enquiry.priority}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={enquiry.status}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 hover:bg-white"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="pending">Pending</option>
                <option value="joined">Joined</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:scale-105 transition-all duration-200"
              >
                {isPending
                  ? mode === "edit"
                    ? "Updating..."
                    : "Adding..."
                  : mode === "edit"
                  ? "Update Enquiry"
                  : "Submit Enquiry"}
              </button>
            </div>
          </div>

          {isSuccess ? (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 flex items-center rounded-lg shadow-sm">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              <p>{mode === "edit" ? "Updated" : "Submitted"} Enquiry!</p>
            </div>
          ) : (
            apiError && (
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center rounded-lg shadow-sm">
                <p>{apiError.message}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
