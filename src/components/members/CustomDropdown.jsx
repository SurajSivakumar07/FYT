import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
const CustomDropdown = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  isOpen,
  setIsOpen,
  isLoading,
}) => (
  <div className="relative space-y-2">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {placeholder}
    </label>
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-400 cursor-pointer flex items-center justify-between ${
        error ? "border-red-500" : ""
      } ${isLoading ? "opacity-50" : ""}`}
      aria-expanded={isOpen}
      aria-controls={`${id}-menu`}
      disabled={isLoading}
    >
      {value || placeholder}
      <svg
        className={`w-4 h-4 text-gray-400 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    {isOpen && (
      <div
        id={`${id}-menu`}
        className="absolute z-10 w-full mt-1 bg-white text-gray-900 rounded-lg shadow-md border border-gray-200 max-h-60 overflow-auto space-y-1"
      >
        {options.map((option, index) => (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              console.log(option.value);

              onChange(option.value);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center justify-between transition-colors duration-200 border-b border-gray-200 last:border-b-0"
          >
            <span>{option.label}</span>
            {value === option.value && (
              <CheckCircle className="w-5 h-5 text-green-400" />
            )}
          </button>
        ))}
      </div>
    )}
    {error && (
      <p className="text-red-500 text-sm flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </p>
    )}
    {isLoading && (
      <p className="text-gray-500 text-sm flex items-center">
        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
        Loading...
      </p>
    )}
  </div>
);

export default CustomDropdown;
