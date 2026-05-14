import { describe, expect, it } from "@jest/globals";

import { isEmpty } from "../isEmpty";

describe("isEmpty", () => {
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
    expect(isEmpty(0)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isEmpty({ name: "pizza" })).toBe(false);
  });

  it("returns true for an array where every item is null", () => {
    expect(isEmpty([null, null, null])).toBe(true);
  });

  it("returns false for an array with real values", () => {
    expect(isEmpty([1, 2, 3])).toBe(false);
  });

  it("returns false for a mixed array (some null, some not)", () => {
    expect(isEmpty([null, 42])).toBe(false);
  });

  it("returns true for an empty array", () => {
    expect(isEmpty([])).toBe(true);
  });
});
