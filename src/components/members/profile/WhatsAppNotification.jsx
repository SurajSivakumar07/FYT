import React from "react";
import { usePostInvoice } from "../../../hooks/whatsapp/usePostInvoice";
import { useGymId } from "../../../hooks/useGymId";

const WhatsAppNotification = ({ memberData }) => {
  const { mutate, isPending, isSucess } = usePostInvoice();
  const gym_id = useGymId();
  const invoiceHandler = () => {
    const txn = memberData?.transactions?.[memberData.transactions.length - 1];
    const member = memberData?.member;

    console.log({
      member_name: member?.name || "Unknown",
      address: member?.address || "Not provided",
      payment_mode: txn?.transaction_type || "Cash",
      payment_date: txn?.payment_date || new Date().toISOString().split("T")[0],
      amount: (txn?.amount_paid ?? 0) + (txn?.balance ?? 0),
      amount_paid: txn?.amount_paid ?? 0,
      balance: txn?.balance ?? 0,
      start_date: member?.start_date || txn?.payment_date,
      end_date: member?.end_date || txn?.payment_date,
      membership_type: "3 months",
      member_phonenumber: "91" + (member?.phone_number || "0000000000"),
      photo_url: member?.photo_url || "Not Available",
      document_url: member?.document_url || "Not Available",
    });
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
        membership_type: "3 months",
        member_phonenumber: "91" + (member?.phone_number || "0000000000"),
        photo_url: member?.photo_url || "Not Available",
        document_url: member?.document_url || "Not Available",
      },
      gym_id: gym_id,
    });
  };

  return (
    <div className="bg-white-100 rounded-2xl p-6 shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
      <div className="space-y-3">
        <button
          className="w-full  bg-black  text-white py-2.5 px-4 rounded-lg hover:opacity-90 flex items-center justify-center transition-all duration-200 shadow-md"
          aria-label="Send invoice via WhatsApp"
          onClick={invoiceHandler}
        >
          {/* <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 14h.01M16 12h.01M9 16h6"
            ></path>
          </svg> */}
          Send Invoice via WhatsApp
        </button>
        <button
          className="w-full bg-gradient-to-r from-softPink to-softBlue text-black py-2.5 px-4 rounded-lg hover:opacity-90 flex items-center justify-center transition-all duration-200 shadow-md"
          aria-label="Send expiry reminder"
        >
          {/* <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 012-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1.414l1.405-1.405z"
            ></path>
          </svg> */}
          Send Expiry Reminder
        </button>
      </div>
    </div>
  );
};

export default WhatsAppNotification;
