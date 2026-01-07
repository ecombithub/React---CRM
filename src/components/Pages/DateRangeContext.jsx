import { createContext, useContext, useState, useEffect } from "react";

const DateRangeContext = createContext();

export function DateRangeProvider({ children }) {
  const [rangeType, setRangeType] = useState("monthly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  useEffect(() => {
    let s, e;
    const now = new Date(selectedDate);

    switch (rangeType) {
      case "daily":
        s = new Date(now.setHours(0, 0, 0, 0));
        e = new Date(now.setHours(23, 59, 59, 999));
        break;
        
      case "weekly": {
        const day = (now.getDay() + 6) % 7; 
        s = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day, 0, 0, 0);
        e = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 6, 23, 59, 59);
        break;
      }

      case "monthly":
        s = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0));
        e = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59));
        break;

      case "yearly":
        s = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0));
        e = new Date(Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59));
        break;

      default:
        s = e = now;
    }

    setStart(s);
    setEnd(e);
  }, [rangeType, selectedDate]);

  return (
    <DateRangeContext.Provider
      value={{ rangeType, setRangeType, selectedDate, setSelectedDate, start, end }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (!context) throw new Error("useDateRange must be used within a DateRangeProvider");
  return context;
}
