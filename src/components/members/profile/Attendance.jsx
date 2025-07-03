import React, { useState } from "react";

const Attendance = ({ attendanceData, onAddAttendance }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [pendingAttendance, setPendingAttendance] = useState(new Set());

  const getAttendanceCount = () => {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return Object.keys(attendanceData).filter((date) => {
      const d = new Date(date);
      return (
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear &&
        attendanceData[date]
      );
    }).length;
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
    setPendingAttendance(new Set());
  };

  const handleDateClick = (dateKey) => {
    if (attendanceData[dateKey]) return; // Already attended, can't change

    setSelectedDate(dateKey);
    const newPending = new Set(pendingAttendance);
    if (newPending.has(dateKey)) {
      newPending.delete(dateKey);
    } else {
      newPending.add(dateKey);
    }
    setPendingAttendance(newPending);
  };

  const handleSave = () => {
    pendingAttendance.forEach((dateKey) => {
      onAddAttendance(dateKey);
    });
    setPendingAttendance(new Set());
    setSelectedDate(null);
  };

  const handleCancel = () => {
    setPendingAttendance(new Set());
    setSelectedDate(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1
      ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isAttended = attendanceData[dateKey];
      const isPending = pendingAttendance.has(dateKey);
      const isSelected = selectedDate === dateKey;
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={day}
          className={`h-10 w-10 flex items-center justify-center text-sm rounded-full transition-all duration-200 cursor-pointer relative ${
            isAttended
              ? "bg-softBlue text-white"
              : isPending
              ? "bg-green-100 text-green-700 border-2 border-green-300"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          } ${isToday ? "ring-2 ring-softPink" : ""} ${
            isAttended ? "cursor-not-allowed" : ""
          }`}
          onClick={() => handleDateClick(dateKey)}
          role="button"
          aria-label={
            isAttended
              ? `Already attended on ${dateKey}`
              : isPending
              ? `Remove attendance for ${dateKey}`
              : `Mark attendance for ${dateKey}`
          }
        >
          {day}
          {isPending && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-black">Attendance</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1.5 hover:bg-softBlue/20 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <svg
              className="w-5 h-5 text-softBlue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <span className="text-sm font-medium text-black">
            {currentDate.toLocaleDateString("en-IN", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1.5 hover:bg-softBlue/20 rounded-full transition-colors"
            aria-label="Next month"
          >
            <svg
              className="w-5 h-5 text-softBlue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {Object.keys(attendanceData).length === 0 ? (
        <div className="text-center">
          <p className="text-black mb-4">No attendance data available</p>
          <button
            onClick={() =>
              onAddAttendance(
                `${new Date().getFullYear()}-${String(
                  new Date().getMonth() + 1
                ).padStart(2, "0")}-${String(new Date().getDate()).padStart(
                  2,
                  "0"
                )}`
              )
            }
            className="bg-softBlue text-white py-2 px-4 rounded-lg hover:bg-softBlue/90 transition-all duration-200"
            aria-label="Add today's attendance"
          >
            Add Today's Attendance
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="text-center bg-gradient-to-r from-softBlue/20 to-softPink/20 p-4 rounded-lg">
              <p className="text-3xl font-bold text-softBlue">
                {getAttendanceCount()}
              </p>
              <p className="text-sm text-softBlue font-medium">
                Days Attended This Month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600 font-medium mb-3">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">{renderCalendar()}</div>

          {pendingAttendance.size > 0 && (
            <div className="mb-4 p-4 bg-softBlue/10 rounded-lg border border-softBlue/20">
              <p className="text-sm text-softBlue font-medium mb-3">
                Selected {pendingAttendance.size} date(s) for attendance
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-softBlue text-white py-2 px-4 rounded-lg hover:bg-softBlue/90 transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Save Attendance
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-softBlue rounded-full mr-2"></div>
              <span className="text-black">Attended</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-black">Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-200 rounded-full mr-2"></div>
              <span className="text-black">Absent</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
