import { describe, expect, test } from "bun:test";
import { nextEvents, partitionEvents, todayInBenin, type CalendarEvent } from "./event-calendar";
const event = (dateISO: string): CalendarEvent => ({ dateISO, title: dateISO, place: "Illasso", category: "Culture", description: "" });
describe("agenda royal", () => {
  test("inclut aujourd’hui mais exclut hier", () => {
    const result = partitionEvents([event("2026-10-19"), event("2026-10-20")], "2026-10-20");
    expect(result.upcoming.map(e => e.dateISO)).toEqual(["2026-10-20"]);
    expect(result.past.map(e => e.dateISO)).toEqual(["2026-10-19"]);
  });
  test("limite à trois événements du plus proche au plus lointain", () => {
    expect(nextEvents([event("2026-12-01"), event("2026-10-22"), event("2026-10-21"), event("2026-10-20")], "2026-10-20").map(e => e.dateISO)).toEqual(["2026-10-20", "2026-10-21", "2026-10-22"]);
  });
  test("renvoie un agenda vide lorsque toutes les dates sont passées", () => {
    expect(nextEvents([event("2026-10-18")], "2026-10-20")).toEqual([]);
  });
  test("utilise la journée au Bénin au passage de minuit", () => {
    expect(todayInBenin(new Date("2026-10-19T23:15:00Z"))).toBe("2026-10-20");
  });
});