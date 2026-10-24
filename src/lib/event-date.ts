const monthAbbreviations: Record<string, string> = {
  janvier: "JANV.",
  février: "FÉVR.",
  mars: "MARS",
  avril: "AVR.",
  mai: "MAI",
  juin: "JUIN",
  juillet: "JUIL.",
  août: "AOÛT",
  septembre: "SEPT.",
  octobre: "OCT.",
  novembre: "NOV.",
  décembre: "DÉC.",
};

export function eventDateParts(date: string) {
  const match = date.match(/^(\d{1,2})\s+(.+?)\s+(\d{4})$/);
  if (!match) return { day: date, month: "", year: "" };
  const day = match[1] ?? "";
  const month = match[2] ?? "";
  const year = match[3] ?? "";
  const monthKey = month.toLocaleLowerCase("fr-FR");
  return {
    day,
    month: monthAbbreviations[monthKey] ?? month.toLocaleUpperCase("fr-FR"),
    year,
  };
}