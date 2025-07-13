import React, { useState, useEffect } from "react";
import { useUpdateEnquiry } from "../../hooks/usePostEnquiry";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/Dialog";
import { toast } from "react-toastify";
import axios from "axios";
export default function EnquiryEditModal({ open, onClose, enquiry }) {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    message: "",
    follow_up_date: "",
    priority: "",
    status: "",
  });

  useEffect(() => {
    if (enquiry) {
      setFormData({
        name: enquiry.name || "",
        phone_number: enquiry.phone_number || "",
        message: enquiry.message || "",
        follow_up_date: enquiry.enquiry_date
          ? new Date(enquiry.enquiry_date).toISOString().split("T")[0]
          : "",
        priority: enquiry.priority || "medium",
        status: enquiry.status || "new",
      });
    }
  }, [enquiry]);

  const { mutate, isPending } = useUpdateEnquiry();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    mutate(
      {
        enquiry_id: enquiry.id,
        data: {
          ...formData,
          follow_up_date: new Date(formData.follow_up_date),
          gym_id: enquiry.gym_id,
        },
      },
      {
        onSuccess: () => {
          toast.success("Enquiry updated");
          onClose();
        },
        onError: (error) => {
          toast.error(error);
          console.error(
            "Update failed:",
            error.response?.data || error.message
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogHeader>Edit Enquiry</DialogHeader>

      <DialogContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Client name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="9033921234"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <input
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Message..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Follow-Up Date</label>
            <input
              name="follow_up_date"
              type="date"
              value={formData.follow_up_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="pending">Pending</option>
              <option value="joined">Joined</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </DialogFooter>
    </Dialog>
  );
}
