import { useEffect, useState } from "react";
import { todayInBenin } from "../lib/event-calendar";

export function useCalendarDay() {
  const [day, setDay] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setDay(todayInBenin());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return day;
}