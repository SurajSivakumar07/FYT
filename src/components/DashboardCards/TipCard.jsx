import React from "react";
import { FaLightbulb } from "react-icons/fa";

export default function TipCard() {
  return (
    <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl shadow p-4 w-full max-w-4xl mx-auto mt-4">
      <div className="flex items-start gap-3">
        <FaLightbulb className="text-yellow-500 text-xl mt-1" />
        <div>
          <p className="text-sm text-gray-800 font-medium">Tip of the Day</p>
          <p className="text-sm text-gray-600">
            Encourage renewals 5 days before expiry using WhatsApp reminders.
          </p>
        </div>
      </div>
    </div>
  );
}
