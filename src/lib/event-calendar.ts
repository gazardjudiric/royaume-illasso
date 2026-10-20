export type CalendarEvent = {
  title: string;
  dateISO: string;
  place: string;
  category: "Cérémonie" | "Culture" | "Communauté";
  description: string;
  image?: string;
  imageAlt?: string;
};

export function todayInBenin(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Porto-Novo", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function partitionEvents(items: CalendarEvent[], today: string) {
  return {
    upcoming: items.filter(item => item.dateISO >= today).sort((a, b) => a.dateISO.localeCompare(b.dateISO)),
    past: items.filter(item => item.dateISO < today).sort((a, b) => b.dateISO.localeCompare(a.dateISO)),
  };
}

export function nextEvents(items: CalendarEvent[], today: string) {
  return partitionEvents(items, today).upcoming.slice(0, 3);
}