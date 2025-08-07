import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import { usePlans } from "../../hooks/usePlans";
import { useUpdateMemberPlan } from "../../hooks/useMembers";

export default function MemberPlanUpdate({
  isOpen,
  onClose,
  memberId,
  gymId,
  TranscationDetails,
}) {
  const { data: plans = [], isLoading } = usePlans(gymId);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState("");
  const [amountPaid, setAmountPaid] = useState(
    TranscationDetails?.amount_paid || ""
  );
  const [balance, setBalance] = useState(0);
  const {
    mutate: updatePlan,
    isPending,
    isSuccess,
    isError,
  } = useUpdateMemberPlan();

  const onSubmitUpdate = (payload) => {
    updatePlan({
      gym_id: gymId,
      member_id: memberId,
      data: payload,

      onError: (err) => {
        console.log(err);
      },
    });
    if (isSuccess) {
      setSelectedPlan(null);
      setStartDate(dayjs().format("YYYY-MM-DD"));
      setEndDate("");
      setAmountPaid("");
      setBalance(0);
      onClose();
    }
  };

  useEffect(() => {
    if (selectedPlan) {
      const calculatedEndDate = dayjs(startDate)
        .add(selectedPlan.duration_days, "day")
        .format("YYYY-MM-DD");
      setEndDate(calculatedEndDate);
      setAmountPaid(selectedPlan.price);
    }
  }, [selectedPlan, startDate]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    if (selectedPlan && amountPaid !== "") {
      const bal = selectedPlan.price - parseFloat(amountPaid || 0);
      setBalance(isNaN(bal) ? 0 : bal);
    }
  }, [amountPaid, selectedPlan]);
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan) return alert("Please select a plan");
    const payload = {
      plan_id: selectedPlan.id,
      start_date: startDate,
      end_date: endDate,
      amount_paid: parseFloat(amountPaid),
      balance: balance,
    };
    onSubmitUpdate(payload);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-lg w-full max-w-md max-h-[70vh] sm:max-h-[90vh] overflow-y-auto"
        ref={modalRef}
      >
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Update Member Plan
          </h2>

          {isLoading ? (
            <p className="text-center text-gray-600">Loading plans...</p>
          ) : (
            <div className="mb-4">
              <label className="block font-medium text-sm sm:text-base mb-1">
                Select Plan
              </label>
              <select
                value={selectedPlan?.id || ""}
                onChange={(e) => {
                  const selected = plans.find(
                    (plan) => plan.id === parseInt(e.target.value)
                  );

                  setSelectedPlan(selected || null);
                }}
                className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  -- Choose a plan --
                </option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ₹{plan.price} • {plan.duration_days} days
                  </option>
                ))}
              </select>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"

                //   className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base bg-gray-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Amount Paid (₹)
              </label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-sm sm:text-base mb-1">
                Balance (₹)
              </label>
              <input
                type="text"
                value={balance}
                readOnly
                className="w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base bg-gray-100"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base transition-colors duration-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
