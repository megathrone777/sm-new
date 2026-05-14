// ─── LESSON 1: Basic structure ───────────────────────────────────────────────
//
// Every test file has the same shape:
//
//   describe("what you're testing")   ← groups related tests together
//     it("what should happen")        ← one specific scenario
//       expect(value).toBe(result)    ← the assertion (the actual check)
//
// Vitest gives you: describe, it, expect — import them explicitly so you
// always know where they come from.
// ─────────────────────────────────────────────────────────────────────────────
import { describe, expect, it } from "vitest";

import { isEmpty } from "../isEmpty";

describe("isEmpty", () => {
  // ── Single values ──────────────────────────────────────────────────────────
  it("returns true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isEmpty("hello")).toBe(false);
  });

  it("returns false for a number — even 0", () => {
    // 0 is falsy in JS, but isEmpty checks for null/undefined only
    expect(isEmpty(0)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isEmpty({ name: "pizza" })).toBe(false);
  });

  // ── Array overload ─────────────────────────────────────────────────────────
  it("returns true for an array where every item is null", () => {
    expect(isEmpty([null, null, null])).toBe(true);
  });

  it("returns false for an array with real values", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it("returns false for a mixed array (some null, some not)", () => {
    // every() requires ALL items to be null — one real value makes it false
    expect(isEmpty([null, 42])).toBe(false);
  });

  it("returns true for an empty array", () => {
    // [].every(...) always returns true — this is standard JS behaviour
    expect(isEmpty([])).toBe(true);
  });
});
