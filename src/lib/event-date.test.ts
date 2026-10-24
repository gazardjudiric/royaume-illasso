import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { eventDateParts } from "./event-date";

describe("Shared French event date formatting", () => {
  it("splits the agenda date with its French month abbreviation", () => {
    deepStrictEqual(eventDateParts("14 août 2026"), { day: "14", month: "AOÛT", year: "2026" });
  });
  it("preserves dates outside the expected format", () => {
    deepStrictEqual(eventDateParts("À préciser"), { day: "À préciser", month: "", year: "" });
  });
  it("uppercases unrecognized months", () => {
    deepStrictEqual(eventDateParts("3 inconnu 2026"), { day: "3", month: "INCONNU", year: "2026" });
  });
});