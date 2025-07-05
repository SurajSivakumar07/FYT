import React, { useEffect, useState } from "react";

const EditMemberModal = ({ isOpen, onClose, memberData, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    diet_chart: "",
  });

  // Load member data into form when modal opens
  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData.name || "",
        phone_number: memberData.phone_number || "",
        email: memberData.email || "",
        address: memberData.address || "",
        diet_chart: memberData.diet_chart || "",
      });
    }
  }, [memberData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Member Details</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Diet Chart</label>
            <textarea
              name="diet_chart"
              value={formData.diet_chart}
              onChange={handleChange}
              className="w-full border p-2 rounded resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
