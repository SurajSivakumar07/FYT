import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  onClick,
  disabled,
  type = "button",
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium transition duration-200";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
};
