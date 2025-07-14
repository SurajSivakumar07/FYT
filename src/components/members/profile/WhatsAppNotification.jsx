import React from "react";
import { usePostInvoice } from "../../../hooks/whatsapp/usePostInvoice";
import { useGymId } from "../../../hooks/useGymId";
import { useExpiryReminder } from "../../../hooks/whatsapp/useExpiryReminder";

const WhatsAppNotification = ({ memberData }) => {
  const { mutate, isPending, isSuccess } = usePostInvoice();

  const { mutate: expiryMutate, isPending: isExpiryNotifcationPending } =
    useExpiryReminder();

  const gym_id = useGymId();
  const txn = memberData?.transactions?.[memberData.transactions.length - 1];
  const member = memberData?.member;
  const plan = memberData?.plan;
  const invoiceHandler = () => {
    mutate({
      data: {
        member_name: member?.name || "Unknown",
        address: member?.address || "Not provided",
        payment_mode: txn?.transaction_type || "Cash",
        payment_date:
          txn?.payment_date || new Date().toISOString().split("T")[0],
        amount: (txn?.amount_paid ?? 0) + (txn?.balance ?? 0),
        amount_paid: txn?.amount_paid ?? 0,
        balance: txn?.balance ?? 0,
        start_date: member?.start_date || txn?.payment_date,
        end_date: member?.end_date || txn?.payment_date,
        membership_type: plan?.name,
        member_phonenumber: "91" + (member?.phone_number || "0000000000"),
        duration: plan?.duration_days,
      },
      gym_id: gym_id,
    });
  };

  const handleExpiryButton = () => {
    console.log({
      member_name: member?.name || "Unknown",
      plane_name: plan?.name,
      expiry_data: member?.end_date || txn?.payment_date,
      phone_number: "91" + (member?.phone_number || "0000000000"),
    });
    expiryMutate({
      data: {
        member_name: member?.name || "Unknown",
        plane_name: plan?.name,
        expiry_data: member?.end_date || txn?.payment_date,
        phone_number: "91" + (member?.phone_number || "0000000000"),
      },
      gym_id: gym_id,
    });
  };

  return (
    <div className="bg-white-100 rounded-2xl p-6 shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
      <div className="space-y-3">
        <button
          className="w-full bg-black text-white py-2.5 px-4 rounded-lg hover:opacity-90 flex items-center justify-center transition-all duration-200 shadow-md disabled:opacity-60"
          aria-label="Send invoice via WhatsApp"
          onClick={invoiceHandler}
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send Invoice via WhatsApp"}
        </button>
        <button
          className="w-full bg-gradient-to-r from-softPink to-softBlue text-black py-2.5 px-4 rounded-lg hover:opacity-90 flex items-center justify-center transition-all duration-200 shadow-md"
          aria-label="Send expiry reminder"
          onClick={handleExpiryButton}
        >
          {isExpiryNotifcationPending ? "Sending..." : "Expiry Reminder"}
        </button>
      </div>
    </div>
  );
};

export default WhatsAppNotification;
