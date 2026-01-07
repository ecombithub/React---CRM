import { useState, useEffect } from "react";

export default function MonthlyCalendar({ onSelectDate }) {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today); 

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const goPrev = () => setCurrentDate(new Date(year, month - 1, 1));
  const goNext = () => setCurrentDate(new Date(year, month + 1, 1));

  useEffect(() => {
    onSelectDate(selectedDate); 
  }, [selectedDate]);

  const handleClick = (day) => {
    if (!day) return;
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={goPrev}>‹</button>
        <h3>
          {currentDate.toLocaleString("default", { month: "long" })} {year}
        </h3>
        <button onClick={goNext}>›</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="calendar-day-name">{d}</div>
        ))}

        {days.map((day, i) => {
          const isToday =
            day &&
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day;

          const isSelected = selectedDate && selectedDate.getDate() === day;

          return (
            <div
              key={i}
              className={`calendar-day ${!day ? "empty" : ""} ${isToday ? "today" : ""} ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => handleClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
