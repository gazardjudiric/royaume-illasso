import { describe, expect, test } from "bun:test";
import { contributionDestination } from "./contribution";

describe("Contribution without official payment details", () => {
  test("directs donors to the dedicated contact step, not a payment provider", () => {
    expect(contributionDestination).toEqual({ to: "/contact", hash: "don" });
  });
});