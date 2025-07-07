import React from "react";

export const Dialog = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }) => (
  <div className="text-xl font-semibold mb-4">{children}</div>
);

export const DialogContent = ({ children }) => (
  <div className="space-y-4">{children}</div>
);

export const DialogFooter = ({ children }) => (
  <div className="flex justify-end gap-2 mt-6">{children}</div>
);
