import React, { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { format, addDays } from "date-fns";
import { usePostRenew } from "../../hooks/useRenewPost";
import { usePlans } from "../../hooks/usePlans";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { useGymId } from "../../hooks/useGymId";

const RenewModal = ({ isOpen, onClose, memberId }) => {
  const gymId = useGymId();
  const { mutate: renewMember, isPending } = usePostRenew();
  const { data: plans = [], isLoading: plansLoading } = usePlans(gymId);

  const [formData, setFormData] = useState({
    membership_plan_id: "",
    start_date: format(new Date(), "yyyy-MM-dd"),
    end_date: "",
    amount_paid: "",
    status: "active",
    pending_balance: 0,
    transaction_type: "cash",
    payment_status: "paid",
    remarks: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const selectedPlan = plans.find(
      (p) => p.id === parseInt(formData.membership_plan_id)
    );

    if (selectedPlan) {
      const startDate = new Date(formData.start_date);
      const endDate = addDays(startDate, selectedPlan.duration_days);

      // If user hasn't touched amount_paid, set it to plan price
      const autoAmountPaid =
        formData.amount_paid === ""
          ? selectedPlan.price
          : parseFloat(formData.amount_paid);

      const pending = Math.max(selectedPlan.price - autoAmountPaid, 0);

      setFormData((prev) => ({
        ...prev,
        end_date: format(endDate, "yyyy-MM-dd"),
        amount_paid:
          formData.amount_paid === "" ? selectedPlan.price : prev.amount_paid,
        pending_balance: pending,
        payment_status: pending > 0 ? "pending" : "paid",
      }));
    }
  }, [
    formData.start_date,
    formData.membership_plan_id,
    plans,
    formData.amount_paid,
  ]);

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      membership_plan_id: parseInt(formData.membership_plan_id),
      amount_paid: parseFloat(formData.amount_paid),
      pending_balance: parseInt(formData.pending_balance),
    };

    try {
      await renewMember({ member_id: memberId, data: payload });
      onClose(); // custom logic
    } catch (err) {
      toast.error("Renewal failed. Please try again.");
      console.error("Renew error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>Renew Membership</DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Plan Dropdown */}
          <div>
            <Label>Select Plan</Label>
            <select
              name="membership_plan_id"
              value={formData.membership_plan_id}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="">Select a plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name} - {plan.duration_days} days - ₹{plan.price}
                </option>
              ))}
            </select>
          </div>

          {/* Start and End Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                name="end_date"
                value={formData.end_date}
                disabled
              />
            </div>
          </div>

          {/* Amount and Balance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Amount Paid</Label>
              <Input
                type="number"
                name="amount_paid"
                value={formData.amount_paid}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Pending Balance</Label>
              <Input
                type="number"
                name="pending_balance"
                value={formData.pending_balance}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Transaction Type and Payment Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Transaction Type</Label>
              <select
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          {/* Remarks */}
          <div>
            <Label>Remarks</Label>
            <Input
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Optional remarks"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <span className="flex items-center">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Renewing...
              </span>
            ) : (
              "Renew"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewModal;
