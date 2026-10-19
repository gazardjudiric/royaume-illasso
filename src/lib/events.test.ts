import { describe, expect, it } from "vitest";
import { pastEvents, upcomingEvents, type RoyalEvent } from "./site-data";
const list: RoyalEvent[] = ["2026-10-25", "2026-10-19", "2026-12-01", "2026-11-02", "2026-10-18"].map((date) => ({ title: date, date, place: "", category: "Culture", description: "" }));
describe("events", () => {
  it("upcoming includes today, sorted nearest first", () => expect(upcomingEvents(list, "2026-10-19").map((e) => e.date)).toEqual(["2026-10-19", "2026-10-25", "2026-11-02", "2026-12-01"]));
  it("past excludes today", () => expect(pastEvents(list, "2026-10-19").map((e) => e.date)).toEqual(["2026-10-18"]));
});
