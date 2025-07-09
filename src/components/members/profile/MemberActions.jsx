import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default MemberActions = ({ member, memberData }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0 relative min-h-[240px]">
      {/* Toggle Button */}
      <button
        onClick={() => setShowActions(!showActions)}
        className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
      >
        <motion.div
          animate={{ rotate: showActions ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </motion.div>
      </button>

      {/* Animated Actions */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-2 mt-2"
          >
            {/* Edit Profile */}
            <button
              className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
              onClick={() => setIsOpen(true)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6-6M3 17.25V21h3.75l11.06-11.06a2.121 2.121 0 00-3-3L3 17.25z"
                />
              </svg>
              Edit Profile
            </button>

            {/* Update Transaction */}
            <button
              className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
              onClick={() => setTranscation(true)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M9 13l6-6M3 17.25V21h3.75l11.06-11.06a2.121 2.121 0 00-3-3L3 17.25z"
                />
              </svg>
              Update Transaction
            </button>

            {/* Renew */}
            {member?.status === "expired" && (
              <button
                className="bg-black text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
                onClick={() => setRenewOpen(true)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536M9 13l6-6M3 17.25V21h3.75l11.06-11.06a2.121 2.121 0 00-3-3L3 17.25z"
                  />
                </svg>
                Renew
              </button>
            )}

            {/* Update Balance */}
            {memberData?.transactions[0]?.balance > 0 && (
              <button
                className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:from-orange-500 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 mt-2"
                onClick={() => setBalanceopen(true)}
              >
                <span>
                  Update Balance
                  <span className="ml-2 bg-white/80 text-orange-700 px-2 py-0.5 rounded-full text-xs font-bold">
                    ₹{memberData?.transactions[0]?.balance}
                  </span>
                </span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
