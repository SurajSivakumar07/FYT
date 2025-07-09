// import React, { useEffect, useState } from "react";
// import { useTrainers } from "../../../hooks/useTrainers";
// import { useGymId } from "../../../hooks/useGymId";

// const EditMemberModal = ({
//   isOpen,
//   onClose,
//   memberData,
//   onSave,
//   oldTrainer,
// }) => {
//   const gym_id = useGymId();
//   const { data: trainers = [], isLoading } = useTrainers(gym_id);

//   const [formData, setFormData] = useState({
//     name: "",
//     phone_number: "",
//     email: "",
//     address: "",
//     diet_chart: "",
//     type: "",
//     trainer_id: null,
//   });

//   // Load form data when modal opens or member changes
//   useEffect(() => {
//     if (memberData) {
//       setFormData({
//         name: memberData.name || "",
//         phone_number: memberData.phone_number || "",
//         email: memberData.email || "",
//         address: memberData.address || "",
//         diet_chart: memberData.diet_chart || "",
//         type: memberData.type,
//         trainer_id: memberData.trainer_id || "",
//       });
//     }
//   }, [memberData]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       // If switching from pt to regular, clear trainer_id
//       if (name === "type" && value !== "pt") {
//         return { ...prev, type: value, trainer_id: "" };
//       }
//       return { ...prev, [name]: value };
//     });
//   };

//   const handleSubmit = () => {
//     const payload = {
//       ...formData,
//       trainer_id: formData.trainer_id ? parseInt(formData.trainer_id) : null, // convert to int if set
//     };
//     onSave(payload);

//     console.log(payload);

//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
//       <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
//           Edit Member Details
//         </h2>

//         <div className="space-y-5">
//           {/* Common fields */}
//           {[
//             { label: "Name", name: "name", type: "text" },
//             { label: "Phone Number", name: "phone_number", type: "text" },
//             { label: "Email", name: "email", type: "email" },
//             { label: "Address", name: "address", type: "text" },
//           ].map((input) => (
//             <div key={input.name}>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {input.label}
//               </label>
//               <input
//                 name={input.name}
//                 value={formData[input.name]}
//                 onChange={handleChange}
//                 type={input.type}
//                 placeholder={`Enter ${input.label.toLowerCase()}`}
//                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           ))}

//           {/* Diet Chart */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Diet Chart
//             </label>
//             <textarea
//               name="diet_chart"
//               value={formData.diet_chart}
//               onChange={handleChange}
//               rows={4}
//               placeholder="Enter diet chart"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
//             />
//           </div>

//           {/* Member Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Member Type
//             </label>
//             <select
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="regular">Regular</option>
//               <option value="pt">Personal Training</option>
//             </select>
//           </div>

//           {/* Trainer Dropdown (shown only when PT) */}
//           {formData.type === "pt" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Trainer
//               </label>
//               <select
//                 name="trainer_id"
//                 value={formData.trainer_id}
//                 onChange={handleChange}
//                 className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select Trainer</option>

//                 {/* Show current trainer (disabled) */}
//                 {oldTrainer?.id && oldTrainer?.name && (
//                   <option value={oldTrainer.id} disabled>
//                     Currently assigned: {oldTrainer.name}
//                   </option>
//                 )}

//                 {/* All trainers except the old one */}
//                 {trainers
//                   ?.filter((t) => t.id !== oldTrainer?.id)
//                   .map((trainer) => (
//                     <option key={trainer.id} value={trainer.id}>
//                       {trainer.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Footer Buttons */}
//         <div className="flex justify-end gap-4 mt-8">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditMemberModal;

import React, { useEffect, useState } from "react";
import { useTrainers } from "../../../hooks/useTrainers";
import { useGymId } from "../../../hooks/useGymId";

const EditMemberModal = ({
  isOpen,
  onClose,
  memberData,
  onSave,
  oldTrainer,
}) => {
  const gym_id = useGymId();
  const { data: trainers = [], isLoading } = useTrainers(gym_id);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    diet_chart: "",
    type: "",
    trainer_id: null,
    occupation: "",
    blood_group: "",
  });

  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData.name || "",
        phone_number: memberData.phone_number || "",
        email: memberData.email || "",
        address: memberData.address || "",
        diet_chart: memberData.diet_chart || "",
        type: memberData.type || "",
        trainer_id: memberData.trainer_id || "",
        occupation: memberData.occupation || "",
        blood_group: memberData.blood_group || "",
      });
    }
  }, [memberData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "type" && value !== "pt") {
        return { ...prev, type: value, trainer_id: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      trainer_id: formData.trainer_id ? parseInt(formData.trainer_id) : null,
    };
    onSave(payload);
    console.log(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Edit Member Details
        </h2>

        <div className="space-y-5">
          {/* Common fields */}
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Phone Number", name: "phone_number", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Address", name: "address", type: "text" },
            { label: "Occupation", name: "occupation", type: "text" },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {input.label}
              </label>
              <input
                name={input.name}
                value={formData[input.name]}
                onChange={handleChange}
                type={input.type}
                placeholder={`Enter ${input.label.toLowerCase()}`}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Diet Chart */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diet Chart
            </label>
            <textarea
              name="diet_chart"
              value={formData.diet_chart}
              onChange={handleChange}
              rows={4}
              placeholder="Enter diet chart"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Member Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Member Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="regular">Regular</option>
              <option value="pt">Personal Training</option>
            </select>
          </div>

          {/* Trainer Dropdown */}
          {formData.type === "pt" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trainer
              </label>
              <select
                name="trainer_id"
                value={formData.trainer_id}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Trainer</option>
                {oldTrainer?.id && oldTrainer?.name && (
                  <option value={oldTrainer.id} disabled>
                    Currently assigned: {oldTrainer.name}
                  </option>
                )}
                {trainers
                  ?.filter((t) => t.id !== oldTrainer?.id)
                  .map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
