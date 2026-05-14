import { describe, expect, it } from "@jest/globals";

import { isEqual } from "../isEqual";

describe("isEqual", () => {
  describe("primitives", () => {
    it("returns true for identical numbers", () => {
      expect(isEqual(1, 1)).toBe(true);
    });

    it("returns false for different numbers", () => {
      expect(isEqual(1, 2)).toBe(false);
    });

    it("returns true for identical strings", () => {
      expect(isEqual("pizza", "pizza")).toBe(true);
    });

    it("returns false for different strings", () => {
      expect(isEqual("pizza", "burger")).toBe(false);
    });

    it("handles null === null", () => {
      expect(isEqual(null, null)).toBe(true);
    });

    it("returns false for null vs undefined", () => {
      expect(isEqual(null, undefined)).toBe(false);
    });
  });

  describe("objects", () => {
    it("returns true for objects with the same shape and values", () => {
      expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it("returns false when a value differs", () => {
      expect(isEqual({ a: 1 }, { a: 99 })).toBe(false);
    });

    it("returns false when keys differ", () => {
      expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it("handles nested objects recursively", () => {
      const a = { user: { age: 30, name: "Jan" } };
      const b = { user: { age: 30, name: "Jan" } };

      expect(isEqual(a, b)).toBe(true);
    });

    it("catches a difference deep inside a nested object", () => {
      const a = { user: { age: 30, name: "Jan" } };
      const b = { user: { age: 99, name: "Jan" } };

      expect(isEqual(a, b)).toBe(false);
    });
  });

  describe("arrays", () => {
    it("returns true for identical arrays", () => {
      expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it("returns false when an element differs", () => {
      expect(isEqual([1, 2, 3], [1, 2, 99])).toBe(false);
    });

    it("returns false for different lengths", () => {
      expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    });
  });

  describe("type mismatches", () => {
    it("returns false for array vs object", () => {
      // [] and {} look similar but are different types
      expect(isEqual([], {})).toBe(false);
    });

    it("returns false for null vs object", () => {
      expect(isEqual(null, {})).toBe(false);
    });
  });
});
