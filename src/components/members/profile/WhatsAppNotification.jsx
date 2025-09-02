import React from "react";
import { usePostInvoice } from "../../../hooks/whatsapp/usePostInvoice";
import { useGymId } from "../../../hooks/useGymId";
import { useExpiryReminder } from "../../../hooks/whatsapp/useExpiryReminder";
import axiosInstance from "../../../utlis/axiosInstance";

const WhatsAppNotification = ({ memberData }) => {
  const [loading, setIsLoading] = React.useState(false);
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

  // Common message
  const message = `Hi ${member?.name}%0AWe noticed your ${plan?.name} plan will end on ${member?.end_date}.%0A%0AYou can renew your plan now to ensure uninterrupted access.`;

  // Normal WhatsApp (works everywhere)
  const waLink = `https://wa.me/${member?.phone_number}?text=${message}`;

  // WhatsApp Business (Android only - intent link)
  const waBusinessLink = `intent://send?phone=${member?.phone_number}&text=${message}#Intent;scheme=smsto;package=com.whatsapp.w4b;end`;

  const invoiceHandlerBusiness = async () => {
    // 1. --- Data Validation ---
    // Ensure all required objects and their properties exist before making an API call.
    if (!member || !plan || !txn) {
      console.error("Missing required data:", { member, plan, txn });
      // Replace alert with a user-friendly notification
      // toast.error("Cannot generate invoice: required member, plan, or transaction data is missing.");
      alert("❌ Cannot generate invoice: required data is missing.");
      return;
    }

    setIsLoading(true);

    try {
      // 2. --- Construct Payload ---

      const payload = {
        member_name: member.name || "N/A",
        address: member.address || "N/A",
        payment_mode: txn.transaction_type || "Cash",
        payment_date:
          txn.payment_date || new Date().toISOString().split("T")[0],
        amount: (txn.amount_paid ?? 0) + (txn.balance ?? 0),
        amount_paid: txn.amount_paid ?? 0,
        balance: txn.balance ?? 0,
        start_date: member.start_date || txn.payment_date,
        end_date: member.end_date || txn.payment_date,
        membership_type: plan.name || "N/A",

        member_phonenumber: `91${member.phone_number || ""}`,
        duration: plan.duration_days || 0,
      };

      const response = await axiosInstance.post(
        `/api/invoice/${gym_id}`,
        payload
      );

      // The backend now returns a proper response model, so we can check the data directly.
      const { success, member_name, pdfUrl, phone_number } = response.data;

      if (!success) {
        // This case might not be hit if the backend throws an error, but it's good practice.
        // toast.error("Failed to generate invoice. Please try again.");
        alert("❌ Failed to generate invoice. Please try again.");
        return;
      }

      // 3. --- Success Handling ---
      // Provide feedback to the user before redirecting them.
      // toast.success("Invoice generated successfully! Opening WhatsApp...");
      // alert("✅ Invoice generated! Opening WhatsApp...");

      // Build and open the WhatsApp message link
      const message = `Hi ${member_name},\n\nThank you for your payment.\n\nPlease find your invoice attached for \n\n
Amount: ₹${txn.amount_paid}\n\n
Here is your invoice:\n${pdfUrl}`;
      const waLink = `https://wa.me/${
        member.phone_number
      }?text=${encodeURIComponent(message)}`;

      // Open in a new tab
      window.open(waLink, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Error sending invoice:", err);
      // 4. --- Improved Error Handling ---
      // Display specific error messages from the backend API to the user.
      const errorMessage =
        err.response?.data?.detail || "An unexpected error occurred.";
      // toast.error(`⚠️ ${errorMessage}`);
      alert(`⚠️ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

      <div className="bg-white rounded-2xl p-6 shadow-md text-black mt-1.5">
        <h2 className="text-xl font-semibold mb-4 text-black ">
          Send via WhatsApp
        </h2>
        <div className="space-y-3">
          {/* Regular WhatsApp */}

          <button
            onClick={invoiceHandlerBusiness}
            disabled={loading}
            className="flex items-center justify-center w-full py-2.5 px-4 
                 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium 
                 hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            {loading ? "Generating..." : "Send Invoice"}
          </button>
          <a
            aria-label="Chat on WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            href={waLink}
            className="flex items-center justify-center w-full py-2.5 px-4 
                 rounded-lg border border-gray-300 bg-black text-white font-medium 
                 hover:shadow-md transition-all duration-200"
          >
            Expiry
          </a>
        </div>
      </div>
    </>
  );
};

export default WhatsAppNotification;
