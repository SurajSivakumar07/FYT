import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useUpdateTranscation } from "../../hooks/useUpdateTranscation";

export default function UpdateTranscation({ isOpen, onClose, memberId }) {
  const [formData, setFormData] = useState({
    payment_date: "",
  });

  const { mutate, isPending, isSuccess } = useUpdateTranscation();
  const handleChange = (e) => {
    setFormData({ ...formData, payment_date: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.payment_date || !memberId) return;

    const isoDate = new Date(formData.payment_date).toISOString().split("T")[0];

    mutate({
      member_id: memberId,
      data: { payment_date: isoDate },
    });
    if (isSuccess) {
      onClose();
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>Update Transcation</DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
            />
            <DialogFooter className="gap-2">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
