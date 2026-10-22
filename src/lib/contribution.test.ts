import { describe, it } from "node:test";
import { deepStrictEqual } from "node:assert";
import { contributionDestination } from "./contribution";

describe("Contribution without official payment details", () => {
  it("directs donors to the dedicated contact step, not a payment provider", () => {
    deepStrictEqual(contributionDestination, { to: "/contact", hash: "don" });
  });
});