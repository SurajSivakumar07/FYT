// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
// } from "../ui/Dialog";
// import { Input } from "../ui/Input";
// import { Button } from "../ui/Button";
// import { useUpdateTranscation } from "../../hooks/useUpdateTranscation";

// export default function UpdateTranscation({ isOpen, onClose, memberId }) {
//   const [formData, setFormData] = useState({
//     payment_date: "",
//   });

//   const { mutate, isPending, isSuccess } = useUpdateTranscation();
//   const handleChange = (e) => {
//     setFormData({ ...formData, payment_date: e.target.value });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.payment_date || !memberId) return;

//     const isoDate = new Date(formData.payment_date).toISOString().split("T")[0];

//     mutate({
//       member_id: memberId,
//       data: { payment_date: isoDate },
//     });
//     if (isSuccess) {
//       onClose();
//     }
//   };
//   return (
//     <>
//       <Dialog open={isOpen} onOpenChange={onClose}>
//         <DialogContent>
//           <DialogHeader>Update Transcation</DialogHeader>

//           <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//             <Input
//               type="date"
//               name="payment_date"
//               value={formData.payment_date}
//               onChange={handleChange}
//               required
//             />
//             <DialogFooter className="gap-2">
//               <Button type="button" variant="ghost" onClick={onClose}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isPending}>
//                 {isPending ? "Updating..." : "Update"}
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useUpdateTranscation } from "../../hooks/useUpdateTranscation";

export default function UpdateTranscation({
  isOpen,
  onClose,
  memberId,
  prevTranscation,
}) {
  const [formData, setFormData] = useState({
    payment_date: prevTranscation?.payment_date,
    amount_paid: prevTranscation?.amount_paid,
    balance: prevTranscation?.balance,
  });

  const { mutate, isPending, isSuccess } = useUpdateTranscation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.payment_date || !memberId) return;

    const isoDate = new Date(formData.payment_date).toISOString().split("T")[0];

    const amountPaid = parseFloat(formData.amount_paid);
    const balance = parseInt(formData.balance);

    mutate({
      member_id: memberId,
      data: {
        payment_date: isoDate,
        amount_paid: amountPaid,
        balance: balance,
      },
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
            <label className="block text-sm font-medium text-gray-700">
              Transcation Date
            </label>
            <Input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
            />
            <label className="block text-sm font-medium text-gray-700">
              Amount Paid
            </label>
            <Input
              type="number"
              name="amount_paid"
              value={formData.amount_paid}
              onChange={handleChange}
              placeholder="Amount Paid"
              // required
            />
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <Input
              type="number"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="Balance Amount"
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
