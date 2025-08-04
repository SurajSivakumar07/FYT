import React, { useEffect, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useGymId } from "../../../hooks/useGymId";

const Attendance = ({ id }) => {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalAttendance, setTotalAttendace] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const gym_id = useGymId();
  const formatDateForBackend = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeForBackend = (date) => {
    return date.toTimeString().split(" ")[0].slice(0, 8);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/gyms/${gym_id}/members/${id}/attendance`
        );
        const data = await response.json();

        setTotalAttendace(data);

        const marked = {};
        data.forEach(({ date }) => {
          marked[date] = {
            marked: true,
            attended: true, // If your API returns attended: false, adjust here
          };
        });

        setMarkedDates(marked);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError(`Failed to fetch attendance data: ${error.message}`);
      }
    };

    fetchAttendance();
  }, [selectedDates]);

  const handleDateClick = (date) => {
    const dateString = formatDateForBackend(date);
    const updatedSelected = new Set(selectedDates);

    if (updatedSelected.has(dateString)) {
      updatedSelected.delete(dateString);
    } else {
      updatedSelected.add(dateString);
    }

    setSelectedDates(updatedSelected);
  };

  const saveAttendance = async () => {
    if (selectedDates.size === 0) {
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Ensure we're comparing only the date part

    const futureDates = [...selectedDates].filter((dateStr) => {
      const date = new Date(dateStr);
      date.setHours(0, 0, 0, 0);
      return date > today;
    });

    if (futureDates.length > 0) {
      alert("Please select a date that is today or earlier.");
      return;
    }

    setIsSaving(true);
    setError("");
    const now = new Date();
    const time = formatTimeForBackend(now);
    const maxRetries = 3;
    const retryDelay = 1000;

    const attemptRequest = async (payload, retries) => {
      try {
        const response = await fetch(`${API_BASE_URL}/attendance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        if (
          retries > 0 &&
          (error.name === "TypeError" || error.message.includes("fetch"))
        ) {
          console.log(
            `Retrying... (${maxRetries - retries + 1}/${maxRetries})`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return attemptRequest(payload, retries - 1);
        }
        throw error;
      }
    };

    try {
      for (const dateString of selectedDates) {
        const payload = {
          member_id: id,
          gym_id: gym_id,
          date: dateString,
        };
        console.log("Sending payload:", payload);
        await attemptRequest(payload, maxRetries);
      }

      const updatedMarked = { ...markedDates };
      selectedDates.forEach((dateString) => {
        updatedMarked[dateString] = {
          marked: true,
          attended: true,
        };
      });

      setMarkedDates(updatedMarked);
      setSelectedDates(new Set());
    } catch (error) {
      console.error("Save failed:", error);
      let errorMessage = "Failed to save attendance.";
      if (error.message.includes("fetch")) {
        errorMessage =
          "Network error. Ensure the backend server is running and accessible.";
      }
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      days.push(new Date(d));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getDateStatus = (date) => {
    const dateString = formatDateForBackend(date);
    const marked = markedDates[dateString];
    const isSelected = selectedDates.has(dateString);

    return {
      isSelected,
      isPresent: marked?.attended === true,
      isAbsent: marked?.attended === false,
      isMarked: marked?.marked === true,
    };
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDaysPresentThisMonth = useMemo(() => {
    return Object.entries(markedDates).filter(([date, status]) => {
      const dateObj = new Date(date);
      return (
        status.attended === true &&
        dateObj.getMonth() === currentDate.getMonth() &&
        dateObj.getFullYear() === currentDate.getFullYear()
      );
    }).length;
  }, [markedDates, currentDate]);
  return (
    <div className="flex flex-col items-center pt-10 bg-gradient-to-br from-blue-50 to-white-100 min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const status = getDateStatus(date);
            const todayClass = isToday(date) ? "ring-2 ring-blue-400" : "";
            const currentMonthClass = isCurrentMonth(date)
              ? "text-gray-900"
              : "text-gray-400";

            let bgClass = "bg-white hover:bg-gray-50";
            let iconElement = null;

            if (status.isSelected) {
              bgClass = "bg-blue-500 text-white hover:bg-blue-600";
            } else if (status.isPresent) {
              bgClass = "bg-green-100 text-green-800 hover:bg-green-200";
              iconElement = (
                <Check size={12} className="absolute top-1 right-1" />
              );
            } else if (status.isAbsent) {
              bgClass = "bg-red-100 text-red-800 hover:bg-red-200";
              iconElement = <X size={12} className="absolute top-1 right-1" />;
            }

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`relative aspect-square p-2 rounded-lg text-sm font-medium transition-all
                ${bgClass} ${todayClass} ${currentMonthClass}
                transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400`}
              >
                {date.getDate()}
                {iconElement}
                {status.isMarked && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-6 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-100 rounded border border-green-200"></div>
            <span className="text-gray-600">Present</span>
          </div>

          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
        </div>
      </div>

      {selectedDates.size > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 w-full max-w-md">
          <h3 className="font-semibold text-gray-800 mb-3">Selected Dates</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.from(selectedDates).map((dateString) => (
              <span
                key={dateString}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {new Date(dateString).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            ))}
          </div>
          <button
            onClick={saveAttendance}
            disabled={isSaving}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            {isSaving ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </div>
            ) : (
              "Save Attendance"
            )}
          </button>
        </div>
      )}

      {/* Stats (Optional Dummy Values) */}
      <div className="flex gap-4 w-full max-w-md">
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {totalDaysPresentThisMonth}
          </div>
          <div className="text-sm text-gray-600 font-medium">Current Month</div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">
            {totalAttendance.length}
          </div>
          <div className="text-sm text-gray-600 font-medium">Total Days</div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
