// import React from "react";

// export const Dialog = ({ open, onClose, children }) => {
//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {children}
//       </div>
//     </div>
//   );
// };

// export const DialogHeader = ({ children }) => (
//   <div className="text-xl font-semibold mb-4">{children}</div>
// );

// export const DialogContent = ({ children }) => (
//   <div className="space-y-4">{children}</div>
// );

// export const DialogFooter = ({ children }) => (
//   <div className="flex justify-end gap-2 mt-6">{children}</div>
// );

import React from "react";

export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative transform transition-all duration-300 ease-in-out scale-100 opacity-100 data-[closed]:scale-95 data-[closed]:opacity-0 sm:max-w-md md:max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors w-6 h-6 flex items-center justify-center"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button> */}
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div
    className="text-2xl font-bold text-gray-900 mb-5 border-b border-gray-200 pb-3"
    id="dialog-title"
  >
    {children}
  </div>
);

export const DialogContent = ({ children }) => (
  <div className="space-y-6 text-gray-700">{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className="flex justify-end gap-4 mt-8 border-t border-gray-200 pt-4">
    {children}
  </div>
);
