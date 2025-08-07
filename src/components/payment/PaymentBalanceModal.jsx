import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { usePendingBalance } from "../../hooks/usePostPendingBalance";
import { Dialog, DialogContent, DialogHeader } from "../ui/Dialog";
import { toast } from "react-toastify";

export default function PaymentBalanceModal({
  isOpen,
  onClose,
  memberId,
  balanceAmt,
}) {
  const [balance, setBalance] = useState({
    amount_paid: 0,
    payment_status: "paid",
  });

  const [paymentError, setPaymentError] = useState(false);
  const { mutate: pendingBalance_mutate, isPending } = usePendingBalance();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBalance((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const submitHandler = () => {
    if (balance.amount_paid > balanceAmt) {
      setPaymentError(true);
      return;
    }

    setPaymentError(false);

    const payment_status =
      balance.amount_paid < balanceAmt ? "pending" : "paid";

    pendingBalance_mutate({
      member_id: memberId,
      data: {
        amount_paid: balance.amount_paid,
        payment_status,
      },
    });

    toast.success("Pending balance updated");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4 p-6 rounded-2xl">
        <DialogHeader>
          <h2 className="text-xl font-semibold text-center">Add Payment</h2>
        </DialogHeader>

        <p className="text-sm text-muted-foreground text-center">
          Pending balance: <span className="font-medium">₹{balanceAmt}</span>
        </p>

        <div className="space-y-2">
          <label className="text-sm font-medium">Amount Paid</label>
          <Input
            type="number"
            name="amount_paid"
            placeholder="Enter amount"
            onChange={handleChange}
            className="w-full"
            value={balance.amount_paid}
            min={0}
          />
          {paymentError && (
            <p className="text-red-500 text-sm">
              Amount should not exceed ₹{balanceAmt}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submitHandler} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
