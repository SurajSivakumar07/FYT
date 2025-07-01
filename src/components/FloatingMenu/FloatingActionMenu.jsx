// components/FloatingActionMenu.jsx
import { useState } from "react";
import {
  FaPlus,
  FaUserPlus,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FloatingActionMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    { icon: <FaUserPlus />, label: "Add Member", route: "/add-member" },
    { icon: <FaClipboardList />, label: "Create Plan", route: "/create-plan" },
    { icon: <FaMoneyCheckAlt />, label: "Log Payment", route: "/log-payment" },
    {
      icon: <FaCalendarAlt />,
      label: "Schedule Training",
      route: "/schedule-training",
    },
    {
      icon: <FaExclamationCircle />,
      label: "Raise Issue",
      route: "/raise-issue",
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open &&
        actions.map((action, i) => (
          <button
            key={i}
            onClick={() => navigate(action.route)}
            className="flex items-center gap-2 bg-white shadow-md px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            {action.icon} {action.label}
          </button>
        ))}

      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <FaPlus />
      </button>
    </div>
  );
}
