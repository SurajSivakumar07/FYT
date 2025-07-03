import React from "react";

const WhatsAppNotification = () => {
  return (
    <div className="bg-white-100 rounded-2xl p-6 shadow-md text-black">
      <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
      <div className="space-y-3">
        <button
          className="w-full  bg-black  text-white py-2.5 px-4 rounded-lg hover:opacity-90 flex items-center justify-center transition-all duration-200 shadow-md"
          aria-label="Send invoice via WhatsApp"
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
